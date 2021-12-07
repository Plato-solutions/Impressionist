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

import puppeteer from 'puppeteer';

class Puppeteer {

    static async launch(options) {
        return await puppeteer.launch(options);
    }

    static async newPage(browser) {
        return await browser.newPage();
    }

    static async close(...controllers) {
        await Promise.all(
            controllers.map(async (controller) => {
                await controller.close();
            })
        );
    }

    static async goto(page, url) {
        try {
            await page.goto(url);
        } catch(e) {
            throw new Error('Puppeteer goto method failed with the following message: ', e.message);
        }
    }

    static async evaluate(page, pageFunction, ...args) {
        try {
            return await page.evaluate(pageFunction, ...args);
        } catch (e) {
            throw new Error('Execution of pageFunction in browser context failed with the following message: ', e.message);
        }
    }

    static async exposeFunction(page, name, puppeteerFunction) {
        await page.exposeFunction(name, puppeteerFunction);
    }

    static async addScriptTag(page, options) {
        await page.addScriptTag(options);
    }
}

export default Puppeteer;