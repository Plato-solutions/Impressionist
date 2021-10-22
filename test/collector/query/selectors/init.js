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

    describe('Errors', () => {

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

        it('Passing no function definition', async () => {

            async function throwError() {    

                return await page.evaluate(async () => {
                    const selector = new Init(123);

                    return await selector.call(new Context());
                });

            } 
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Init - Constructor definition should be a function. Instead it received a number./
            });

        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});