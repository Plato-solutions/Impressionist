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

import * as Impressionist from '../../../../src/index.js';
import puppeteer  from 'puppeteer';
import NanoServer from '../../../testing-server/server.js';
import assert from 'assert';

describe('Selector - Init', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    let browser;
    let page;

    before(async () => {
        await testingServer.start();
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
        await Impressionist.Process.setPageConfigurations(page, url);
    });

    describe('Execution Errors', () => {

        it('Passing an undefined context', async () => {
            
            async function throwError() {    

                return await page.evaluate(async () => {
                    const selector = new Init((context) => context);

                    return await selector.call(); // Undefined context;
                });

            }    
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Init - The context is not an instance of Context class./
            });

        });

        it('Passing a context not instance of Context', async () => {
            
            async function throwError() {    

                return await page.evaluate(async () => {
                    const selector = new Init((context) => context);

                    return await selector.call({ context: 'fake' });
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

                return await page.evaluate(async () => {
                    const selector = init(123);

                    return await selector.call(new Context());
                });

            } 
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Init - Constructor definition should be a function. Instead it received a number./
            });

        });

        it('Passing a faulty function as definition', async () => {

            async function throwError() {    

                return await page.evaluate(async () => {
                    const selector = init(() => { throw new Error('DOM element does not exists.') });

                    return await selector.call(new Context());
                });

            } 
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /InitialFunction - DOM element does not exists./
            });

        });
        
        it('Change h1 innerText before execution of the Query', async () => {
            const result = await page.evaluate(async () => { 
    
                const data = new Collection({
                    name: css('h1').property('innerText').single().init(() => { document.querySelector('h1').innerText = 'Plato Plugin Modified' }) // init at the end of the query chain assure the last execution.
                });
                    
                const context = new Context();
                return await data.call(context);
            });
        
            assert.deepStrictEqual(result, { name: 'Plato Plugin Modified' });
        });
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});