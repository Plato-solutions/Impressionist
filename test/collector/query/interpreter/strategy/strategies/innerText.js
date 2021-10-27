import puppeteer  from 'puppeteer';
import NanoServer from '../../../../../testing-server/server.js';
import Impressionist from '../../../../../../src/process.js'
import assert from 'assert';

describe('Selector Interpreters - InnerText Strategy', () => {
    
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
        
        it('h1', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('h1');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1*', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('h1*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('::document > h1', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('::document > h1');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('::document > h1*', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('::document > h1*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('{h1}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('{h1}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('{h1}*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('h1{outerHTML}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterInnerTextStrategy.match('h1{outerHTML}*');
    
            });
        
            assert.strictEqual(result, false);
        });

    });

    describe('interpret method', () => {

        it("h1", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterInnerTextStrategy.interpret('h1');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.strictEqual(result, 'Plato Plugin');

        });

        it("h1*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterInnerTextStrategy.interpret('h1*');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin']);

        });

        it("::document > h1", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterInnerTextStrategy.interpret('::document > h1');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.strictEqual(result, 'Plato Plugin');

        });

        it("::document > h1*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterInnerTextStrategy.interpret('::document > h1*');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin']);

        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});