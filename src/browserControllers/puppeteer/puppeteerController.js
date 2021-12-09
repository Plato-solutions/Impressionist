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

import Puppeteer from "./puppeteer.js";

/**
 * Provides shorcut methods to Puppeteer configurations for initialize 
 */
class PuppeteerController {

    /**
     * Browser instance.
     */
    static browser;

    /**
     * Page instances.
     */
    static pages = new Map();

    /**
     * Open a connection to an URL using a page instance.
     * @param { string } url - URL.
     * @param { object } [ options = {} ] - Please read the documentation
     * about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @returns { Promise<symbol> } Promise which resolves to a unique identifier represented by a Symbol.
     */
    static async initialize(url, options) {
        PuppeteerController.browser ||= await Puppeteer.launch(options);
        const page = await Puppeteer.newPage(PuppeteerController.browser);
        await Puppeteer.goto(page, url);
        const identifier = Symbol();
        PuppeteerController.pages.set(identifier, page);
        
        return identifier;
    }

    /**
     * Close connections.
     * @param { symbol } [identifier] - Unique identifier for a page connection.
     */
    static async close(identifier) {
        if(PuppeteerController.pages.size > 1) {
            await Puppeteer.close(PuppeteerController.pages.get(identifier));
        } else {
            PuppeteerController.pages.clear();
            await Puppeteer.close(PuppeteerController.browser);
            PuppeteerController.browser = null;
        }
    }

    /**
     * Evaluate a function in a specific page.
     * @param { symbol } identifier - Unique identifier for a page connection.
     * @param { function } pageFunction - A function to be evaluated in the browser context.
     * @param  {...any} args - Arguments for being passed to the pageFunction.
     * @returns { Promise<any> } Promise which resolves to the result of the pageFunction.
     */
    static async evaluate(identifier, pageFunction, ...args) {
        try {
            return await Puppeteer.evaluate(PuppeteerController.pages.get(identifier), pageFunction, ...args);
        } catch(e) {
            throw new Error('Function execution failed with the following message: ' + e.message);
        }
    }

    /**
     * Execute a function which provides browser and page as parameters.
     * @param { symbol } identifier - Unique identifier for a page connection.
     * @param { function } puppeteerFunction - Custom function.
     * @returns { Promise<any> } Promise which resolves to the result of the puppeteerFunction.
     */
    static async execute(identifier, puppeteerFunction) {
        try {
            return await puppeteerFunction(PuppeteerController.browser, PuppeteerController.pages.get(identifier));
        } catch (e) {
            throw new Error('Function execution failed with the following message: ' + e.message);
        }
    }

    /**
     * Inject a function in the HTML layout.
     * @param { symbol } identifier - Unique identifier for a page connection.
     * @param { function } functionality - Function to be load as a script tag in the page.
     */
    static async inject(identifier, functionality) {
        const serializedFunctionality = functionality.toString();
        await Puppeteer.addScriptTag(PuppeteerController.pages.get(identifier), {
            content: serializedFunctionality
        });
    }

    /**
     * Expose a NodeJS function to be used from the browser context.
     * @param { symbol } identifier - Unique identifier for a page connection.
     * @param { function } functionality - Function to be exposed.
     * @param { string } [name=functionality.name] - Function name to be used in the browserContext.
     */
    static async expose(identifier, functionality, name) {
        name ||= functionality.name;
        await Puppeteer.exposeFunction(PuppeteerController.pages.get(identifier), name, functionality);
    }
}

export default PuppeteerController;