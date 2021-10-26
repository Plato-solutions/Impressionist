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

        it('h1 ++ {#logo}', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterElementStrategy.match('h1 ++ {#logo}');
    
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