/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import assert from "assert";
import NanoServer from '../testing-server/server.js';
import Process from '../../src/process.js';

describe('Process Class', () => {
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081/';

    before(async () => {
        await testingServer.start();
    });

    describe('Execute', () => {

        it('Get the h1 innerText value using querySelector', async() => {
            const result = await Process.execute(url, async (browser, page) => {
                return await page.evaluate(() => {
                    return document.querySelector('h1').innerText;
                });
            });

            assert.strictEqual(result, 'Plato Plugin');
        });

        it('Get the h1 innerText value using Impressionist collector features', async() => {
            const result = await Process.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                    return await collector({
                        name: 'h1'
                    }).call();
                });
            });

            assert.deepStrictEqual(result, { name: 'Plato Plugin' } );
        });

        it('Execute a faulty function', async() => {
            
            async function failWithMessage() {
                return await Process.execute(url, async (browser, page) => {
                    return await page.evaluate(() => {
                        throw new Error('Execution failed');
                    });
                });
            }

            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Impressionist detect an error in the custom function: /
            });
        });

        it('Execute a faulty function using a fake selector', async() => {
            
            async function failWithMessage() {
                return await Process.execute(url, async (browser, page) => {
                    return await page.evaluate(async () => {
                        return await collecting({ // collection does not exist.
                            name: 'h1'
                        }).call();
                    });
                });
            }

            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Impressionist detect an error in the custom function: /
            });
        });
    });

    describe('Add a plugin', () => {

        it('Result converted to JSON string', async() => {

            class JSONPlugin {
                static visit(process) {
                    process.executeFunction = async function executeFunction(connectionIdentifier, customFunction) {
                        const result = await process.browserController.execute(connectionIdentifier, customFunction);
                        return JSON.stringify(result);
                    }
                }
            }

            Process.loadPlugin(JSONPlugin);

            const result = await Process.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                    return await collector({
                        name: 'h1'
                    }).call();
                });
            });

            assert.strictEqual(result, '{"name":"Plato Plugin"}');
        });

    });
    
    after(async () => {
        await testingServer.stop();
    });
    
});