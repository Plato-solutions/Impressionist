import assert from "assert";
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('ProxyAccessor', () => {

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

    it('Execute - Receives Context object and return it as generator', async () => {
        const result = await page.evaluate( async () => {
                        
            const context = new Context().update('Custom Context');

            const data = new ProxyAccessor().call(context);

            let contextContainer = [];

            for await(let newContext of data) {
                contextContainer.push(newContext);
            }

            return contextContainer[0].getElement();
            
        });

        assert.strictEqual(result, 'Custom Context');
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});