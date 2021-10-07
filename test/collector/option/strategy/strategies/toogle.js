import assert from "assert";
import * as Impressionist from '../../../../../src/index.js';
import NanoServer from '../../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionStrategy - ToogleStrategy class', () => {

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

        it('match method returns true', async () => {
    
            const result = await page.evaluate(async () => {
                
                const selectElement = document.querySelector('#toogle');
                
                return await ToogleStrategy.match(selectElement);
                
            });
    
            assert.strictEqual(result, true);
            
        });
    
        it('match method returns false', async () => {
    
            const result = await page.evaluate(async () => {
                
                const selectElement = Array.from(document.querySelectorAll('div'));
                
                return await ToogleStrategy.match(selectElement);
                
            });
    
            assert.strictEqual(result, false);
            
        });

    });

    describe('getOptions method', () => {

        it('Get options from a checkbox element', async () => {
            
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#toogle');

                return await ToogleStrategy.getOptions('installation', selectElement);
            });

            assert.deepStrictEqual(result, [
                {
                    value: { click: {}, selection: true },
                    installation: true
                },
                {
                    value: { click: {}, selection: false },
                    installation: false
                }
            ]);

        });
        
    });

    describe('setOption method', () => {

        it('Select an input element', async () => {
            const result = await page.evaluate(async () => {
                const inputElement = document.querySelector('#toogle > input');

                // inputElement.click(); // If the input is checked by default;

                await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: true });

                return inputElement.checked;
            });

            assert.strictEqual(result, true);
        });

        it('Unselect an input element', async () => {
            const result = await page.evaluate(async () => {
                const inputElement = document.querySelector('#toogle > input');

                await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: false });

                return inputElement.checked;
            });

            assert.strictEqual(result, false);
        });
        
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});