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

describe('OptionStrategy - MissingStrategy class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });
  
    describe('match method', () => {

        it('Always return true', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(() => {
                    return MissingStrategy.match('#select1');
                });
            });
            
            assert.strictEqual(result, true);
            
        });

    });

    describe('getOptions method', () => {

        it('Return null properties', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    return await MissingStrategy.getOptions('id', null);
                });
            });

            assert.deepStrictEqual(result, [{ value: null, id: null }]);
        });
        
    });

    describe('setOption method', () => {

        it('Return true', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    return await MissingStrategy.setOption(null);
                });
            });
            
            assert.strictEqual(result, true);
        });
        
    });

    after(async () => {
        await testingServer.stop();
    });

});