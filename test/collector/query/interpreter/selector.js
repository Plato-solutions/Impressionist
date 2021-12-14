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

import puppeteer  from 'puppeteer';
import NanoServer from '../../../testing-server/server.js';
import Impressionist from '../../../../src/process.js'
import assert from 'assert';

describe('SelectorInterpreter', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    let browser;
    let page;

    before(async () => {
        await testingServer.start();
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
        await Impressionist.setPageConfigurations(page, url);
    });

    it("select('{h1}')", async () => {
            
        const result = await page.evaluate(async () => { 
    
            const data = ( function () {
    
                return new Collection({
                    name: select('{h1}')
                });
                
            } )();
            
            const context = new Context();
            const result = await data.call(context);

            return result.name.tagName;
    
        });
    
        assert.strictEqual(result, 'H1');
    });

    it("select('h1')", async () => {
            
        const result = await page.evaluate(async () => { 
    
            const data = ( function () {
                return new Collection({
                    name: select('h1')
                });
                
            } )();
            
            const context = new Context();
            return await data.call(context);
    
        });
    
        assert.deepStrictEqual(result, { name: 'Plato Plugin' });
    });

    it("select('h1{innerText}')", async () => {
            
        const result = await page.evaluate(async () => { 
    
            const data = ( function () {
                return new Collection({
                    name: select('h1{outerHTML}')
                });
                
            } )();
            
            const context = new Context();
            return await data.call(context);
    
        });
    
        assert.deepStrictEqual(result, { name: '<h1>Plato Plugin</h1>' });
    });

    it("select('h{1')", async () => {
        
        async function failWithMessage() {
            return await page.evaluate(async () => { 
        
                const data = ( function () {
                    return new Collection({
                        name: select('h{1')
                    });
                    
                } )();
                
                const context = new Context();
                return await data.call(context);
        
            });
        }
    
        assert.rejects(failWithMessage, {
            name: 'Error',
            message: /Unable to interpret the Select String: /
        });
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});