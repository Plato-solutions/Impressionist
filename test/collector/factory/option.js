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
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('OptionCollectorFactory Class', () => {

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
                        edition: '{#option-1}',
                        support: '{#option-2}'
                    }
                );
        
            } )();

            const context = new Context();
            const values = await data.call(context);

            let result = [];

            for await(let value of values[0]) {
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

    it('Return a list of Elements. Does not print non-existing options.', async () => {
      const result = await page.evaluate(async () => {

          const data = ( function () {

              const css = SelectorDirectory.get('css');
  
              return new OptionCollectorFactory(
                  {
                      edition: '{#option-1}',
                      support: '{#option-2}',
                      additional: '{#fake-option}'
                  }
              );
      
          } )();

          const context = new Context();
          const values = await data.call(context);

          let result = [];

          for await(let value of values[0]) {
              result.push(value);
          }

          return result;

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
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});