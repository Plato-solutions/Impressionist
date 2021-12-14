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
import { Context } from "../../../lib/index.js";
import Impressionist from '../../../src/process.js';
import NanoServer from '../../testing-server/server.js';

describe('OptionCollectorFactory Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it('Return a list of Elements', async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => {
                const values = await new OptionCollectorFactory({
                    edition: '{#option-1}',
                    support: '{#option-2}'    
                }).call(new Context());
            
                let result = [];
    
                for await(let value of values[0]) {
                    result.push(value);
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

    it('Return a list of Elements. Does not print non-existing options.', async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => {
                const values = await new OptionCollectorFactory({
                    edition: '{#option-1}',
                    support: '{#option-2}',
                    additional: '{#fake-option}'
                }).call(new Context());
    
                let result = [];
    
                for await(let value of values[0]) {
                    result.push(value);
                }
    
                return result;
            });
        });

        assert.deepStrictEqual(result, [
            [
                { value: null, additional: null },
                { value: '40', support: 'val-40' },
                { value: '10', edition: 'val-10' }
            ],
            [
                { value: null, additional: null },
                { value: '50', support: 'val-50' },
                { value: '10', edition: 'val-10' }
            ],
            [
                { value: null, additional: null },
                { value: '40', support: 'val-40' },
                { value: '20', edition: 'val-20' }
            ],
            [
                { value: null, additional: null },
                { value: '50', support: 'val-50' },
                { value: '20', edition: 'val-20' }
            ],
            [
                { value: null, additional: null },
                { value: '40', support: 'val-40' },
                { value: '30', edition: 'val-30' }
            ],
            [
                { value: null, additional: null },
                { value: '50', support: 'val-50' },
                { value: '30', edition: 'val-30' }
            ]
        ]);
    });

    after(async () => {
        await testingServer.stop();
    });

});