import assert from "assert";
import * as Impressionist from '../../../../../src/index.js';
import NanoServer from '../../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionStrategy - GroupStrategy class', () => {

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
                
                const element = document.querySelectorAll('#div-1 > div');
                
                return await GroupStrategy.match(element);
                
            });
    
            assert.strictEqual(result, true);
            
        });
    
        it('match method returns false', async () => {
    
            const result = await page.evaluate(async () => {
                
                const element = document.querySelector('#option-1');
                
                return await GroupStrategy.match(element);
                
            });
    
            assert.strictEqual(result, false);
            
        });

    });

    describe('getOptions method', () => {

        it('Get options from a select element', async () => {
            
            const result = await page.evaluate(async () => {
                const element = document.querySelectorAll('#div-1 > div');

                return await GroupStrategy.getOptions('edition', element);
            });

            assert.deepStrictEqual(result, [
                {
                    value: {},
                    edition: 'div-val-10'
                },
                {
                    value: {},
                    edition: 'div-val-20'
                },
                {
                    value: {},
                    edition: 'div-val-30'
                }
            ]);

        });
        
        it('Get options from a div element without options', async () => {
            
            const result = await page.evaluate(async () => {
                const element = document.querySelectorAll('#div-no-optios-11 > div');

                return await GroupStrategy.getOptions('edition', element);
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

        it('Set second option to a div element', async () => {
            const result = await page.evaluate(async () => {
                const parentElement = document.querySelector('#div-1');
                const element = document.querySelector('#div-1 > div:nth-child(2)');

                await GroupStrategy.setOption(parentElement, element);

                return parentElement.getAttribute('value');
            });

            const secondOptionOfFirstelement = '20';

            assert.strictEqual(result, secondOptionOfFirstelement);
        });

        it('Set third option to a div element', async () => {
            const result = await page.evaluate(async () => {
                const parentElement = document.querySelector('#div-1');
                const element = document.querySelector('#div-1 > div:nth-child(3)');

                await GroupStrategy.setOption(parentElement, element);

                return parentElement.getAttribute('value');
            });

            const thridOptionOfFirstelement = '30';

            assert.strictEqual(result, thridOptionOfFirstelement);
        });
        
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});