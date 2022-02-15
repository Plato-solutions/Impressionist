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

import Impressionist from '../../../../src/process.js';
import NanoServer from '../../../testing-server/server.js';
import assert from 'assert';
import { Context } from '../../../../lib/index.js';

describe('Selector - Init', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('Execution Errors', () => {

        it('Passing a context not instance of Context', async () => {
            
            async function throwError() {    
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => {
                        return await new Init((context) => context).call({ context: 'fake' });
                    });
                });
            } 
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Init - The context is not an instance of Context class./
            });

        });

    });

    describe('Initialization', () => {

        it('Passing no function definition', async () => {

            async function throwError() {    
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => {
                        return await new Init(123).call(new Context());
                    });
                });
            }
            
            await assert.doesNotReject(throwError);

        });

        it('Passing a faulty function as definition', async () => {

            async function throwError() {    
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => {
                        return await new Init(() => { throw new Error('DOM element does not exists.') }).call(new Context());
                    });
                });
            } 
            
            await assert.doesNotReject(throwError);

        });
        
        it('Change h1 innerText before execution of the Query', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h1').property('innerText').single().init(() => { document.querySelector('h1').innerText = 'Plato Plugin Modified' }) // init at the end of the query chain assure the last execution.
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: 'Plato Plugin Modified' });
        });
    });

    after(async () => {
        await testingServer.stop();
    });

});