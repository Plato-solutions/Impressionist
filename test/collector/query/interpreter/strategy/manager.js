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

import NanoServer from '../../../../testing-server/server.js';
import Impressionist from '../../../../../src/process.js'
import assert from 'assert';

describe('Selector Interpreters - Manager', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('get method', () => {

        it('{h1} gets InterpreterElementStrategy', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    const interpreter = InterpreterStrategyManager.lookUp('{h1}');
                    return interpreter === InterpreterElementStrategy;
                });
            });
            
            assert.strictEqual(result, true);
        });

        it('h1 gets InterpreterInnerTextStrategy', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    const interpreter = InterpreterStrategyManager.lookUp('h1');
                    return interpreter === InterpreterInnerTextStrategy;
                });
            });
        
            assert.strictEqual(result, true);
        });

        it('h1{outerHTML} gets InterpreterPropertyStrategy', async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    const interpreter = InterpreterStrategyManager.lookUp('h1{outerHTML}');
                    return interpreter === InterpreterPropertyStrategy;
                });
            });
        
            assert.strictEqual(result, true);
        });

    });

    after(async () => {
        await testingServer.stop();
    });

});