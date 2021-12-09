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

import { PuppeteerController } from './browserControllers/index.js';
import * as BrowserClasses from '../lib/index.js';
import * as Selectors from '../lib/collector/query/selector/index.js';
import { MonitorManager } from './plugin-ins/index.js';

/**
 * Provides {@link https://pptr.dev/ Puppeteer} initialization by creating
 * {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser Browser} and
 * {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page} instances
 * to provide the browser context necessary for the execution of a custom function.
 * 
 * @summary Initialize Puppeteer.
 */
class Process {

    static #browserController = PuppeteerController;

    /**
     * It provides the necessary context to run a function in the puppeteer or browser context
     * by executing a series of steps, such as initializing a Browser instance and applying
     * extra configurations defined by an input parameter, initializing a Page instance and
     * applying default configurations to it so that the Impressionist library can be used
     * in the browser context of that specific instance.
     * 
     * @param { string } url - Target URL for scraping process.
     * @param { function } customFunction - Custom function to be executed in the Puppeteer context.
     * Like customFunction(browser, page, ...args) { ... }.
     * @property { object } [ browserOptions = {} ] - Please read the documentation
     * about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @property { Array } [ args = [] ] - Any parameter necessary for the custom function.
     * @returns {Promise} Promise object that represents the result of the custom function.
     * 
     * @example <caption>Basic Usage</caption>
     * ```
     * (async () => {
     *     const data = await Impressionist.Process.execute(url, scrape);
     *     console.log(JSON.stringify(data));
     * })(scrape);
     * 
     * async function scrape(browser, page) {
     *      ...
     * }
     * ```
     * 
     * @example <caption>Enabling Browser User Interface</caption>
     * ```
     * (async () => {
     *     const data = await Impressionist.Process.execute(url, scrape, { browserOptions: { headless: false } } );
     *     console.log(JSON.stringify(data));
     * })(scrape);
     * 
     * async function scrape(browser, page) {
     *      ...
     * }
     * ```
     */
    static async execute(url, customFunction, { browserOptions = {} } = {}) {
        let pageConnection;
        
        try {
            pageConnection = await Process.#browserController.initialize(url, browserOptions);
            // TODO: Page configuration.
            return await Process.#browserController.execute(pageConnection, customFunction);
        } catch (e) {
            // Error handling.
        } finally {
            await Process.#browserController.close(pageConnection);
        }
    }

