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
    
                return new OptionCollectorFactory(
                    {
                        edition: () => document.querySelector('#option-1'),
                        support: () => document.querySelector('#option-2')
                    }
                );
        
            } )();

            const context = new Context();
            const values = await data.call(context);

            let result = [];

            for await(let value of values) {
                result.push(value);
            }

            return result;

        });

        assert.deepStrictEqual(result, [
            [
              { value: '40', support: 'val-40' },
              { value: '10', edition: 'val-10' }
            ],
            [
              { value: '50', support: 'val-50' },
              { value: '10', edition: 'val-10' }
            ],
            [
              { value: '40', support: 'val-40' },
              { value: '20', edition: 'val-20' }
            ],
            [
              { value: '50', support: 'val-50' },
              { value: '20', edition: 'val-20' }
            ],
            [
              { value: '40', support: 'val-40' },
              { value: '30', edition: 'val-30' }
            ],
            [
              { value: '50', support: 'val-50' },
              { value: '30', edition: 'val-30' }
            ]
        ]);
    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});