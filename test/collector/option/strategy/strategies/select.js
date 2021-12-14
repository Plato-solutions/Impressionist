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
import Impressionist from '../../../../../src/process.js';
import NanoServer from '../../../../testing-server/server.js';

describe('OptionStrategy - SelectStrategy class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });
  
    describe('match method', () => {

        it('match method returns true', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#option-1');
                    return await SelectStrategy.match(selectElement);
                });
            });
    
            assert.strictEqual(result, true);
        });
    
        it('match method returns false', async () => {
    
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('div');
                    return await SelectStrategy.match(selectElement);
                });
            });
    
            assert.strictEqual(result, false);
        });

    });

    describe('getOptions method', () => {

        it('Get options from a select element', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#option-1');
                    return await SelectStrategy.getOptions('edition', selectElement);
                });
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
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#option-no-options-1');
                    return await SelectStrategy.getOptions('edition', selectElement);
                });
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

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#option-1');
                    await SelectStrategy.setOption(selectElement, '20');
                    return selectElement.value;
                });
            });

            const secondOptionOfFirstSelectElement = '20';

            assert.strictEqual(result, secondOptionOfFirstSelectElement);
        });

        it('Set third option to a select element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#option-1');
                    await SelectStrategy.setOption(selectElement, '30');
                    return selectElement.value;
                });
            });

            const thridOptionOfFirstSelectElement = '30';

            assert.strictEqual(result, thridOptionOfFirstSelectElement);
        });
        
    });

    after(async () => {
        await testingServer.stop();
    });

});