import puppeteer  from 'puppeteer';
import NanoServer from '../../../../testing-server/server.js';
import Impressionist from '../../../../../src/process.js'
import assert from 'assert';

describe('Selector Interpreters - Manager', () => {
    
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

    describe('get method', () => {

        it('{h1} gets InterpreterElementStrategy', async () => {
                
            const result = await page.evaluate(async () => { 
        
                const interpreter = InterpreterStrategyManager.lookUp('{h1}');

                return interpreter === InterpreterElementStrategy ? true : false;
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1 gets InterpreterInnerTextStrategy', async () => {
                
            const result = await page.evaluate(async () => { 
        
                const interpreter = InterpreterStrategyManager.lookUp('h1');

                return interpreter === InterpreterInnerTextStrategy ? true : false;
    
            });
        
            assert.strictEqual(result, true);
        });

        it('h1{outerHTML} gets InterpreterPropertyStrategy', async () => {
                
            const result = await page.evaluate(async () => { 
        
                const interpreter = InterpreterStrategyManager.lookUp('h1{outerHTML}');
                
                return interpreter === InterpreterPropertyStrategy ? true : false;
    
            });
        
            assert.strictEqual(result, true);
        });

    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});