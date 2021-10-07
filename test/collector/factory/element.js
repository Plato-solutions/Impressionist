import assert from "assert";
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('Collector Class', () => {

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

    it('Return a list of Elements', async () => {
        const result = await page.evaluate(async () => {

            const data = ( function () {

                const css = SelectorDirectory.get('css');
    
                return new ElementCollectorFactory(css('#reviews > ul > li').all());
        
            } )();

            const context = new Context();
            const result = await data.call(context);
            
            return result.length;

        });

        assert.strictEqual(result, 2);
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});