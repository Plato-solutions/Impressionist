import * as Impressionist from '../../../../src/index.js';
import puppeteer  from 'puppeteer';
import NanoServer from '../../../testing-server/server.js';
import assert from 'assert';

describe.only('Selectors', () => {
    
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

    describe('Css class - Errors', () => {

        it('Passing an undefined context', async () => {
            
            async function missingThrowError() {    

                return await page.evaluate(async () => {
                    const selector = new Css('h1');

                    return await selector.call(); // Undefined context;
                });

            }    
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /Css - The context is not an instance of Context class./
            });

        });

        it('Passing a context not instance of Context', async () => {
            
            async function missingThrowError() {    

                return await page.evaluate(async () => {
                    const selector = new Css('h1');

                    return await selector.call({ context: 'fake' });
                });

            } 
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /Css - The context is not an instance of Context class./
            });

        });

        it('Passing no string definition', async () => {

            async function missingThrowError() {    

                return await page.evaluate(async () => {
                    const selector = new Css(123);

                    return await selector.call(new Context());
                });

            } 
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /Css - Constructor definition should be a string. Instead it received a number./
            });

        });

    });


    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});