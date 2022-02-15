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
import { Context } from "../../../lib/index.js";
import Impressionist from '../../../src/process.js';
import NanoServer from '../../testing-server/server.js';

describe('Collection Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('Error', () => {
        it('Adding a faulty post processor', async () => {
            
            async function throwError() {
                return await Impressionist.execute(url, async (browser, page) => {
                    return await page.evaluate( async () => {
                        return new Collection({
                            name: 'h1'
                        }).postProcessor( () => {
                            throw new Error('Faulty function');
                        }).call(new Context());
                    });
                });
            }
    
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Collection - Execution of PostProcessor failed with the following message:/
            });
        });
    });

    describe('Execution', () => {

        it('Execute - Receives a Query', async () => {
            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate( async () => {
                    return new Collection({
                        name: css('h1').property('innerText').single()
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });
    
        it('Execute - Receives a function', async () => {
            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate( async () => {
                    return await new Collection({
                        name: () => 'Plato Plugin'
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });
    
        it('Execute - Receives a Select String', async () => {
            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate( async () => {
                    return await new Collection({
                        name: 'h1'
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });

    });

    after(async () => {
        await testingServer.stop();
    });

});