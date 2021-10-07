import assert from "assert";
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('CollectorFactory - Collection', () => {

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

    it('Return a collection', async () => {
        const result = await page.evaluate(async () => {
            const context = new Context();
            const data = ( function () {

                const css = SelectorDirectory.get('css');
                const merge = SelectorDirectory.get('merge');
    
                return new CollectionCollectorFactory(
                    new Collector(
                        new Collection({
                            test: () => document
                        }).postProcessor(CollectionElementProcessor)
                    ),
                    {
                        name: css('h1').property('innerText').single(),
                        media_gallery: merge([ css('#logo > img'), css('#carousel > img') ]).property('src').all(),
                    }
                );
        
            } )();

            const result = await data.call(context);
            
            return result;

        });

        assert.deepStrictEqual(result, [{
            name: 'Plato Plugin',
            media_gallery: [
                'http://platoanalytics.com/logo.jpg',
                'http://platoanalytics.com/img1.jpg',
                'http://platoanalytics.com/img2.jpg',
                'http://platoanalytics.com/img3.jpg',
                'http://platoanalytics.com/img4.jpg'
            ]
        }]);
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});