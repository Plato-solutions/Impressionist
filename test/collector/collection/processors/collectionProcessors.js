/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


import assert from "assert";
import Impressionist from '../../../../src/process.js';
import NanoServer from '../../../testing-server/server.js';

describe('Collection Class Processors', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('Element', () => {

        it('Receives a collection with a DOM element an returns an array with element', async () => {
            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate( async () => {
                    const listOfH1 = { name: Array.from(document.querySelectorAll('h1')) };
                    const data = CollectionElementProcessor.call(listOfH1);
                    
                    let result = [];

                    for await(let element of data) {
                        result.push(element);
                    }

                    return result.length;
                });
            });

            assert.strictEqual(result, 1);
        });

        it('Receives a collection with DOM elements an returns an array with elements', async () => {

            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate( async () => {
                    const reviewElementList = { reviews: Array.from(document.querySelectorAll('#reviews > ul > li')) };
                    const data = CollectionElementProcessor.call(reviewElementList);
                    
                    let result = [];

                    for await(let element of data) {
                        result.push(element);
                    }

                    return result.length;
                });
            });

            assert.strictEqual(result, 2);
        });

    });

    describe('Option', () => {

        it('Receives a series of options', async () => {

            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                
                    const options = {
                        edition: document.querySelector('#option-1'),
                        support: document.querySelector('#option-2')
                    };
    
                    const values = await CollectionOptionProcessor.call(options);
    
                    let result = [];
    
                    for await(let value of values) {
                        const options = value.map(selectedOptions => {
                            if(selectedOptions.support) {
                                return {
                                    value: selectedOptions.value,
                                    support: selectedOptions.support.innerText
                                };
                            }
    
                            if(selectedOptions.edition) {
                                return {
                                    value: selectedOptions.value,
                                    edition: selectedOptions.edition.innerText
                                };
                            }
                        });
    
                        result.push(options);
                    }
    
                    return result;
                });
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
        await testingServer.stop();
    });

});