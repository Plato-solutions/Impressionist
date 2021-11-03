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

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});