import assert from "assert";
import * as Impressionist from '../../../../../src/index.js';
import NanoServer from '../../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionStrategy - MissingStrategy class', () => {

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
  
    describe('match method', () => {

        it('Throw error', async () => {
            
            async function missingThrowError() {    

                return await page.evaluate(async () => {
                    return await MissingStrategy.match('#select1');
                });

            }    
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /None of the available strategies work for the item entered. Try entering custom functions./
            });
            
        });

    });

    describe('getOptions method', () => {

        it('Return null properties', async () => {
            
            const result = await page.evaluate(async () => {
                return await MissingStrategy.getOptions('id', null);
            });

            assert.deepStrictEqual(result, [{ value: null, id: null }]);

        });
        
    });

    describe('setOption method', () => {

        it('Return true', async () => {

            const result = await page.evaluate(async () => {
                return await MissingStrategy.setOption(null);
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