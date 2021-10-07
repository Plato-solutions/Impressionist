import assert from "assert";
import * as Impressionist from '../../../../../src/index.js';
import NanoServer from '../../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionStrategy - SelectStrategy class', () => {

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
                
                const selectElement = document.querySelector('#option-1');
                
                return await SelectStrategy.match(selectElement);
                
            });
    
            assert.strictEqual(result, true);
            
        });
    
        it('match method returns false', async () => {
    
            const result = await page.evaluate(async () => {
                
                const selectElement = document.querySelector('div');
                
                return await SelectStrategy.match(selectElement);
                
            });
    
            assert.strictEqual(result, false);
            
        });

    });

    describe('getOptions method', () => {

        it('Get options from a select element', async () => {
            
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#option-1');

                return await SelectStrategy.getOptions('edition', selectElement);
            });

            assert.deepStrictEqual(result, [
                {
                    value: '10',
                    edition: 'val-10'
                },
                {
                    value: '20',
                    edition: 'val-20'
                },
                {
                    value: '30',
                    edition: 'val-30'
                }
            ]);

        });
        
        it('Get options from a select element without options', async () => {
            
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#option-no-options-1');

                return await SelectStrategy.getOptions('edition', selectElement);
            });

            assert.deepStrictEqual(result, [
                {
                    value: null,
                    edition: null
                }
            ]);

        });
    });

    describe('setOption method', () => {

        it('Set second option to a select element', async () => {
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#option-1');

                await SelectStrategy.setOption(selectElement, '20');

                return selectElement.value;
            });

            const secondOptionOfFirstSelectElement = '20';

            assert.strictEqual(result, secondOptionOfFirstSelectElement);
        });

        it('Set third option to a select element', async () => {
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#option-1');

                await SelectStrategy.setOption(selectElement, '30');

                return selectElement.value;
            });

            const thridOptionOfFirstSelectElement = '30';

            assert.strictEqual(result, thridOptionOfFirstSelectElement);
        });
        
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});