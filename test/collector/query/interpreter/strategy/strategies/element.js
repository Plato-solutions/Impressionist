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
import NanoServer from '../../../../../testing-server/server.js';
import Impressionist from '../../../../../../src/process.js'
import assert from 'assert';

describe('Selector Interpreters - Element Strategy', () => {
    
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

    describe('match method', () => {

        it('{h1}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('{h1}');
    
            });
        
            assert.strictEqual(result, true);
        });
        it('{h1}*', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('{h1}*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('{::document > h1}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('{::document > h1}');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('{::document > h1}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('{::document > h1}*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('h1');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('h1*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('h1{outerHTML}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('h1{outerHTML}*');
    
            });
        
            assert.strictEqual(result, false);
        });

    });

    describe('interpret method', () => {

        it("{h1}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterElementStrategy.interpret('{h1}');
    
                const context = new Context();

                const result = await query.call(context);
                return result.tagName;
                
            });
        
            assert.strictEqual(result, 'H1');
        });

        it("{h1}*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterElementStrategy.interpret('{h1}*');
    
                const context = new Context();

                const result = await query.call(context);
                return result[0].tagName;
                
            });
        
            assert.strictEqual(result, 'H1');
        });

        it("{::document > h1}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterElementStrategy.interpret('{::document > h1}');
    
                const context = new Context();

                const result = await query.call(context);
                return result.tagName;
                
            });
        
            assert.strictEqual(result, 'H1');
        });

        it("{::document > h1}*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterElementStrategy.interpret('{::document > h1}*');
    
                const context = new Context();

                const result = await query.call(context);
                return result[0].tagName;
                
            });
        
            assert.strictEqual(result, 'H1');
        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});