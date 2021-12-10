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
import * as Collector from '../lib/index.js';
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

    /**
     * Provides methods and features to interact with the browser. By default, PuppeteerController.
     */
    static browserController = PuppeteerController;

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
        let connectionIdentifier;
        
        try {
            connectionIdentifier = await Process.initialize(url, browserOptions);
            await Process.configureConnection(connectionIdentifier);
            return await Process.executeFunction(connectionIdentifier, customFunction);
        } catch (e) {
            await Process.handleError(e, connectionIdentifier);
        } finally {
            await Process.close(connectionIdentifier);
        }
    }

    /**
     * Perform actions to initialize a connection to a page using the browser controller.
     * @param { string } url - URL or browser Endpoint.
     * @param { object } [ browserOptions = {} ] - Options to configure the browser controller.
     * @returns { Promise<symbol> } Promise which resolves to a connection identifier.
     */
    static async initialize(url, browserOptions) {
        return await Process.browserController.initialize(url, browserOptions);
    }

    /**
     * Configure a page connection.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async configureConnection(connectionIdentifier) {
        await Process.enableImpressionistFeatures(connectionIdentifier);
    }

    /**
     * Enable all the Impressionist features to be used in the browser context.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async enableImpressionistFeatures(connectionIdentifier) {
        await Process.enableCollector(connectionIdentifier);
        await Process.registerSelectors(connectionIdentifier);
        await Process.registerStrategies(connectionIdentifier);
        await Process.addProxyFunctions(connectionIdentifier);
        await Process.exposeLogger(connectionIdentifier);
    }

    /**
     * Execute the function in the browser context provided by the browser controller.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     * @param { function } customFunction - Custom function to be executed in the Puppeteer context.
     * Like customFunction(browser, page, ...args) { ... }.
     * @returns { Promise<any> } Promise which resolves to the result of the execution of the function.
     */
    static async executeFunction(connectionIdentifier, customFunction) {
        return await Process.browserController.execute(connectionIdentifier, customFunction);
    }

    /**
     * Handle errors.
     * @param { Error } error - Error object.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     * @returns { Promise<any> } Promise which resolves to any result of error handling.
     */
    static async handleError(error, connectionIdentifier) {
        throw new Error('Impressionist detect an error in the custom function: ' + error.message);
    }

    /**
     * Close connections.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     * @returns { Promise<any> } Promise which resolves to any result of closing connections.
     */
    static async close(connectionIdentifier) {
        await Process.browserController.close(connectionIdentifier);
    }

    /**
     * Exposes the logger function to be used in the browser context.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async exposeLogger(connectionIdentifier) {
        await Process.browserController.expose(connectionIdentifier, function logger(report) {
            MonitorManager.log(report);
        });
    }

    /**
     * Load the library classes in the browser environment.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async enableCollector(pageConnecction) {

        await Process.browserController.inject(pageConnecction, Collector['Selector'].toString());
        
        Object.entries(Collector).map(async customClass => { 
                await Process.browserController.inject(pageConnecction, Collector[customClass[0]].toString());
            }
        );
    }

    /**
     * Make the registration of Selectable sub-classes using their static method register.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async registerSelectors(connectionIdentifier) {
        const classesRegistered = Object.keys(Selectors).map(cl => {
            return Process.browserController.evaluate(connectionIdentifier, (cl) => {
                eval(cl+".register()");
                return true;
            }, cl);
        });

        await Promise.all(classesRegistered);
    }

    /**
     * Register strategies.
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async registerStrategies(connectionIdentifier) {
        await Process.browserController.evaluate(connectionIdentifier, () => {
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
     * @param { symbol } connectionIdentifier - Unique identifier for a page connection.
     */
    static async addProxyFunctions(connectionIdentifier) {
        await Process.browserController.inject(connectionIdentifier, 'const collector = (...args) => new Collector(new Collection(...args))');
        await Process.browserController.inject(connectionIdentifier, 'const elements = SelectorDirectory.get("elements")');
        await Process.browserController.inject(connectionIdentifier, 'const options = SelectorDirectory.get("options")');
        await Process.browserController.inject(connectionIdentifier, 'const css = SelectorDirectory.get("css")');
        await Process.browserController.inject(connectionIdentifier, 'const xpath = SelectorDirectory.get("xpath")');
        await Process.browserController.inject(connectionIdentifier, 'const merge = SelectorDirectory.get("merge")');
        await Process.browserController.inject(connectionIdentifier, 'const property = SelectorDirectory.get("property")');
        await Process.browserController.inject(connectionIdentifier, 'const pre = SelectorDirectory.get("pre")');
        await Process.browserController.inject(connectionIdentifier, 'const post = SelectorDirectory.get("post")');
        await Process.browserController.inject(connectionIdentifier, 'const all = SelectorDirectory.get("all")');
        await Process.browserController.inject(connectionIdentifier, 'const single = SelectorDirectory.get("single")');
        await Process.browserController.inject(connectionIdentifier, 'const init = SelectorDirectory.get("init")');
        await Process.browserController.inject(connectionIdentifier, 'const select = SelectorDirectory.get("select")');
        await Process.browserController.inject(connectionIdentifier, 'const load = { all: function loadAll(selector){ return async function loadLazyLoad(){ return await LazyLoadHandler.execute(selector) } },  pagination: function loadPagination(selector){ return async function paginationParts(){ return await Pagination.execute(selector) } } }');
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

    /**
     * Set a browser controller which Impressionist use to interact with the browser context.
     * @param { object } browserController - Browser controller.
     */
    static setBrowserController(browserController) {
        Process.browserController = browserController;
    }

    /**
     * Load a plugin.
     * @param { object } plugin - A class to extends or modify the Impressionist behavior.
     */
    static loadPlugin(plugin) {
        plugin.visit(this);
    }

}

export default Process;