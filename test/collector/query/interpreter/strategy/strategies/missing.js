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

import NanoServer from '../../../../../testing-server/server.js';
import Impressionist from '../../../../../../src/process.js'
import assert from 'assert';
import { Context } from '../../../../../../lib/index.js';

describe('Selector Interpreters - Missing Strategy', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('interpret method', () => {

        it("h{1", async () => {
            
            async function failWithMessage() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await InterpreterMissingStrategy.interpret('h{1').call(new Context());
                    });
                });
            }
        
            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Unable to interpret the Select String: /
            });

        });

        it("h{1*", async () => {
                
            async function failWithMessage() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await InterpreterMissingStrategy.interpret('h{1*').call(new Context());
                    });
                });
            }
        
            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Unable to interpret the Select String: /
            });

        });

        it("::document {}> h1", async () => {
                
            async function failWithMessage() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await InterpreterMissingStrategy.interpret('::document {}> h1').call(new Context());
                    });
                });
            }
        
            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Unable to interpret the Select String: /
            });

        });

        it("::document > {h1*", async () => {
                
            async function failWithMessage() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await InterpreterMissingStrategy.interpret('::document > h1*').call(new Context());
                    });
                });
            }
        
            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Unable to interpret the Select String: /
            });

        });

    });


    after(async () => {
        await testingServer.stop();
    });

});