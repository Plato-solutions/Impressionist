import puppeteer  from 'puppeteer';
import NanoServer from '../../../../../testing-server/server.js';
import Impressionist from '../../../../../../src/process.js'
import assert from 'assert';

describe('Selector Interpreters - Merge Strategy', () => {
    
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

        it('h1 + {#logo}', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('h1 + {#logo}');
    
            });
        
            assert.strictEqual(result, true);
        });

        it('document > h1 + {document > #logo}', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('document > h1 + {document > #logo}');
    
            });
        
            assert.strictEqual(result, true);
        });
        
        it('h1', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('h1');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1*', async () => {
                        
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('h1*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('{h1}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('{h1}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('{h1}*');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('h1{outerHTML}');
    
            });
        
            assert.strictEqual(result, false);
        });

        it('h1{outerHTML}*', async () => {
                
            const result = await page.evaluate(async () => { 
        
                return InterpreterMergeStrategy.match('h1{outerHTML}*');
    
            });
        
            assert.strictEqual(result, false);
        });

    });

    describe('interpret method', () => {

        it("{h1} + {#logo}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterMergeStrategy.interpret('{h1} + {#logo}');
                
                const context = new Context();

                const [name, logo] = await query.call(context);

                return [name.tagName, logo.tagName];
            });
        
            assert.deepStrictEqual(result, ['H1', 'DIV']);

        });

        it("h1 + #logo", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterMergeStrategy.interpret('h1 + #logo');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin', 'Logo Image']);

        });

        it("{document > h1} + {document > #logo}", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterMergeStrategy.interpret('{document > h1} + {document > #logo}');
                
                const context = new Context();

                const [name, logo] = await query.call(context);

                return [name.tagName, logo.tagName];
            });
        
            assert.deepStrictEqual(result, ['H1', 'DIV']);

        });

        it("document > h1 + document > #logo", async () => {
                
            const result = await page.evaluate(async () => { 
        
                const query = InterpreterMergeStrategy.interpret('document > h1 + document > #logo');
                
                const context = new Context();

                return await query.call(context);
            });
        
            assert.deepStrictEqual(result, ['Plato Plugin', 'Logo Image']);

        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});