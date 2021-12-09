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

/**
 * Controls access to puppeteer methods and features.
 */
class Puppeteer {

    /**
     * Enables a connection to control the browser.
     * @param { object } [ options = {} ] - Please read the documentation
     * about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @returns { Promise<object> } Promise which resolves to browser instance.
     */
    static async launch(options) {
        return await puppeteer.launch(options);
    }

    /**
     * Create a new {@link https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-class-page Page object}.
     * @param { object } browser - Browser instance.
     * @returns { Promise<object> } Promise which resolves to a new Page object. The Page is created in a default browser context.
     */
    static async newPage(browser) {
        return await browser.newPage();
    }

    /**
     * Close any instance of Page or Browser.
     * @param  {...any} controllers - Page or Browser instances.
     */
    static async close(...controllers) {
        await Promise.all(
            controllers.map(async (controller) => {
                await controller.close();
            })
        );
    }

    /**
     * Navigate to a specific URL.
     * @param { object } page - Page instance.
     * @param { string } url - URL.
     */
    static async goto(page, url) {
        try {
            await page.goto(url);
        } catch(e) {
            throw new Error('Puppeteer goto method failed with the following message: ' + e.message);
        }
    }

    /**
     * Execute a function in the browser context.
     * @param { object } page - Page instance.
     * @param { Function } pageFunction - A function to be executed in the browser context.
     * @param  {...any} args - Function arguments.
     * @returns { Promise<any> } Promise which resolves to a result of the function executed in the browser context.
     */
    static async evaluate(page, pageFunction, ...args) {
        try {
            return await page.evaluate(pageFunction, ...args);
        } catch (e) {
            throw new Error('Execution of pageFunction in browser context failed with the following message: ' + e.message);
        }
    }

    /**
     * Expose a NodeJS function to be called from the browser context.
     * @param { object } page - Page Instance.
     * @param { string } name - Function name to be called from the browser context.
     * @param { Function } puppeteerFunction - Function that is going to be executed in the NodeJS context.
     */
    static async exposeFunction(page, name, puppeteerFunction) {
        await page.exposeFunction(name, puppeteerFunction);
    }

    /**
     * Add a new script tag in the HTML layout.
     * @param { object } page - Page instance.
     * @param { object } options - Options for load content in the script tag. Please check the {@link https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-pageaddscripttagoptions documentation}.
     */
    static async addScriptTag(page, options) {
        await page.addScriptTag(options);
    }
}

export default Puppeteer;