import assert from "assert";
import * as Impressionist from '../../../../src/index.js';
import NanoServer from '../../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('Collection Class Processors', () => {

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

    describe('Element', () => {

        it('Receives a collection with a DOM element an returns an array with element', async () => {

            const result = await page.evaluate( async () => {
                const elements = { reviews: Array.from(document.querySelectorAll('h1')) };

                const data = CollectionElementProcessor.call(elements);
                
                let result = [];

                for await(let element of data) {
                    result.push(element);
                }

                return result.length;
            });

            assert.strictEqual(result, 1);
        });

        it('Receives a collection with DOM elements an returns an array with elements', async () => {

            const result = await page.evaluate( async () => {
                const elements = { reviews: Array.from(document.querySelectorAll('#reviews > ul > li')) };

                const data = CollectionElementProcessor.call(elements);
                
                let result = [];

                for await(let element of data) {
                    result.push(element);
                }

                return result.length;
            });

            assert.strictEqual(result, 2);
        });

        it('Receives a collection without DOM elements and returns the same values', async () => {

            const result = await page.evaluate( async () => {
                const elements = { name: 'Plato Plugin' };

                const data = CollectionElementProcessor.call(elements);

                let result = [];

                for await(let element of data) {
                    result.push(element);
                }

                return result[0];
            });

            assert.strictEqual(result, 'Plato Plugin');
        });
    });

    describe('Option', () => {

        it('Receives a series of options', async () => {

            const result = await page.evaluate(async () => {
                
                const options = {
                    edition: document.querySelector('#option-1'),
                    support: document.querySelector('#option-2')
                };

                const values = await CollectionOptionProcessor.call(options);

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

    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});