    /**
     * Setting proxies per page basis.
     * Please check {@link https://www.npmjs.com/package/puppeteer-page-proxy puppeteer-page-proxy} npm package.
     * 
     * @private
     * @param { object } page - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @returns { Promise<void> } Promise object that represents the method execution completion.
     */
    static async #enableProxyFeatures(page) {
        if(Environment.is(Environment.PRODUCTION)) {
            await useProxy(page, Environment.get('PROXY'));
        }
    }

    /**
     * Display console.log messages in environments different than Production.
     * @private
     * @param { object } page - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     */
    static #enableDebugMode(page) {
        if(!Environment.is(Environment.PRODUCTION)) {
            
            page.on('console', msg => {
                
                for (let i = 0; i < msg.args().length; ++i) {
                    console.log(`${i}: ${msg.args()[i]}`);
                }

            });
        }
    }

    static async #exposeFunctionalities(page) {
        await Process.#exposePage(page);
        await Process.#exposeLogger(page);
        await Process.#exposeClick(page);
    }

    static async #exposePage(page) {
        await page.exposeFunction('puppeteerPage', async (fn, ...args) => {
            return await page[fn](...args);
        });
    }

    /**
     * Exposes the logger function to be used in the browser.
     * @param { object } page - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     */
    static async #exposeLogger(page) {
        await page.exposeFunction('logger', (report) => {
            MonitorManager.log(report);
        });
    }

    static async #exposeClick(page) {
        await page.exposeFunction('puppeteerClick', async (selector, delay = 0) => {
            await page.click(selector);
            await page.waitForTimeout(delay);
        });
    }

    /**
     * Load the library classes in the browser environment.
     * @private
     * @param { object } page - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @returns { Promise<void> } Promise object that represents the method execution completion.
     */
    static async #enableImpressionist(page) {

        await page.addScriptTag({ content: BrowserClasses['Selector'].toString() });
        
        Object.entries(BrowserClasses).map(async customClass => { 
                await page.addScriptTag({ content: BrowserClasses[customClass[0]].toString() });
            }
        );
    }

    /**
     * Make the registration of Selectable sub-classes using their static method register.
     * @private
     * @param { object } page {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @returns { Promise<void> } Promise object that represents the method execution completion.
     */
    static async #registerSelectors(page) {
        const classesRegistered = Object.keys(Selectors).map(cl => {
            return page.evaluate((cl) => {
                eval(cl+".register()");
                return true;
            }, cl);
        });

        await Promise.all(classesRegistered);
    }

    /**
     * Register strategies.
     * @private
     * @param { object } page {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @returns { Promise<void> } Promise object that represents the method execution completion.
     */
    static async #registerStrategies(page) {
        await page.evaluate(() => {
            //SelectorDirectory.register(SelectorInterpreter);
            InterpreterStrategyManager.add(InterpreterElementStrategy);
            InterpreterStrategyManager.add(InterpreterInnerTextStrategy);
            InterpreterStrategyManager.add(InterpreterPropertyStrategy);
            OptionStrategyManager.add(SelectStrategy);
            OptionStrategyManager.add(GroupStrategy);
            OptionStrategyManager.add(ToogleStrategy);
        });
    }

    /**
     * Add functions to be used in Browser Context.
     * @private
     * @param { object } page {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @returns { Promise<void> } Promise object that represents the method execution completion.
     */
    static async #addProxyFunctions(page) {
        await page.addScriptTag({ content: 'const page = new Proxy({}, { get: function (target, prop) { target[prop] = function (...args) { puppeteerPage(prop, ...args) }; return target[prop] } })'});
        await page.addScriptTag({ content: 'const collector = (...args) => new Collector(new Collection(...args))'});
        await page.addScriptTag({ content: 'const elements = SelectorDirectory.get("elements")'});
        await page.addScriptTag({ content: 'const options = SelectorDirectory.get("options")'});
        await page.addScriptTag({ content: 'const css = SelectorDirectory.get("css")'});
        await page.addScriptTag({ content: 'const xpath = SelectorDirectory.get("xpath")'});
        await page.addScriptTag({ content: 'const merge = SelectorDirectory.get("merge")'});
        await page.addScriptTag({ content: 'const property = SelectorDirectory.get("property")'});
        await page.addScriptTag({ content: 'const pre = SelectorDirectory.get("pre")'});
        await page.addScriptTag({ content: 'const post = SelectorDirectory.get("post")'});
        await page.addScriptTag({ content: 'const all = SelectorDirectory.get("all")'});
        await page.addScriptTag({ content: 'const single = SelectorDirectory.get("single")'});
        await page.addScriptTag({ content: 'const init = SelectorDirectory.get("init")'});
        await page.addScriptTag({ content: 'const select = SelectorDirectory.get("select")'});
        await page.addScriptTag({ content: 'const load = { all: function loadAll(selector){ return async function loadLazyLoad(){ return await LazyLoadHandler.execute(selector) } },  pagination: function loadPagination(selector){ return async function paginationParts(){ return await Pagination.execute(selector) } } }'});
        await page.addScriptTag({ content: 'function clickAndWait(selector, forSelector, timeout) { return async function ClickAndWait() { if(typeof forSelector === "number") { timeout = forSelector; forSelector = "" } await Promise.any([puppeteerClick(selector, timeout), page.waitForSelector(forSelector)]) } }' });
    }

    /**
     * Execute a function in a specific browser endpoint.
     * @param { string } browserWSEndpoint - {@link https://pptr.dev/#?product=Puppeteer&version=v10.4.0&show=api-browserwsendpoint Browser websocket endpoint}.
     * @param { function } customFunction - Custom function to be executed in the Puppeteer context.
     * Like customFunction(browser, page, ...args) { ... }. 
     * @param  { Array<any> } [ args = [] ] - Any parameter necessary for the custom function. 
     * @returns { Promise<any> } Promise object that represents the result of the custom function.
     */
    static async connect(browserWSEndpoint, customFunction, ...args) {
        const browser = await puppeteer.connect({ browserWSEndpoint });
        
        const target = await browser.waitForTarget(
            (target) => !(target.url().includes('about:blank')) && target.type() === 'page'
        );

        const page = await target.page();

        return await customFunction(browser, page, ...args);
    }

}

export default Process;