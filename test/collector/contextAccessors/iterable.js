import assert from "assert";
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('IterableAccessor', () => {

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

    it('Execute - Receives a Collection and returns an iterable of Context objects', async () => {
        const result = await page.evaluate( async () => {
                        
            const data = new IterableAccessor(
                new Collection({
                    reviews: () => Array.from(document.querySelectorAll('#reviews > ul > li'))
                }).postProcessor(CollectionElementProcessor)
            );

            let contextContainer = [];

            const context = new Context();

            for await(let newContext of data.call(context)) {
                contextContainer.push(newContext);
            }

            return contextContainer.length === 2 && contextContainer[0] instanceof Context;
            
        });

        assert.strictEqual(result, true);
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});