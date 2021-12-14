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

describe('OptionStrategy - ToogleStrategy class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });
  
    describe('match method', () => {

        it('match method returns true', async () => {
    
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#toogle');
                    return await ToogleStrategy.match(selectElement);
                });
            });
    
            assert.strictEqual(result, true);
        });
    
        it('match method returns false', async () => {
    
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = Array.from(document.querySelectorAll('div'));
                    return await ToogleStrategy.match(selectElement);
                });
            });
    
            assert.strictEqual(result, false);
            
        });

    });

    describe('getOptions method', () => {

        it('Get options from a checkbox element', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const selectElement = document.querySelector('#toogle');
                    return await ToogleStrategy.getOptions('installation', selectElement);
                });
            });

            assert.deepStrictEqual(result, [
                {
                    value: { click: {}, selection: true },
                    installation: true
                },
                {
                    value: { click: {}, selection: false },
                    installation: false
                }
            ]);

        });
        
    });

    describe('setOption method', () => {

        it('Select an input element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const inputElement = document.querySelector('#toogle > input');
                    // inputElement.click(); // If the input is checked by default;
                    await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: true });
                    return inputElement.checked;
                });
            });

            assert.strictEqual(result, true);
        });

        it('Unselect an input element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    const inputElement = document.querySelector('#toogle > input');
                    await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: false });
                    return inputElement.checked;
                });
            });

            assert.strictEqual(result, false);
        });
        
    });

    after(async () => {
        await testingServer.stop();
    });

});