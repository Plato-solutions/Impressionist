import puppeteer  from 'puppeteer';
import NanoServer from '../../../../../testing-server/server.js';
import Impressionist from '../../../../../../src/process.js'
import assert from 'assert';

describe.only('Selector Interpreters - Property Strategy', () => {
    
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
        
        it('h1{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('h1{outerHTML}');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('h1{outerHTML}*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('document > h1{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('document > h1{outerHTML}');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('document > h1{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('document > h1{outerHTML}*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('::element{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('::element{outerHTML}');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('::element{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('::element{outerHTML}*');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('h1');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1*', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('h1*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('{h1}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('{h1}*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1 + {#logo}', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterPropertyStrategy.match('h1 + {#logo}');
    
            });
        
            assert.strictEqual(result, false);
        });

    });

    describe('interpret method', () => {

        it("h1{outerHTML}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterPropertyStrategy.interpret('h1{outerHTML}');
                
                const context = new Context();

                return await query.call(context);
                
            });
        
            assert.strictEqual(result, '<h1>Plato Plugin</h1>');
            
        });

        it("h1{outerHTML}*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterPropertyStrategy.interpret('h1{outerHTML}*');
                
                const context = new Context();

                return await query.call(context);
                
            });
        
            assert.deepStrictEqual(result, ['<h1>Plato Plugin</h1>']);
            
        });

        it("document > h1{outerHTML}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterPropertyStrategy.interpret('document > h1{outerHTML}');
                
                const context = new Context();

                return await query.call(context);
                
            });
        
            assert.strictEqual(result, '<h1>Plato Plugin</h1>');
            
        });

        it("document > h1{outerHTML}*", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterPropertyStrategy.interpret('document > h1{outerHTML}*');
                
                const context = new Context();

                return await query.call(context);
                
            });
        
            assert.deepStrictEqual(result, ['<h1>Plato Plugin</h1>']);
            
        });

        it("::element{outerHTML}", async () => {
                
            const result = await page.evaluate(async () => { 
                
                const nameElement = document.querySelector('h1');
                const query = InterpreterPropertyStrategy.interpret('::element{outerHTML}');
                
                let context = new Context();
                context = context.update(nameElement);

                return await query.call(context);
                
            });
        
            assert.strictEqual(result, '<h1>Plato Plugin</h1>');
            
        });

        it("::element{outerHTML}*", async () => {
                
            const result = await page.evaluate(async () => { 

                const nameElement = document.querySelector('h1');
                const query = InterpreterPropertyStrategy.interpret('::element{outerHTML}*');
                
                let context = new Context();
                context = context.update(nameElement);

                return await query.call(context);
                
            });
        
            assert.deepStrictEqual(result, ['<h1>Plato Plugin</h1>']);
            
        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});