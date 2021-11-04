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

describe('Option Class', () => {

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
  
    it('Handle Options for a Select Element', async () => {
            
        const result = await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');

            const optionsIterable = new Option('edition', selectElement);
            
            const options = optionsIterable.call();

            let result = [];

            for await (let option of options) {
                result.push(option);
            }

            return result;
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

    it('Handle Options with CheckboxStrategy', async () => {
        
        const result = await page.evaluate(async () => {
            const checkboxElement = Array.from(document.querySelectorAll('#div-1 > div'));

            const optionsIterable = new Option('edition', checkboxElement);
            
            const options = optionsIterable.call();

            let result = [];

            for await (let option of options) {
                result.push(option);
            }

            return result;
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

    it('Handle Options with ToogleStrategy', async () => {
        
        const result = await page.evaluate(async () => {
            const toogleElement = document.querySelector('#toogle');

            const optionsIterable = new Option('installation', toogleElement);
            
            const options = optionsIterable.call();

            let result = [];

            for await (let option of options) {
                result.push(option);
            }

            return result;
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

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});