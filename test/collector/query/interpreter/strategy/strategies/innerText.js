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

describe('Selector Interpreters - InnerText Strategy', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('match method', () => {
        
        it('h1', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('h1');
                });
            });
        
            assert.strictEqual(result, true);
        });

        it('h1*', async () => {
                        
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('h1*');
                });
            });
        
            assert.strictEqual(result, true);
        });

        it('::document > h1', async () => {
                        
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('::document > h1');
                });
            });
        
            assert.strictEqual(result, true);
        });

        it('::document > h1*', async () => {
                        
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('::document > h1*');
                });
            });
        
            assert.strictEqual(result, true);
        });

        it('{h1}', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('{h1}');
                });
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}*', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('{h1}*');
                });
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('h1{outerHTML}');
                });
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}*', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return InterpreterInnerTextStrategy.match('h1{outerHTML}*');
                });
            });
        
            assert.strictEqual(result, false);
        });

    });

    describe('interpret method', () => {

        it("h1", async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await InterpreterInnerTextStrategy.interpret('h1').call(new Context());
                });
            });
        
            assert.strictEqual(result, 'Plato Plugin');

        });

        it("h1*", async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await InterpreterInnerTextStrategy.interpret('h1*').call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin']);
        });

        it("::document > h1", async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await InterpreterInnerTextStrategy.interpret('::document > h1').call(new Context());
                });
            });
        
            assert.strictEqual(result, 'Plato Plugin');

        });

        it("::document > h1*", async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await InterpreterInnerTextStrategy.interpret('::document > h1*').call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin']);
        });

    });


    after(async () => {
        await testingServer.stop();
    });

});