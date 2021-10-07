import assert from "assert";
import * as Impressionist from '../../../../src/index.js';
import NanoServer from '../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionStrategyManager class', () => {

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
  
    describe('add method', () => {

        it('Add SelectStrategy', async () => {
           
            const result = await page.evaluate(() => {
                OptionStrategyManager.add(SelectStrategy);
                return true;
            });

            assert.strictEqual(result, true);
        });

        it('Add GroupStrategy', async () => {
           
            const result = await page.evaluate(() => {
                OptionStrategyManager.add(GroupStrategy);
                return true;
            });

            assert.strictEqual(result, true);
        });

        it('Add ToogleStrategy', async () => {
           
            const result = await page.evaluate(() => {
                OptionStrategyManager.add(ToogleStrategy);
                return true;
            });

            assert.strictEqual(result, true);
        });

    });

    describe('lookUp method', () => {

        it('SelectStrategy matched', async () => {
            
            const result = await page.evaluate(async () => {
                const selectElement = document.querySelector('#option-1');

                const strategy = await OptionStrategyManager.lookUp(selectElement);

                if(strategy === SelectStrategy) {
                    return true;
                } else {
                    return false;
                }
            });

            assert.strictEqual(result, true);

        });

        it('GroupStrategy matched', async () => {
            
            const result = await page.evaluate(async () => {
                const checkboxElement = Array.from(document.querySelectorAll('#div-1 > div'));

                const strategy = await OptionStrategyManager.lookUp(checkboxElement);

                if(strategy === GroupStrategy) {
                    return true;
                } else {
                    return false;
                }
            });

            assert.strictEqual(result, true);

        });

        it('ToogleStrategy matched', async () => {
            
            const result = await page.evaluate(async () => {
                const toogleElement = document.querySelector('#toogle');

                const strategy = await OptionStrategyManager.lookUp(toogleElement);

                if(strategy === ToogleStrategy) {
                    return true;
                } else {
                    return false;
                }
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