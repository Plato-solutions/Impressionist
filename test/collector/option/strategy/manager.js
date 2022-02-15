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

describe('OptionStrategyManager class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });
  
    describe('lookUp method', () => {

        it('SelectStrategy matched', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async() => {
                    const selectElement = document.querySelector('#option-1');
                    const strategy = await OptionStrategyManager.lookUp(selectElement);
                    return strategy === SelectStrategy;
                });
            });

            assert.strictEqual(result, true);
        });

        it('GroupStrategy matched', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async() => {
                    const checkboxElement = Array.from(document.querySelectorAll('#div-1 > div'));
                    const strategy = await OptionStrategyManager.lookUp(checkboxElement);
                    return strategy === GroupStrategy;
                });
            });

            assert.strictEqual(result, true);
        });

        it('ToogleStrategy matched', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async() => {
                    const toogleElement = document.querySelector('#toogle');
                    const strategy = await OptionStrategyManager.lookUp(toogleElement);
                    return strategy === ToogleStrategy;
                });
            });

            assert.strictEqual(result, true);
        });
        
    });

    after(async () => {
        await testingServer.stop();
    });

});