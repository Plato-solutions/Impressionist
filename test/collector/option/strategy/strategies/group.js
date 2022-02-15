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

describe('OptionStrategy - GroupStrategy class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });
  
    describe('match method', () => {

        it('match method returns true', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const element = document.querySelectorAll('#div-1 > div');
                    return await GroupStrategy.match(element);
                });
            });
    
            assert.strictEqual(result, true);
        });
    
        it('match method returns false', async () => {
    
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const element = document.querySelector('#option-1');
                    return await GroupStrategy.match(element);
                });
            });
    
            assert.strictEqual(result, false);
        });

    });

    describe('getOptions method', () => {

        it('Get options from a select element', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const element = document.querySelectorAll('#div-1 > div');
                    const result = await GroupStrategy.getOptions('edition', element);

                    return result.map(option => {
                        return {
                            value: option.value,
                            edition: option.edition.innerText
                        };
                    });
                });
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
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const element = document.querySelectorAll('#div-no-options-11 > div');
                    return await GroupStrategy.getOptions('edition', element);
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

        it('Set second option to a div element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const parentElement = document.querySelector('#div-1');
                    const element = document.querySelector('#div-1 > div:nth-child(2)');
                    await GroupStrategy.setOption(parentElement, element);

                    return parentElement.getAttribute('value');
                });
            });

            const secondOptionOfFirstelement = '20';

            assert.strictEqual(result, secondOptionOfFirstelement);
        });

        it('Set third option to a div element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const parentElement = document.querySelector('#div-1');
                    const element = document.querySelector('#div-1 > div:nth-child(3)');
                    await GroupStrategy.setOption(parentElement, element);

                    return parentElement.getAttribute('value');
                });
            });

            const thridOptionOfFirstelement = '30';

            assert.strictEqual(result, thridOptionOfFirstelement);
        });
        
    });

    after(async () => {
        await testingServer.stop();
    });

});