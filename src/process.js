import puppeteer from 'puppeteer';
import useProxy from 'puppeteer-page-proxy';
import Environment from './environment.js';
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
    static async execute(
        url,
        customFunction,
        {
            browserOptions = {},
            args = []
        } = {}
    ) {

        const  { browser, page } = await Process.openConnection(url, browserOptions);

        let result;

        try {
            
            result = await customFunction(browser, page, ...args);

        } catch (e) {

            if(Environment.is(Environment.PRODUCTION)) {
                //await Process.#monitoringTool.sendException(e); //FIXME: Remove and replace with MonitorManager.
            } else {
                console.error(e);
            }

        } finally {
            await page.close();
            await browser.close();
            return result;
        }
    }

    /**
     * Open a connection to a browser instance.
     * @param { string } url - Target URL for scraping process.
     * @param { object } [ browserOptions = {} ] - Please read the documentation
     * about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @returns { Promise<object> } Promise object that represents an object that stores the browser, page instances.
     */
     static async openConnection(url, browserOptions = {}) {
        const  { browser, page } = await Process.#initializePuppeteer(browserOptions);
        await Process.setPageConfigurations(page, url);
        
        return { browser, page };
    }

    /**
     * Creates the Browser and Page instances.
     * @param { object } [ browserOptions = {} ] - Please read the documentation
     * about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @returns { Promise<object> } Promise object that represents an object that stores the browser, page instances.
     */
    static async #initializePuppeteer(browserOptions) {
        const browser = await Process.#createBrowser({ ...{ args: ['--no-sandbox'] }, ...browserOptions });
        const page = await Process.createPage(browser);

        return { browser, page };
    }

    /**
     * Create a new instance of {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser Browser class}.
     * @private
     * @param { object } [options = {}] - Please read the documentation about the {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions Launch Options}.
     * @returns { Promise<object> } Promise object that represents a {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser Browser instance}.
     */
    static async #createBrowser(options = {}) {
        return await puppeteer.launch(options);
    }

    /**
     * Creates a new instance of {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page}.
     * @param { object } browser - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser Browser instance}.
     * @returns { Promise<object> } Promise object that represents a {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * 
     * @example <caption>Create a second Page instance</caption>
     * ```
     * (async () => {
     *     const data = await Impressionist.Process.execute(url, scrape);
     *     console.log(JSON.stringify(data));
     * })(scrape);
     * 
     * async function scrape(browser, page) {
     *      const resultMainPage = await page.evaluate(...);
     *      
     *      // Need for a second page instance
     *      const secondPage = await Impressionist.Process.createPage(browser);
     * 
     *      ...
     * 
     * }
     * ```
     */
    static async createPage(browser) {
        return await browser.newPage();
    }

    /**
     * Method that takes as a parameter the Page instance that is started internally within the class.
     * The method can modify the behavior of the Page instance. Please read the documentation about the
     * {@link https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-class-page Page instance}.
     * 
     * @param {page} page - {@link https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page Page instance}.
     * @param {string} url - Target URL.
     * @property {number} [defaultTimeout = 60000 ] - Maximum time.
     * Please read {@link https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagesetdefaulttimeouttimeout page.setDefaultTimeout} documentation.
     * @property {object} [viewport = { width: 1366, height: 768, deviceScaleFactor: 1 } ] - Viewport.
     * Please read {@link https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagesetviewportviewport page.setViewport} documentation.
     * @property {object} [navigation = { waitUntil: 'networkidle2' } ] - Navigation parameters.
     * Please read {@link https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagegotourl-options page.goto} documentation.
     * @returns {Promise<void>} Promise object that represents the method execution completion.
     * 
     * @example <caption>Create a second Page instance and apply default configurations</caption>
     * ```
     * (async () => {
     *     const data = await Impressionist.Process.execute(url, scrape);
     *     console.log(JSON.stringify(data));
     * })(scrape);
     * 
     * async function scrape(browser, page) {
     *      const resultMainPage = await page.evaluate(...);
     *      
     *      // Need for a second page instance
     *      const secondPage = await Impressionist.Process.createPage(browser);
     *      
     *      // Apply default configurations
     *      await Impressionist.Process.setPageConfigurations(secondPage, 'https://...');
     *      
     *      // Using the second Page instance
     *      const resultSecondPage = await secondPage.evaluate(...);
     * 
     *      ...
     * 
     * }
     * ```
     * 
     *  @example <caption>Create a second Page instance and set a different viewport</caption>
     * ```
     * (async () => {
     *     const data = await Impressionist.Process.execute(url, scrape);
     *     console.log(JSON.stringify(data));
     * })(scrape);
     * 
     * async function scrape(browser, page) {
     *      const resultMainPage = await page.evaluate(...);
     *      
     *      // Need for a second page instance
     *      const secondPage = await Impressionist.Process.createPage(browser);
     *      
     *      // Apply different configurations
     *      await Impressionist.Process.setPageConfigurations(secondPage, 'https://...', {
     *          viewport: {
     *              width: 1920,
                    height: 1080,
                    deviceScaleFactor: 1
     *          }
     *      });
     *      
     *      // Using the second Page instance
     *      const resultSecondPage = await secondPage.evaluate(...);
     * 
     *      ...
     * 
     * }
     * ```
     */
    static async setPageConfigurations(
        page,
        url,
        {
            defaultTimeout = 60000,
            viewport = {
                width: 1366,
                height: 768,
                deviceScaleFactor: 1,
            },
            navigation = {
                waitUntil: 'networkidle2'
            }
        } = {}
    ) {
        await Process.#enableProxyFeatures(page);
        
        await page.setDefaultTimeout(defaultTimeout);
        await page.setViewport(viewport);

        await page.goto(url, navigation);

        Process.#enableDebugMode(page);
        await Process.#exposeFunctionalities(page);

        await Process.#enableImpressionist(page);
        await Process.#registerSelectors(page);
        await Process.#registerStrategies(page);
        await Process.#addProxyFunctions(page);
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
            SelectorDirectory.register(SelectorInterpreter);
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
        await page.addScriptTag({ content: 'const elements = (...args) => new ElementCollectorFactory(...args)'});
        await page.addScriptTag({ content: 'const options = (...args) => new OptionCollectorFactory(...args)'});
        await page.addScriptTag({ content: 'const css = SelectorDirectory.get("css")'});
        await page.addScriptTag({ content: 'const xpath = SelectorDirectory.get("xpath")'});
        await page.addScriptTag({ content: 'const merge = SelectorDirectory.get("merge")'});
        await page.addScriptTag({ content: 'const property = SelectorDirectory.get("property")'});
        await page.addScriptTag({ content: 'const pre = SelectorDirectory.get("pre")'});
        await page.addScriptTag({ content: 'const post = SelectorDirectory.get("post")'});
        await page.addScriptTag({ content: 'const all = SelectorDirectory.get("all")'});
        await page.addScriptTag({ content: 'const single = SelectorDirectory.get("single")'});
        await page.addScriptTag({ content: 'const init = SelectorDirectory.get("init")'});
        await page.addScriptTag({ content: 'const select = SelectorDirectory.get("selectorinterpreter")'});
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