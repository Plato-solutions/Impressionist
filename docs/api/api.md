## Classes

<dl>
<dt><a href="#Environment">Environment</a></dt>
<dd><p>It manages the use of environment variables by providing useful methods for checking and obtaining the variables.</p>
</dd>
<dt><a href="#Process">Process</a></dt>
<dd><p>Provides <a href="https://pptr.dev/">Puppeteer</a> initialization by creating
<a href="https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser">Browser</a> and
<a href="https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page">Page</a> instances
to provide the browser context necessary for the execution of a custom function.</p>
</dd>
</dl>

<a name="Environment"></a>

## Environment
It manages the use of environment variables by providing useful methods for checking and obtaining the variables.

**Kind**: global class  

* [Environment](#Environment)
    * _instance_
        * [.PRODUCTION](#Environment+PRODUCTION)
        * [.IMPRESSIONIST_VERSION](#Environment+IMPRESSIONIST_VERSION)
    * _static_
        * [.is(environment)](#Environment.is) ⇒ <code>boolean</code>
        * [.has(variable)](#Environment.has) ⇒ <code>boolean</code>
        * [.get(variable)](#Environment.get) ⇒ <code>string</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code>

<a name="Environment+PRODUCTION"></a>

### environment.PRODUCTION
Value of the variable defined by the NodeJS processor to identify the Production execution environment.

**Kind**: instance property of [<code>Environment</code>](#Environment)  
<a name="Environment+IMPRESSIONIST_VERSION"></a>

### environment.IMPRESSIONIST\_VERSION
The current version of the library. It can be used, for example, for bug reporting plugins.

**Kind**: instance property of [<code>Environment</code>](#Environment)  
<a name="Environment.is"></a>

### Environment.is(environment) ⇒ <code>boolean</code>
Check if a specific environment is running. i.e prod or dev.

**Kind**: static method of [<code>Environment</code>](#Environment)  
**Returns**: <code>boolean</code> - Result true or false.  

| Param | Type | Description |
| --- | --- | --- |
| environment | <code>string</code> | Identifier of the ENV environment variable. For example, prod, dev, etc. |

**Example**  
```
if(Environment.is(Environment.PRODUCTION)) {
     ...
}
```
<a name="Environment.has"></a>

### Environment.has(variable) ⇒ <code>boolean</code>
Check if a specific environment variable exists.

**Kind**: static method of [<code>Environment</code>](#Environment)  
**Returns**: <code>boolean</code> - Result true or false.  

| Param | Type | Description |
| --- | --- | --- |
| variable | <code>string</code> | The variable to check. |

**Example**  
```
if(Environment.has('SENTRY_TAGS')) {
     ...
}
```
<a name="Environment.get"></a>

### Environment.get(variable) ⇒ <code>string</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code>
Return a specific env var. If not exist return null.

**Kind**: static method of [<code>Environment</code>](#Environment)  

| Param | Type | Description |
| --- | --- | --- |
| variable | <code>string</code> | The variable to extract. |

**Example**  
```
for(const [name, value] of Object.entries(Environment.get('SENTRY_TAGS'))) {
     sentry.setTag(name, value);
}
```
<a name="Process"></a>

## Process
Provides [Puppeteer](https://pptr.dev/) initialization by creating
[Browser](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser) and
[Page](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page) instances
to provide the browser context necessary for the execution of a custom function.

**Kind**: global class  
**Summary**: Initialize Puppeteer.  

* [Process](#Process)
    * _instance_
        * [.browserController](#Process+browserController)
    * _static_
        * [.execute(url, customFunction, options)](#Process.execute) ⇒ <code>Promise</code>
        * [.initialize(url, [browserOptions])](#Process.initialize) ⇒ <code>Promise.&lt;symbol&gt;</code>
        * [.configureConnection(connectionIdentifier)](#Process.configureConnection)
        * [.enableImpressionistFeatures(connectionIdentifier)](#Process.enableImpressionistFeatures)
        * [.executeFunction(connectionIdentifier, customFunction)](#Process.executeFunction) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.handleError(error, connectionIdentifier)](#Process.handleError) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.close(connectionIdentifier)](#Process.close) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.exposeLogger(connectionIdentifier)](#Process.exposeLogger)
        * [.enableCollector(connectionIdentifier)](#Process.enableCollector)
        * [.registerSelectors(connectionIdentifier)](#Process.registerSelectors)
        * [.registerStrategies(connectionIdentifier)](#Process.registerStrategies)
        * [.addProxyFunctions(connectionIdentifier)](#Process.addProxyFunctions)
        * [.connect(browserWSEndpoint, customFunction, [...args])](#Process.connect) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.setBrowserController(browserController)](#Process.setBrowserController)
        * [.loadPlugin(plugin)](#Process.loadPlugin)

<a name="Process+browserController"></a>

### process.browserController
Provides methods and features to interact with the browser. By default, PuppeteerController.

**Kind**: instance property of [<code>Process</code>](#Process)  
<a name="Process.execute"></a>

### Process.execute(url, customFunction, options) ⇒ <code>Promise</code>
It provides the necessary context to run a function in the puppeteer or browser context
by executing a series of steps, such as initializing a Browser instance and applying
extra configurations defined by an input parameter, initializing a Page instance and
applying default configurations to it so that the Impressionist library can be used
in the browser context of that specific instance.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise</code> - Promise object that represents the result of the custom function.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Target URL for scraping process. |
| customFunction | <code>function</code> | Custom function to be executed in the Puppeteer context. Like customFunction(browser, page, ...args) { ... }. |
| options | <code>Object</code> | Options to configure the browser and page. Please check the browser configuration in https://pptr.dev/api/puppeteer.puppeteerlaunchoptions Please check the page navigation options in https://pptr.dev/api/puppeteer.page.goto. |

**Example** *(Basic Usage)*  
```
(async () => {
    const data = await Impressionist.Process.execute(url, scrape);
    console.log(JSON.stringify(data));
})(scrape);

async function scrape(browser, page) {
     ...
}
```
**Example** *(Enabling Browser User Interface)*  
```
(async () => {
     return await Impressionist.Process.execute(
         url,
         function scrape() { ... },
         {
             browserOptions: { headless: false }
         }
     );
})();
```
**Example** *(Set a specific page navigation timeout)*  
```
(async () => {
     return await Impressionist.Process.execute(
         url,
         function scrape() { ... },
         { 
             pageOptions: { timeout: 120000 },
         },
     );
})();
```
<a name="Process.initialize"></a>

### Process.initialize(url, [browserOptions]) ⇒ <code>Promise.&lt;symbol&gt;</code>
Perform actions to initialize a connection to a page using the browser controller.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;symbol&gt;</code> - Promise which resolves to a connection identifier.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL or browser Endpoint. |
| [browserOptions] | <code>object</code> | <code>{}</code> | Options to configure the browser controller. |

<a name="Process.configureConnection"></a>

### Process.configureConnection(connectionIdentifier)
Configure a page connection.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.enableImpressionistFeatures"></a>

### Process.enableImpressionistFeatures(connectionIdentifier)
Enable all the Impressionist features to be used in the browser context.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.executeFunction"></a>

### Process.executeFunction(connectionIdentifier, customFunction) ⇒ <code>Promise.&lt;any&gt;</code>
Execute the function in the browser context provided by the browser controller.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to the result of the execution of the function.  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |
| customFunction | <code>function</code> | Custom function to be executed in the Puppeteer context. Like customFunction(browser, page, ...args) { ... }. |

<a name="Process.handleError"></a>

### Process.handleError(error, connectionIdentifier) ⇒ <code>Promise.&lt;any&gt;</code>
Handle errors.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to any result of error handling.  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error object. |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.close"></a>

### Process.close(connectionIdentifier) ⇒ <code>Promise.&lt;any&gt;</code>
Close connections.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to any result of closing connections.  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.exposeLogger"></a>

### Process.exposeLogger(connectionIdentifier)
Exposes the logger function to be used in the browser context.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.enableCollector"></a>

### Process.enableCollector(connectionIdentifier)
Load the library classes in the browser environment.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.registerSelectors"></a>

### Process.registerSelectors(connectionIdentifier)
Make the registration of Selectable sub-classes using their static method register.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.registerStrategies"></a>

### Process.registerStrategies(connectionIdentifier)
Register strategies.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.addProxyFunctions"></a>

### Process.addProxyFunctions(connectionIdentifier)
Add functions to be used in Browser Context.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| connectionIdentifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="Process.connect"></a>

### Process.connect(browserWSEndpoint, customFunction, [...args]) ⇒ <code>Promise.&lt;any&gt;</code>
Execute a function in a specific browser endpoint.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise object that represents the result of the custom function.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| browserWSEndpoint | <code>string</code> |  | [Browser websocket endpoint](https://pptr.dev/#?product=Puppeteer&version=v10.4.0&show=api-browserwsendpoint). |
| customFunction | <code>function</code> |  | Custom function to be executed in the Puppeteer context. Like customFunction(browser, page, ...args) { ... }. |
| [...args] | <code>Array.&lt;any&gt;</code> | <code>[]</code> | Any parameter necessary for the custom function. |

<a name="Process.setBrowserController"></a>

### Process.setBrowserController(browserController)
Set a browser controller which Impressionist use to interact with the browser context.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| browserController | <code>object</code> | Browser controller. |

<a name="Process.loadPlugin"></a>

### Process.loadPlugin(plugin)
Load a plugin.

**Kind**: static method of [<code>Process</code>](#Process)  

| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>object</code> | A class to extends or modify the Impressionist behavior. |

## Classes

<dl>
<dt><a href="#Puppeteer">Puppeteer</a></dt>
<dd><p>Controls access to puppeteer methods and features.</p>
</dd>
<dt><a href="#PuppeteerController">PuppeteerController</a></dt>
<dd><p>Provides shorcut methods to Puppeteer configurations for initialize</p>
</dd>
<dt><a href="#MonitorManager">MonitorManager</a></dt>
<dd><p>Log on each of the subscribed monitoring tools.</p>
</dd>
<dt><a href="#Pino">Pino</a></dt>
<dd><p>Initialize Pino and expose its functionality for login.</p>
</dd>
<dt><a href="#Sentry">Sentry</a></dt>
<dd><p>Provides an interface for <a href="https://docs.sentry.io/platforms/node/">Sentry integration</a> with Puppeteerist.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Sentry.">Sentry.()</a></dt>
<dd><p>Add the necessary tags for Sentry.
Some come from environment variables and others are defined by the library locally.</p>
</dd>
</dl>

<a name="Puppeteer"></a>

## Puppeteer
Controls access to puppeteer methods and features.

**Kind**: global class  

* [Puppeteer](#Puppeteer)
    * [.launch([options])](#Puppeteer.launch) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.newPage(browser)](#Puppeteer.newPage) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.close(...controllers)](#Puppeteer.close)
    * [.goto(page, url)](#Puppeteer.goto)
    * [.evaluate(page, pageFunction, ...args)](#Puppeteer.evaluate) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.exposeFunction(page, name, puppeteerFunction)](#Puppeteer.exposeFunction)
    * [.addScriptTag(page, options)](#Puppeteer.addScriptTag)
    * [.addEventListener(page, method, event, handler)](#Puppeteer.addEventListener)

<a name="Puppeteer.launch"></a>

### Puppeteer.launch([options]) ⇒ <code>Promise.&lt;object&gt;</code>
Enables a connection to control the browser.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise which resolves to browser instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | Please read the documentation about the [Launch Options](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions). |

<a name="Puppeteer.newPage"></a>

### Puppeteer.newPage(browser) ⇒ <code>Promise.&lt;object&gt;</code>
Create a new [Page object](https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-class-page).

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise which resolves to a new Page object. The Page is created in a default browser context.  

| Param | Type | Description |
| --- | --- | --- |
| browser | <code>object</code> | Browser instance. |

<a name="Puppeteer.close"></a>

### Puppeteer.close(...controllers)
Close any instance of Page or Browser.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  

| Param | Type | Description |
| --- | --- | --- |
| ...controllers | <code>any</code> | Page or Browser instances. |

<a name="Puppeteer.goto"></a>

### Puppeteer.goto(page, url)
Navigate to a specific URL.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | Page instance. |
| url | <code>string</code> | URL. |

<a name="Puppeteer.evaluate"></a>

### Puppeteer.evaluate(page, pageFunction, ...args) ⇒ <code>Promise.&lt;any&gt;</code>
Execute a function in the browser context.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to a result of the function executed in the browser context.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | Page instance. |
| pageFunction | <code>function</code> | A function to be executed in the browser context. |
| ...args | <code>any</code> | Function arguments. |

<a name="Puppeteer.exposeFunction"></a>

### Puppeteer.exposeFunction(page, name, puppeteerFunction)
Expose a NodeJS function to be called from the browser context.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | Page Instance. |
| name | <code>string</code> | Function name to be called from the browser context. |
| puppeteerFunction | <code>function</code> | Function that is going to be executed in the NodeJS context. |

<a name="Puppeteer.addScriptTag"></a>

### Puppeteer.addScriptTag(page, options)
Add a new script tag in the HTML layout.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | Page instance. |
| options | <code>object</code> | Options for load content in the script tag. Please check the [documentation](https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-pageaddscripttagoptions). |

<a name="Puppeteer.addEventListener"></a>

### Puppeteer.addEventListener(page, method, event, handler)
Add an event listener to page.

**Kind**: static method of [<code>Puppeteer</code>](#Puppeteer)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | Page instance. |
| method | <code>string</code> | [EventEmitter](https://pptr.dev/#?product=Puppeteer&version=v12.0.1&show=api-eventemitteronevent-handler) method. |
| event | <code>string</code> \| <code>symbol</code> | The event to add the handler to. |
| handler | <code>function</code> | The event listener that will be added. |

<a name="PuppeteerController"></a>

## PuppeteerController
Provides shorcut methods to Puppeteer configurations for initialize

**Kind**: global class  

* [PuppeteerController](#PuppeteerController)
    * _instance_
        * [.browser](#PuppeteerController+browser)
        * [.pages](#PuppeteerController+pages)
    * _static_
        * [.initialize(url, [options])](#PuppeteerController.initialize) ⇒ <code>Promise.&lt;symbol&gt;</code>
        * [.close([identifier])](#PuppeteerController.close)
        * [.evaluate(identifier, pageFunction, ...args)](#PuppeteerController.evaluate) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.execute(identifier, puppeteerFunction)](#PuppeteerController.execute) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.inject(identifier, functionality)](#PuppeteerController.inject)
        * [.expose(identifier, functionality, [name])](#PuppeteerController.expose)
        * [.enableProxy(identifier, proxy)](#PuppeteerController.enableProxy)
        * [.enableDebugMode(identifier)](#PuppeteerController.enableDebugMode)

<a name="PuppeteerController+browser"></a>

### puppeteerController.browser
Browser instance.

**Kind**: instance property of [<code>PuppeteerController</code>](#PuppeteerController)  
<a name="PuppeteerController+pages"></a>

### puppeteerController.pages
Page instances.

**Kind**: instance property of [<code>PuppeteerController</code>](#PuppeteerController)  
<a name="PuppeteerController.initialize"></a>

### PuppeteerController.initialize(url, [options]) ⇒ <code>Promise.&lt;symbol&gt;</code>
Open a connection to an URL using a page instance.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  
**Returns**: <code>Promise.&lt;symbol&gt;</code> - Promise which resolves to a unique identifier represented by a Symbol.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL. |
| [options] | <code>object</code> | Please read the documentation about the [Launch Options](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions). |

<a name="PuppeteerController.close"></a>

### PuppeteerController.close([identifier])
Close connections.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  

| Param | Type | Description |
| --- | --- | --- |
| [identifier] | <code>symbol</code> | Unique identifier for a page connection. |

<a name="PuppeteerController.evaluate"></a>

### PuppeteerController.evaluate(identifier, pageFunction, ...args) ⇒ <code>Promise.&lt;any&gt;</code>
Evaluate a function in a specific page.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to the result of the pageFunction.  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>symbol</code> | Unique identifier for a page connection. |
| pageFunction | <code>function</code> | A function to be evaluated in the browser context. |
| ...args | <code>any</code> | Arguments for being passed to the pageFunction. |

<a name="PuppeteerController.execute"></a>

### PuppeteerController.execute(identifier, puppeteerFunction) ⇒ <code>Promise.&lt;any&gt;</code>
Execute a function which provides browser and page as parameters.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise which resolves to the result of the puppeteerFunction.  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>symbol</code> | Unique identifier for a page connection. |
| puppeteerFunction | <code>function</code> | Custom function. |

<a name="PuppeteerController.inject"></a>

### PuppeteerController.inject(identifier, functionality)
Inject a function in the HTML layout.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>symbol</code> | Unique identifier for a page connection. |
| functionality | <code>function</code> | Function to be load as a script tag in the page. |

<a name="PuppeteerController.expose"></a>

### PuppeteerController.expose(identifier, functionality, [name])
Expose a NodeJS function to be used from the browser context.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| identifier | <code>symbol</code> |  | Unique identifier for a page connection. |
| functionality | <code>function</code> |  | Function to be exposed. |
| [name] | <code>string</code> | <code>&quot;functionality.name&quot;</code> | Function name to be used in the browserContext. |

<a name="PuppeteerController.enableProxy"></a>

### PuppeteerController.enableProxy(identifier, proxy)
Setting proxies per page basis.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>symbol</code> | Unique identifier for a page connection. |
| proxy | <code>string</code> \| <code>object</code> | Proxy to use in the current page. Must begin with a protocol e.g. http://, https://, socks://. |

<a name="PuppeteerController.enableDebugMode"></a>

### PuppeteerController.enableDebugMode(identifier)
Display console.log messages in environments different than Production.

**Kind**: static method of [<code>PuppeteerController</code>](#PuppeteerController)  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>symbol</code> | Unique identifier for a page connection. |

<a name="MonitorManager"></a>

## MonitorManager
Log on each of the subscribed monitoring tools.

**Kind**: global class  

* [MonitorManager](#MonitorManager)
    * [.log(report)](#MonitorManager.log)
    * [.subscribe(logger)](#MonitorManager.subscribe)
    * [.unsubscribe(logger)](#MonitorManager.unsubscribe)
    * [.clear()](#MonitorManager.clear)

<a name="MonitorManager.log"></a>

### MonitorManager.log(report)
Register a report.

**Kind**: static method of [<code>MonitorManager</code>](#MonitorManager)  

| Param | Type | Description |
| --- | --- | --- |
| report | <code>object</code> | Information to be logged in. |

<a name="MonitorManager.subscribe"></a>

### MonitorManager.subscribe(logger)
Subscribe to a monitoring or logging tool.

**Kind**: static method of [<code>MonitorManager</code>](#MonitorManager)  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>object</code> | Monitoring or logging tool. |

<a name="MonitorManager.unsubscribe"></a>

### MonitorManager.unsubscribe(logger)
Unsubscribe to a monitoring or logging tool.

**Kind**: static method of [<code>MonitorManager</code>](#MonitorManager)  

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>object</code> | Monitoring or logging tool. |

<a name="MonitorManager.clear"></a>

### MonitorManager.clear()
Delete all logers. It can be used to discard the default loggers.

**Kind**: static method of [<code>MonitorManager</code>](#MonitorManager)  
<a name="Pino"></a>

## Pino
Initialize Pino and expose its functionality for login.

**Kind**: global class  
<a name="Pino.log"></a>

### Pino.log(report)
Log a report.

**Kind**: static method of [<code>Pino</code>](#Pino)  

| Param | Type | Description |
| --- | --- | --- |
| report | <code>object</code> | Information that will be used to compose the report. |

<a name="Sentry"></a>

## Sentry
Provides an interface for [Sentry integration](https://docs.sentry.io/platforms/node/) with Puppeteerist.

**Kind**: global class  

* [Sentry](#Sentry)
    * [.initialize(options, tags)](#Sentry.initialize)
    * [.log(report)](#Sentry.log)
    * [.sendException(error)](#Sentry.sendException) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Sentry.initialize"></a>

### Sentry.initialize(options, tags)
Specifies the basic options for Sentry initialization.

**Kind**: static method of [<code>Sentry</code>](#Sentry)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Please check [Sentry documentation](https://docs.sentry.io/platforms/node/configuration/options/). |
| tags | <code>object</code> | Set of tags. |

<a name="Sentry.log"></a>

### Sentry.log(report)
Log a report.

**Kind**: static method of [<code>Sentry</code>](#Sentry)  

| Param | Type | Description |
| --- | --- | --- |
| report | <code>object</code> | Information that will be used to compose the report. |

<a name="Sentry.sendException"></a>

### Sentry.sendException(error) ⇒ <code>Promise.&lt;void&gt;</code>
Send error generated to Sentry while Puppeteer execution.

**Kind**: static method of [<code>Sentry</code>](#Sentry)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise object that represents end of the Sentry actions.  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Object that represents the error generated during the execution of the scraper. |

<a name="Sentry."></a>

## Sentry.()
Add the necessary tags for Sentry.
Some come from environment variables and others are defined by the library locally.

**Kind**: global function  
## Classes

<dl>
<dt><a href="#Collector">Collector</a></dt>
<dd><p>Collect items from a Collection by being iterated through a context element.</p>
</dd>
<dt><a href="#Context">Context</a></dt>
<dd><p>It provides a data structure to control the context, which is an object with two properties.
The first is document, which refers to the document object present in the browser context.
If the context is not running in Browser context then document is set to null. 
The other property is element, which stores an element that will be used by some instance during
the execution of the collectable tree.</p>
</dd>
<dt><a href="#SelectorError">SelectorError</a></dt>
<dd><p>Custom error to be used by the QuerySelector class in case an element or series of elements
does not exist in the DOM.</p>
</dd>
<dt><a href="#CustomError">CustomError</a></dt>
<dd><p>Custom error to be used by the Collectable class to identify if the error was created
by the error or require methods of the same class.</p>
</dd>
<dt><a href="#CollectableError">CollectableError</a></dt>
<dd><p>Custom error to be used by the Collectable class to return any error caused in the execution
of the Collectable tree and that does not have a Collectable default method specified.</p>
</dd>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Log useful information and register errors.</p>
</dd>
<dt><a href="#StrategyManager">StrategyManager</a></dt>
<dd><p>Provides a common method to share across the different strategies managers.</p>
</dd>
<dt><a href="#TypeValidator">TypeValidator</a></dt>
<dd><p>Provides a static method that checks the data type of an incoming value.</p>
</dd>
<dt><a href="#LazyLoadHandler">LazyLoadHandler</a></dt>
<dd><p>Loads all DOM elements that are handled by a LazyLoad.</p>
</dd>
<dt><a href="#Pagination">Pagination</a></dt>
<dd><p>Handles the pagination of an HTML section.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Logger.">Logger.(elements)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Extract useful information from elements and give them a specific format inside a list.</p>
</dd>
<dt><a href="#clickAndWait">clickAndWait(elementSelector, waitFor)</a></dt>
<dd><p>Click an element in the DOM and then wait for another event like a timeout,
a selector being loading in the DOM or wait for the completion of an asyncronous function.</p>
</dd>
</dl>

<a name="Collector"></a>

## Collector
Collect items from a Collection by being iterated through a context element.

**Kind**: global class  

* [Collector](#Collector)
    * [new Collector(contextAccessor, collection)](#new_Collector_new)
    * [.iterationQuery](#Collector+iterationQuery)
    * [.call(context)](#Collector+call) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.iterate(queries)](#Collector+iterate) ⇒ [<code>Collector</code>](#Collector)

<a name="new_Collector_new"></a>

### new Collector(contextAccessor, collection)

| Param | Type | Description |
| --- | --- | --- |
| contextAccessor | <code>object</code> | Objects that returns an iterable  object as a result of its execution. |
| collection | <code>Collection</code> | A collection instance. |

<a name="Collector+iterationQuery"></a>

### collector.iterationQuery
Queries to append in iterate method.

**Kind**: instance property of [<code>Collector</code>](#Collector)  
<a name="Collector+call"></a>

### collector.call(context) ⇒ <code>Promise.&lt;Array&gt;</code>
Execute the collector.

**Kind**: instance method of [<code>Collector</code>](#Collector)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An object that represents a promise for the collected items.  

| Param | Type | Description |
| --- | --- | --- |
| context | [<code>Context</code>](#Context) | Object that represents the context or the element that is being passed on nested queries or instances executions. |

**Example**  
```
        await page.evaluate(async () => {
    
            const data = ( function () {

                const css = SelectorDirectory.get('css');

                return new Collector(
                    new Collection({
                        name: css('h1').property('innerText').single()
                    })
                );
                
            } )();
        
        const context = new Context();
        console.log(await data.call(context)); // [{ name: 'Plato Plugin' }]
    });
```
<a name="Collector+iterate"></a>

### collector.iterate(queries) ⇒ [<code>Collector</code>](#Collector)
Creates a new Collector that have a custom accessor and a collection.

**Kind**: instance method of [<code>Collector</code>](#Collector)  
**Returns**: [<code>Collector</code>](#Collector) - A Collector instance.  

| Param | Type | Description |
| --- | --- | --- |
| queries | <code>object</code> | A set of queries or callable objects. |

**Example**  
```
        await page.evaluate(async () => {

            const data = ( function () {

                const css = SelectorDirectory.get('css');
    
                return new ElementCollectorFactory('{#reviews > ul > li}*').iterate({
                    author: '#review-author',
                    title: '#review-title',
                    rating: '#review-rating',
                    body: '#review-body',
                    date: '#review-date'
                });
        
            } )();

            const context = new Context();
            console.log(await data.call(context)); // [{ author: 'John Doe', title: 'It is okay', rating: '4', body: 'Nice product. I would recommend the version X.', date: '01-12-2021' }, { author: 'Richard Roe', title: 'Amazing!', rating: '5', body: 'Really good product.', date: '10-12-2021' }]
        });
```
<a name="Context"></a>

## Context
It provides a data structure to control the context, which is an object with two properties.
The first is document, which refers to the document object present in the browser context.
If the context is not running in Browser context then document is set to null. 
The other property is element, which stores an element that will be used by some instance during
the execution of the collectable tree.

**Kind**: global class  
**Summary**: Create an object to give context to instance executions.  

* [Context](#Context)
    * [.clone()](#Context+clone) ⇒ [<code>Context</code>](#Context)
    * [.update(element)](#Context+update) ⇒ [<code>Context</code>](#Context)
    * [.getElement()](#Context+getElement) ⇒ <code>string</code> \| <code>Array</code> \| <code>Object</code>

<a name="Context+clone"></a>

### context.clone() ⇒ [<code>Context</code>](#Context)
Create a new instance of the same class and assign the values of the object from which it was created.
The reason for this method is that the values of the element property can be updated or modified without
affecting the original context object, since the new instance is a completely independent object
from the original one. Something that does not happen with a simple copy of objects.

**Kind**: instance method of [<code>Context</code>](#Context)  
**Summary**: Clones a context instance.  
**Returns**: [<code>Context</code>](#Context) - Object that represents the context or the element that is being passed on
nested instances executions.  
**Example** *(Clone an existing Context instance.)*  
```
const context = new Context();
const newContext = context.clone();
```
<a name="Context+update"></a>

### context.update(element) ⇒ [<code>Context</code>](#Context)
Update the context object by adding a new value for the element property.
First, clone the existing Context object using the clone () method and then update the value of element.

**Kind**: instance method of [<code>Context</code>](#Context)  
**Summary**: Update the Context object.  
**Returns**: [<code>Context</code>](#Context) - Object that represents the context or the element that is being passed on
nested instances executions.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>string</code> \| <code>Array</code> \| <code>object</code> | Stores an element that will be used by some instance during the execution of the collectable tree. |

**Example** *(Update an existing Context instance.)*  
```
const context = new Context();
const newContext = context.update('new element');
```
<a name="Context+getElement"></a>

### context.getElement() ⇒ <code>string</code> \| <code>Array</code> \| <code>Object</code>
Gets the value of the element property.
If element is equal to null then it will return the value of the document property.

**Kind**: instance method of [<code>Context</code>](#Context)  
**Returns**: <code>string</code> \| <code>Array</code> \| <code>Object</code> - an element that will be used by some instance during
the execution of the collectable tree.  
**Example** *(Getting the node to be used for nested executions)*  
```
const context = new Context();
...
const element = context.getElement();
```
<a name="SelectorError"></a>

## SelectorError
Custom error to be used by the QuerySelector class in case an element or series of elements
does not exist in the DOM.

**Kind**: global class  
<a name="new_SelectorError_new"></a>

### new SelectorError(selector)

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | [ CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). |

<a name="CustomError"></a>

## CustomError
Custom error to be used by the Collectable class to identify if the error was created
by the error or require methods of the same class.

**Kind**: global class  
<a name="new_CustomError_new"></a>

### new CustomError(message)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Custom message. |

<a name="CollectableError"></a>

## CollectableError
Custom error to be used by the Collectable class to return any error caused in the execution
of the Collectable tree and that does not have a Collectable default method specified.

**Kind**: global class  
<a name="new_CollectableError_new"></a>

### new CollectableError(message, history)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Custom message |
| history | <code>Array.&lt;string&gt;</code> | An array of messages of previous executions in the collectable chain. |

<a name="Logger"></a>

## Logger
Log useful information and register errors.

**Kind**: global class  

* [Logger](#Logger)
    * [.error(origin, message)](#Logger.error)
    * [.warn(origin, elements, message)](#Logger.warn)
    * [.info(origin, elements, message)](#Logger.info)
    * [.debug(origin, elements, message)](#Logger.debug)

<a name="Logger.error"></a>

### Logger.error(origin, message)
Error level.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | Name of the class, function of where the log comes from. |
| message | <code>string</code> | Message. |

<a name="Logger.warn"></a>

### Logger.warn(origin, elements, message)
Warn level.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | Name of the class, function of where the log comes from. |
| elements | <code>object</code> | Any element to record its value, data type and instance. |
| message | <code>string</code> | Message |

<a name="Logger.info"></a>

### Logger.info(origin, elements, message)
Info level.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | Name of the class, function of where the log comes from. |
| elements | <code>object</code> | Any element to record its value, data type and instance. |
| message | <code>string</code> | Message |

<a name="Logger.debug"></a>

### Logger.debug(origin, elements, message)
Debug level.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | Name of the class, function of where the log comes from. |
| elements | <code>object</code> | Any element to record its value, data type and instance. |
| message | <code>string</code> | Message |

<a name="StrategyManager"></a>

## StrategyManager
Provides a common method to share across the different strategies managers.

**Kind**: global class  
<a name="StrategyManager.lookUp"></a>

### StrategyManager.lookUp(element, strategies) ⇒ <code>Promise.&lt;object&gt;</code>
Search or look up the best strategy.

**Kind**: static method of [<code>StrategyManager</code>](#StrategyManager)  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object that represents a promise for a specific strategy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Any</code> | A criterion to be evaluated. |
| strategies | <code>Set.&lt;object&gt;</code> | Available strategies. |

<a name="TypeValidator"></a>

## TypeValidator
Provides a static method that checks the data type of an incoming value.

**Kind**: global class  

* [TypeValidator](#TypeValidator)
    * [.check(value, [type])](#TypeValidator.check) ⇒ <code>Error</code> \| <code>void</code>
    * [.deepCheck(value, type)](#TypeValidator.deepCheck)

<a name="TypeValidator.check"></a>

### TypeValidator.check(value, [type]) ⇒ <code>Error</code> \| <code>void</code>
Check the entry value if its data type of instance is the same than the type argument.

**Kind**: static method of [<code>TypeValidator</code>](#TypeValidator)  
**Returns**: <code>Error</code> \| <code>void</code> - - Throws an error if the type does not match the value's data type.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | Any value for which want to check the data type. |
| [type] | <code>string</code> \| <code>object</code> | <code>&quot;string&quot;</code> | Data Type: string, number, array, object, boolean, function, CollectionCollector, Collector, NodeCollector. |

**Example** *(Checking if values is String)*  
```
TypeValidator.check('name');
```
**Example** *(Checking if value is Number)*  
```
TypeValidator.check(5, 'number');
```
<a name="TypeValidator.deepCheck"></a>

### TypeValidator.deepCheck(value, type)
Check recursively if he entry value if its data type of instance is the same than the type argument.

**Kind**: static method of [<code>TypeValidator</code>](#TypeValidator)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | Any value for which want to check the data type. |
| type | <code>object</code> \| <code>string</code> | Data Type: string, number, array, object, boolean, function, CollectionCollector, Collector, NodeCollector. //TODO: Examples. |

<a name="LazyLoadHandler"></a>

## LazyLoadHandler
Loads all DOM elements that are handled by a LazyLoad.

**Kind**: global class  
<a name="LazyLoadHandler.execute"></a>

### LazyLoadHandler.execute(buttonSelector, [stopLoad])
Executes the loading of all the elements by providing a clickable element selector,
for example, a button.

**Kind**: static method of [<code>LazyLoadHandler</code>](#LazyLoadHandler)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buttonSelector | <code>string</code> |  | CSS Selector that represents a button. |
| [stopLoad] | <code>function</code> | <code>(button) &#x3D;&gt; button &amp;&amp; !(button?.disabled)</code> | A function that returns a boolean to control when the event needs to be stopped. By default function is ```(button) => button && !(button?.disabled)```, where the LazyLoadHandler needs to stop when the button is disabled. |

<a name="Pagination"></a>

## Pagination
Handles the pagination of an HTML section.

**Kind**: global class  
<a name="Pagination.execute"></a>

### Pagination.execute(buttonSelector, waitFor, [stopLoad])
Create a generator object with the new rendered document.

**Kind**: static method of [<code>Pagination</code>](#Pagination)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buttonSelector | <code>string</code> |  | CSS selector of the button that triggers the action to go to the next pagination. |
| waitFor | <code>object</code> |  | Selector of an element and timeout in milliseconds to wait for. |
| waitFor.timeout | <code>number</code> |  | The number of milliseconds to wait for. |
| waitFor.selector | <code>string</code> |  | A selector of an element to wait for. |
| waitFor.customFunction | <code>function</code> |  | A function that performs others waiting processes. |
| [stopLoad] | <code>function</code> | <code>(button) &#x3D;&gt; button</code> | A function that returns a boolean to control when the event needs to be stopped. By default function is ```(button) => button```, where the Pagination functionality needs to stop when the button is not available. |

<a name="Logger."></a>

## Logger.(elements) ⇒ <code>Array.&lt;object&gt;</code>
Extract useful information from elements and give them a specific format inside a list.

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - - List of objects that represent an element.  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>object</code> | Any element to record its value, data type and instance. |

<a name="clickAndWait"></a>

## clickAndWait(elementSelector, waitFor)
Click an element in the DOM and then wait for another event like a timeout,
a selector being loading in the DOM or wait for the completion of an asyncronous function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elementSelector | <code>string</code> | CSS Selector to click on. |
| waitFor | <code>object</code> | Options to wait for. |
| waitFor.timeout | <code>number</code> | Timeout. |
| waitFor.selector | <code>string</code> | A CSS Selector. |
| waitFor.customFunction | <code>function</code> | A function that performs others waiting processes. |

## Classes

<dl>
<dt><a href="#Collection">Collection</a></dt>
<dd><p>Execute a set of queries.</p>
</dd>
<dt><a href="#IterableAccessor">IterableAccessor</a></dt>
<dd><p>Iterates over each item in context created by a collection,
returning it to be collected upon.</p>
</dd>
<dt><a href="#ProxyAccessor">ProxyAccessor</a></dt>
<dd><p>Default ContextAcessor, used when there is not contextProcessor in Collector.</p>
</dd>
<dt><a href="#CollectionCollectorFactory">CollectionCollectorFactory</a></dt>
<dd><p>Create a Collector instance for collecting a collection
for each iterable item in the context.</p>
</dd>
<dt><a href="#ElementCollectorFactory">ElementCollectorFactory</a></dt>
<dd><p>Creates a Collector instance that returns a NodeList of DOM elements.</p>
</dd>
<dt><a href="#OptionCollectorFactory">OptionCollectorFactory</a></dt>
<dd><p>Creates a Collector instance that returns a list of combinations
generated by Options intances.</p>
</dd>
<dt><a href="#Option">Option</a></dt>
<dd><p>Creates an iterable object from a series of options and at the same time, the iterable object has
a function that is executed in each iterative cycle (next method call) to select a specific option value.</p>
</dd>
<dt><a href="#OptionStrategyManager">OptionStrategyManager</a></dt>
<dd><p>Manage the OptionStrategies.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#OptionCollectorFactory.">OptionCollectorFactory.(options)</a> ⇒ <code>object</code></dt>
<dd><p>Execute normalization actions for each of the options.
For example, adding default values in queries.</p>
</dd>
<dt><a href="#OptionCollectorFactory.">OptionCollectorFactory.(collector, options)</a></dt>
<dd><p>Add queries to the Collector instance to extract
each of the options in the Collector run.</p>
</dd>
</dl>

<a name="Collection"></a>

## Collection
Execute a set of queries.

**Kind**: global class  

* [Collection](#Collection)
    * [new Collection(queries)](#new_Collection_new)
    * [.call(context)](#Collection+call) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.postProcessor(customProcessor)](#Collection+postProcessor) ⇒ [<code>Collection</code>](#Collection)

<a name="new_Collection_new"></a>

### new Collection(queries)

| Param | Type | Description |
| --- | --- | --- |
| queries | <code>Object</code> | Set of queries. |
| queries.* | <code>string</code> \| <code>function</code> \| <code>Query</code> | QUery. |

<a name="Collection+call"></a>

### collection.call(context) ⇒ <code>Promise.&lt;object&gt;</code>
Execute a set of queries.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object that represents a promise for a object
with the results of the queries.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

**Example**  
```
        await page.evaluate( async () => {
            const data = new Collection({
                name: css('h1').property('innerText').single()
            });
                
            const context = new Context();
            console.log(await data.call(context)); // { name: 'Plato Plugin' }
        });
```
<a name="Collection+postProcessor"></a>

### collection.postProcessor(customProcessor) ⇒ [<code>Collection</code>](#Collection)
Add a new postProcessor to the list.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: [<code>Collection</code>](#Collection) - Returns the current Collection instance.  

| Param | Type | Description |
| --- | --- | --- |
| customProcessor | <code>function</code> | A custom functionality that receives the query result and perform a process to return a transformed data. |

<a name="IterableAccessor"></a>

## IterableAccessor
Iterates over each item in context created by a collection,
returning it to be collected upon.

**Kind**: global class  

* [IterableAccessor](#IterableAccessor)
    * [new IterableAccessor(collection)](#new_IterableAccessor_new)
    * [.call(context)](#IterableAccessor+call) ⇒ <code>Promise.&lt;Generator&gt;</code>

<a name="new_IterableAccessor_new"></a>

### new IterableAccessor(collection)

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>Collection</code>](#Collection) | Collection instance that provides the new context. |

<a name="IterableAccessor+call"></a>

### iterableAccessor.call(context) ⇒ <code>Promise.&lt;Generator&gt;</code>
Create a generator to pass the new context.

**Kind**: instance method of [<code>IterableAccessor</code>](#IterableAccessor)  
**Returns**: <code>Promise.&lt;Generator&gt;</code> - An object that represents a promise
for a generator of context objects.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Actual context object. |

**Example** *(Receives a Collection and returns an iterable of Context objects)*  
```
        await page.evaluate( async () => {
                        
            const data = new IterableAccessor(
                new Collection({
                    reviews: () => Array.from(document.querySelectorAll('#reviews > ul > li'))
                }).postProcessor(CollectionElementProcessor)
            );

            const context = new Context();

            for await(let newContext of data.call(context)) {
                console.log(newContext); // Returns the li elements inside of a Context object.
            }
        });
```
<a name="ProxyAccessor"></a>

## ProxyAccessor
Default ContextAcessor, used when there is not contextProcessor in Collector.

**Kind**: global class  
<a name="ProxyAccessor+call"></a>

### proxyAccessor.call(context) ⇒ <code>Generator.&lt;Context&gt;</code>
Returns a generator with the incoming context.

**Kind**: instance method of [<code>ProxyAccessor</code>](#ProxyAccessor)  
**Returns**: <code>Generator.&lt;Context&gt;</code> - Returns the incoming context as part of a generator.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

**Example**  
```
        await page.evaluate( async () => {
                        
            const context = new Context().update('Custom Context');

            const data = new ProxyAccessor().call(context);

            let contextContainer = [];

            for await(let newContext of data) {
                contextContainer.push(newContext);
            }

            console.log(contextContainer[0].getElement()); // 'Custom Context'
            
        });
```
<a name="CollectionCollectorFactory"></a>

## CollectionCollectorFactory
Create a Collector instance for collecting a collection
for each iterable item in the context.

**Kind**: global class  
<a name="new_CollectionCollectorFactory_new"></a>

### new CollectionCollectorFactory(collector, queries)
**Returns**: <code>Collector</code> - A Collector instance.  

| Param | Type | Description |
| --- | --- | --- |
| collector | <code>Collector</code> | Collector instance. |
| queries | <code>object</code> | Set of queries. |

<a name="ElementCollectorFactory"></a>

## ElementCollectorFactory
Creates a Collector instance that returns a NodeList of DOM elements.

**Kind**: global class  
<a name="new_ElementCollectorFactory_new"></a>

### new ElementCollectorFactory(query)
**Returns**: <code>Collector</code> - A new instance of Collector.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>function</code> \| <code>Object</code> \| <code>Query</code> \| <code>string</code> | A callabel object. |

<a name="OptionCollectorFactory"></a>

## OptionCollectorFactory
Creates a Collector instance that returns a list of combinations
generated by Options intances.

**Kind**: global class  
<a name="new_OptionCollectorFactory_new"></a>

### new OptionCollectorFactory(options)
**Returns**: <code>Collector</code> - A Collector instance.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | A series of options. |

<a name="Option"></a>

## Option
Creates an iterable object from a series of options and at the same time, the iterable object has
a function that is executed in each iterative cycle (next method call) to select a specific option value.

**Kind**: global class  
**Summary**: Creates an iterable object from options.  

* [Option](#Option)
    * [new Option(identifier, element, [strategy])](#new_Option_new)
    * [.call()](#Option+call)

<a name="new_Option_new"></a>

### new Option(identifier, element, [strategy])

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | This tag identifies which option certain values ​​are linked to. For example, the CE, EE, and ECE values ​​are tied to an Edition option. |
| element | <code>Element</code> | DOM element. |
| [strategy] | <code>object</code> | Object that has functionalities to get options and set options. If no strategy is specified, then the Strategy Manager will assign one automatically. |
| [strategy.getOptions] | <code>function</code> | A function that creates an array of objects, in which each one of them contains two properties: value - which refers to the value property of an element that will be used to make the selection of the option. And, the second property is the dynamic value of the label parameter, which will contain the text of the value itself. |
| [strategy.setOption] | <code>function</code> | Function that performs a selection of an option based on a value that is specified as a parameter. |

**Example** *(Create an Option instance of a dropwdown (select element).)*  
```
const edition = new Option('edition', document.querySelector('#select_1573'));
const support = new Option('support', document.querySelector('#select_1583'));
const installation = new Option('installation', document.querySelector('#select_1593'));
```
**Example** *(Create an Option instace of a group of buttons (div elements).)*  
```
// First, we need to create a function to get the options available based on the checkboxes
function getEditionAndSupportOptions(label, element) {

     return new Promise((resolve, reject) => {

             const options = element.querySelectorAll('div'); // Get all the div elements
             let result = [];
             
             for(let option of options) {
                 result.push({
                     value: option,
                     [label]: option.innerText
                 });
             }

             resolve(result);

             });
}

// We need to create the function to make the seleccion.

async function setOption(newElement) {
     newElement.click();
     return true;
}

// Now that we have out functions we can create our Option instance.

const edition = new Option('edition', document.querySelector('div.swatch-attribute.edition > div'), { getOptions: getEditionAndSupportOptions, setOptions });
 
```
<a name="Option+call"></a>

### option.call()
Creates an iterable object that contains the values of an HTML element and its respective selection function.
The values collection and function execution is controlled by the
[ JavaScript Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

**Kind**: instance method of [<code>Option</code>](#Option)  
**Example** *(Use the next generator method to get the values)*  
```
const edition = new Option('edition', document.querySelector('#select_1573'));

// Note: The use of next below refers to the method on Option instance.
const editionOptions = edition.next();

// Note: The use of next below refers to the iteration protocol method.
console.log(editionOptions.next()); // {value: { value: '22334', edition: 'CE' }, done: false };
console.log(editionOptions.next()); // {value: { value: '22335', edition: 'EE' }, done: false };
console.log(editionOptions.next()); // {value: { value: '22336', edition: 'ECE' }, done: false };
console.log(editionOptions.next()); // {value: undefined, done: true };
```
<a name="OptionStrategyManager"></a>

## OptionStrategyManager
Manage the OptionStrategies.

**Kind**: global class  

* [OptionStrategyManager](#OptionStrategyManager)
    * [.add(strategy)](#OptionStrategyManager.add)
    * [.lookUp(element)](#OptionStrategyManager.lookUp) ⇒ <code>Promise.&lt;OptionStrategy&gt;</code>

<a name="OptionStrategyManager.add"></a>

### OptionStrategyManager.add(strategy)
Add or register a OptionStrategy sub-class.

**Kind**: static method of [<code>OptionStrategyManager</code>](#OptionStrategyManager)  

| Param | Type | Description |
| --- | --- | --- |
| strategy | <code>OptionStrategy</code> | A specific implementation/sub-class of OptionStrategy. |

**Example**  
```
OptionStrategyManager.add(SelectStrategy);
```
<a name="OptionStrategyManager.lookUp"></a>

### OptionStrategyManager.lookUp(element) ⇒ <code>Promise.&lt;OptionStrategy&gt;</code>
Search or look up the best strategy.

**Kind**: static method of [<code>OptionStrategyManager</code>](#OptionStrategyManager)  
**Returns**: <code>Promise.&lt;OptionStrategy&gt;</code> - Object that represents a promise to return a sub-class of OptionStrategy.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> \| <code>Array.&lt;Element&gt;</code> | DOM element that represents or has options. |

**Example** *(SelectStrategy matched)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            const strategy = await OptionStrategyManager.lookUp(selectElement);

            console.log(strategy === SelectStrategy); // true
        });
```
<a name="OptionCollectorFactory."></a>

## OptionCollectorFactory.(options) ⇒ <code>object</code>
Execute normalization actions for each of the options.
For example, adding default values in queries.

**Kind**: global function  
**Returns**: <code>object</code> - The normalized options.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Set of options. |

<a name="OptionCollectorFactory."></a>

## OptionCollectorFactory.(collector, options)
Add queries to the Collector instance to extract
each of the options in the Collector run.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| collector | <code>Collector</code> | Collector instance. |
| options | <code>object</code> | Set of options. |

## Classes

<dl>
<dt><a href="#CollectionElementProcessor">CollectionElementProcessor</a></dt>
<dd><p>Creates a generator from a list of elements.</p>
</dd>
<dt><a href="#CollectionOptionProcessor">CollectionOptionProcessor</a></dt>
<dd><p>Creates a generator from a list of Option instances.</p>
</dd>
<dt><a href="#GroupStrategy">GroupStrategy</a></dt>
<dd><p>Knows how to get and set values from a group of options.</p>
</dd>
<dt><a href="#MissingStrategy">MissingStrategy</a></dt>
<dd><p>Default strategy.</p>
</dd>
<dt><a href="#SelectStrategy">SelectStrategy</a></dt>
<dd><p>Knows how to get and set values from SELECT DOM elements.</p>
</dd>
<dt><a href="#ToogleStrategy">ToogleStrategy</a></dt>
<dd><p>Knows how to get and set values from an element with two states: TRUE/FALSE.</p>
</dd>
<dt><a href="#SelectorInterpreter">SelectorInterpreter</a></dt>
<dd><p>Creates a query chain from a custom selector.</p>
</dd>
<dt><a href="#InterpreterStrategyManager">InterpreterStrategyManager</a></dt>
<dd><p>Manage which interpretation strategy will process the custom selector.</p>
</dd>
<dt><a href="#All">All</a></dt>
<dd><p>Contains the specific logic to process nested structures. In case no parameter is passed
to its constructor then it will return the previous result in the execution of the chain.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#CollectorSelector">CollectorSelector</a></dt>
<dd><p>Execute a Collector instance.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Css">Css</a></dt>
<dd><p>Contains specific logic to extract elements from the DOM using a CSS selector.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Default">Default</a></dt>
<dd><p>Returns a default value if there the expected result is not valid.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#SelectorDirectory">SelectorDirectory</a></dt>
<dd><p>Provide a directory to store proxy function that will be used to instantiate the Implementation sub-classes.
The directory is made up of the name of each proxy function and its sub-class constructor equivalent.</p>
</dd>
<dt><a href="#Elements">Elements</a></dt>
<dd><p>Creates a collector that will return a generator of a list of elements.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Init">Init</a></dt>
<dd><p>Perform actions during initialization.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Iterate">Iterate</a></dt>
<dd><p>Iterate a Collector instance against a set of queries.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Merge">Merge</a></dt>
<dd><p>Contains the specific Selector that allows concatenating other query Selectors.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Options">Options</a></dt>
<dd><p>Creates a collector that will return a generator of a list of option values.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Post">Post</a></dt>
<dd><p>Perform actions after data extraction.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Pre">Pre</a></dt>
<dd><p>Perform actions before data extraction.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Property">Property</a></dt>
<dd><p>Contains the specific Selector to obtain properties of DOM elements.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Require">Require</a></dt>
<dd><p>Returns an error if the result is not a valid value.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Select">Select</a></dt>
<dd><p>Interprets Select Strings.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Single">Single</a></dt>
<dd><p>Contains the specific Selector to check if a single element is expected
as it turns out, otherwise throw an error.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Xpath">Xpath</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Contains specific logic to extract elements from the DOM using a xpath selector.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#CollectionElementProcessor.">CollectionElementProcessor.(element)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check the object is a generator.</p>
</dd>
<dt><a href="#CollectionElementProcessor.">CollectionElementProcessor.(elements)</a></dt>
<dd><p>Create a generator from a list of elements.</p>
</dd>
<dt><a href="#CollectionOptionProcessor.">CollectionOptionProcessor.(options)</a> ⇒ <code>Promise.&lt;Generator&gt;</code></dt>
<dd><p>It takes Option instances and calculates all possible values ​​of the
combinations of those options.</p>
</dd>
</dl>

<a name="CollectionElementProcessor"></a>

## CollectionElementProcessor
Creates a generator from a list of elements.

**Kind**: global class  
<a name="CollectionElementProcessor.call"></a>

### CollectionElementProcessor.call(elementCollection) ⇒ <code>Generator.&lt;(Element\|any)&gt;</code>
Execute the processor.

**Kind**: static method of [<code>CollectionElementProcessor</code>](#CollectionElementProcessor)  
**Returns**: <code>Generator.&lt;(Element\|any)&gt;</code> - A generator with DOM elements.  

| Param | Type | Description |
| --- | --- | --- |
| elementCollection | <code>object</code> | A serie of DOM elements or generator. |

**Example** *(Receives a collection with a list of DOM elements an returns an array with elements)*  
```
const result = await page.evaluate(() => {
     const elements = { reviews: Array.from(document.querySelectorAll('#reviews > ul > li')) };
     const data = CollectionElementProcessor.call(elements);
     console.log(data); // [li, li]
});
```
<a name="CollectionOptionProcessor"></a>

## CollectionOptionProcessor
Creates a generator from a list of Option instances.

**Kind**: global class  
<a name="CollectionOptionProcessor.call"></a>

### CollectionOptionProcessor.call(elementCollection) ⇒ <code>Promise.&lt;Generator&gt;</code>
Returns all possible values ​​of the options that were passed to Collection.

**Kind**: static method of [<code>CollectionOptionProcessor</code>](#CollectionOptionProcessor)  
**Returns**: <code>Promise.&lt;Generator&gt;</code> - An object that represents a promise object
for a generator containing all the possible values processed of each option.  

| Param | Type | Description |
| --- | --- | --- |
| elementCollection | <code>object</code> | A serie of elements or Options instances. |

**Example** *(Processing a series of options)*  
```
        const result = await page.evaluate(async () => {
                
            const options = {
                edition: document.querySelector('select#option-1'),
                support: document.querySelector('select#option-2')
            };

            const values = await CollectionOptionProcessor.call(options);

            let result = [];

            for await(let value of values) {
                console.log(value); // First Iteration: [{ value: '40', support: 'val-40' }, { value: '10', edition: 'val-10' }]
            }

        });
```
<a name="GroupStrategy"></a>

## GroupStrategy
Knows how to get and set values from a group of options.

**Kind**: global class  

* [GroupStrategy](#GroupStrategy)
    * [.getOptions(identifier, element)](#GroupStrategy.getOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.setOption(element, value)](#GroupStrategy.setOption) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [.match(element)](#GroupStrategy.match) ⇒ <code>Promise.&lt;Boolean&gt;</code>

<a name="GroupStrategy.getOptions"></a>

### GroupStrategy.getOptions(identifier, element) ⇒ <code>Promise.&lt;Array&gt;</code>
Extract a value that will be used to identify each option.

**Kind**: static method of [<code>GroupStrategy</code>](#GroupStrategy)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Object that represents a promise for a list of objects.  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | Identifies the option values ​​referenced by the element in the DOM. |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Get options from a select element)*  
```
        await page.evaluate(async () => {
            const element = document.querySelectorAll('#div-1 > div');
            const result = await GroupStrategy.getOptions('edition', element);
            console.log(result); // [ { value: div, edition: 'div-val-10'}, { value: div, edition: 'div-val-20'}, { value: div, edition: 'div-val-30' }]
        });
```
<a name="GroupStrategy.setOption"></a>

### GroupStrategy.setOption(element, value) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Select a specific option.

**Kind**: static method of [<code>GroupStrategy</code>](#GroupStrategy)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Object that represents a promise for the completion of
a select action.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |
| value | <code>string</code> \| <code>object</code> | Value that will be used to select a specific option. |

**Example** *(Set second option to a div element)*  
```
        await page.evaluate(async () => {
            const parentElement = document.querySelector('#div-1');
            const element = document.querySelector('#div-1 > div:nth-child(2)');

            await GroupStrategy.setOption(parentElement, element);

            console.log(parentElement.getAttribute('value')); // 20
        });
```
<a name="GroupStrategy.match"></a>

### GroupStrategy.match(element) ⇒ <code>Promise.&lt;Boolean&gt;</code>
Check if the particular strategy is suitable for a certain element of the DOM.

**Kind**: static method of [<code>GroupStrategy</code>](#GroupStrategy)  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - Object that represents a promise for a TRUE or FALSE value.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Match elements)*  
```
        await page.evaluate(async () => {
            const element = document.querySelectorAll('#div-1 > div');
            console.log(await GroupStrategy.match(element)); // true
        });
```
<a name="MissingStrategy"></a>

## MissingStrategy
Default strategy.

**Kind**: global class  
<a name="SelectStrategy"></a>

## SelectStrategy
Knows how to get and set values from SELECT DOM elements.

**Kind**: global class  

* [SelectStrategy](#SelectStrategy)
    * [.getOptions(identifier, element)](#SelectStrategy.getOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.setOption(element, value)](#SelectStrategy.setOption) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.match(element)](#SelectStrategy.match) ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>

<a name="SelectStrategy.getOptions"></a>

### SelectStrategy.getOptions(identifier, element) ⇒ <code>Promise.&lt;Array&gt;</code>
Extract a value that will be used to identify each option.

**Kind**: static method of [<code>SelectStrategy</code>](#SelectStrategy)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Object that represents a promise for a list of objects.  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | Identifies the option values ​​referenced by the element in the DOM. |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Get options from a select element)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            console.log(await SelectStrategy.getOptions('edition', selectElement)); // [{ value: '10', edition: 'val-10' }, { value: '20', edition: 'val-20' }, { value: '30', edition: 'val-30' }]
        });
```
<a name="SelectStrategy.setOption"></a>

### SelectStrategy.setOption(element, value) ⇒ <code>Promise.&lt;void&gt;</code>
Select a specific option.

**Kind**: static method of [<code>SelectStrategy</code>](#SelectStrategy)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Object that represents a promise for the completion of a select action.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |
| value | <code>string</code> \| <code>object</code> | Value that will be used to select a specific option. |

**Example** *(Set second option to a select element)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            await SelectStrategy.setOption(selectElement, '20');
            console.log(selectElement.value); // '20'
        });
```
<a name="SelectStrategy.match"></a>

### SelectStrategy.match(element) ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>
Check if the particular strategy is suitable for a certain element of the DOM.

**Kind**: static method of [<code>SelectStrategy</code>](#SelectStrategy)  
**Returns**: <code>Promise.&lt;(Boolean\|Error)&gt;</code> - Object that represents a promise for a TRUE or FALSE value.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Match a SELECT element)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            console.log(await SelectStrategy.match(selectElement)); // true
        });
```
<a name="ToogleStrategy"></a>

## ToogleStrategy
Knows how to get and set values from an element with two states: TRUE/FALSE.

**Kind**: global class  

* [ToogleStrategy](#ToogleStrategy)
    * [.getOptions(identifier, element)](#ToogleStrategy.getOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.setOption(element, value)](#ToogleStrategy.setOption) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.match(element)](#ToogleStrategy.match) ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>

<a name="ToogleStrategy.getOptions"></a>

### ToogleStrategy.getOptions(identifier, element) ⇒ <code>Promise.&lt;Array&gt;</code>
Extracts a value that will be used to identify each option.

**Kind**: static method of [<code>ToogleStrategy</code>](#ToogleStrategy)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Object that represents a promise for a list of objects.  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | Identifies the option values ​​referenced by the element in the DOM. |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Get options from a checkbox element)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#toogle');
            console.log(await ToogleStrategy.getOptions('installation', selectElement));
            // [{ value: { click: {}, selection: true }, installation: true }, { value: { click: {}, selection: false }, installation: false }]
        });
```
<a name="ToogleStrategy.setOption"></a>

### ToogleStrategy.setOption(element, value) ⇒ <code>Promise.&lt;void&gt;</code>
Select a specific option.

**Kind**: static method of [<code>ToogleStrategy</code>](#ToogleStrategy)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Object that represents a promise for the completion of a select action.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |
| value | <code>string</code> \| <code>object</code> | Value that will be used to select a specific option. |

**Example** *(Select an input element)*  
```
        await page.evaluate(async () => {
            const inputElement = document.querySelector('#toogle > input');
            await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: true });
            console.log(inputElement.checked); // true
```
<a name="ToogleStrategy.match"></a>

### ToogleStrategy.match(element) ⇒ <code>Promise.&lt;(Boolean\|Error)&gt;</code>
Check if the particular strategy is suitable for a certain element of the DOM.

**Kind**: static method of [<code>ToogleStrategy</code>](#ToogleStrategy)  
**Returns**: <code>Promise.&lt;(Boolean\|Error)&gt;</code> - Object that represents a promise for a TRUE or FALSE value.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | DOM element that contains one or more values. |

**Example** *(Match an element)*  
```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#toogle');
            console.log(await ToogleStrategy.match(selectElement)); // true
        });
```
<a name="SelectorInterpreter"></a>

## SelectorInterpreter
Creates a query chain from a custom selector.

**Kind**: global class  
<a name="new_SelectorInterpreter_new"></a>

### new SelectorInterpreter(selector)
**Returns**: <code>Query</code> - A query instance.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | A custom selector. |

**Example**  
```
    SelectorDirectory.register(SelectorInterpreter);
    await page.evaluate(async () => { 
    
        const data = ( function () {

            const select = SelectorDirectory.get('selectorinterpreter');

            return new Collection({
                name: select('h1')
            });
            
        } )();
        
        const context = new Context();
        console.log(await data.call(context)); // Plato Plugin
    });
```
<a name="InterpreterStrategyManager"></a>

## InterpreterStrategyManager
Manage which interpretation strategy will process the custom selector.

**Kind**: global class  

* [InterpreterStrategyManager](#InterpreterStrategyManager)
    * [.add(strategy)](#InterpreterStrategyManager.add)
    * [.lookUp(selector)](#InterpreterStrategyManager.lookUp) ⇒ <code>object</code>

<a name="InterpreterStrategyManager.add"></a>

### InterpreterStrategyManager.add(strategy)
Add a new strategy.

**Kind**: static method of [<code>InterpreterStrategyManager</code>](#InterpreterStrategyManager)  

| Param | Type | Description |
| --- | --- | --- |
| strategy | <code>object</code> | A strategy that can process a custom selector. |

**Example**  
```
        await page.evaluate(() => {
            InterpreterStrategyManager.add(InterpreterElementStrategy);
            InterpreterStrategyManager.add(InterpreterInnerTextStrategy);
            InterpreterStrategyManager.add(InterpreterPropertyStrategy);
        });
```
<a name="InterpreterStrategyManager.lookUp"></a>

### InterpreterStrategyManager.lookUp(selector) ⇒ <code>object</code>
Search among the available strategies which of them is the most suitable
to process a specific selector.

**Kind**: static method of [<code>InterpreterStrategyManager</code>](#InterpreterStrategyManager)  
**Returns**: <code>object</code> - A strategy that can process the custom selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | Custom selector. |

**Example** *({h1} gets InterpreterElementStrategy)*  
```
        await page.evaluate(async () => { 
            const interpreter = InterpreterStrategyManager.lookUp('{h1}');
            console.log(interpreter === InterpreterElementStrategy ? true : false); // true
        });
```
<a name="All"></a>

## All
Contains the specific logic to process nested structures. In case no parameter is passed
to its constructor then it will return the previous result in the execution of the chain.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Process nested structures.  
<a name="CollectorSelector"></a>

## CollectorSelector
Execute a Collector instance.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Css"></a>

## Css
Contains specific logic to extract elements from the DOM using a CSS selector.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Extracts Dom Elements.  
<a name="Default"></a>

## Default
Returns a default value if there the expected result is not valid.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="SelectorDirectory"></a>

## SelectorDirectory
Provide a directory to store proxy function that will be used to instantiate the Implementation sub-classes.
The directory is made up of the name of each proxy function and its sub-class constructor equivalent.

**Kind**: global class  
**Summary**: Keep a record of Selector subclasses.  

* [SelectorDirectory](#SelectorDirectory)
    * [.register(selector)](#SelectorDirectory.register)
    * [.get(name)](#SelectorDirectory.get) ⇒ <code>function</code>
    * [.iterate()](#SelectorDirectory.iterate)

<a name="SelectorDirectory.register"></a>

### SelectorDirectory.register(selector)
Saves a record of the subclass within the registry as a function.

**Kind**: static method of [<code>SelectorDirectory</code>](#SelectorDirectory)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | Constructor class such as Css, Property, Single, etc. |

**Example** *(Use in Selector class)*  
```
SelectorDirectory.register(this); // 'this' referring to the class constructor that is extending Implementation.
```
<a name="SelectorDirectory.get"></a>

### SelectorDirectory.get(name) ⇒ <code>function</code>
Returns the proxy function that was previously registered within the registry object.

**Kind**: static method of [<code>SelectorDirectory</code>](#SelectorDirectory)  
**Returns**: <code>function</code> - Proxy function that will create the instance of the sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of the function stored in the registry object. It will be the lowercase version of the sub-class name. |

**Example** *(Use in Selector class)*  
```
// Create the intance of the functionality
const queryImplementation = SelectorDirectory.get(prop);
const queryInstance = new queryImplementation(definition, this.query);
```
<a name="SelectorDirectory.iterate"></a>

### SelectorDirectory.iterate()
Creates an iterable object of all registries inside the registry object.

**Kind**: static method of [<code>SelectorDirectory</code>](#SelectorDirectory)  
<a name="Elements"></a>

## Elements
Creates a collector that will return a generator of a list of elements.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Init"></a>

## Init
Perform actions during initialization.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Init.register"></a>

### Init.register()
Modifies the registry process in SelectorDirectory class.

**Kind**: static method of [<code>Init</code>](#Init)  
<a name="Iterate"></a>

## Iterate
Iterate a Collector instance against a set of queries.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Merge"></a>

## Merge
Contains the specific Selector that allows concatenating other query Selectors.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Concatenates query Selectors  
<a name="Options"></a>

## Options
Creates a collector that will return a generator of a list of option values.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Post"></a>

## Post
Perform actions after data extraction.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Pre"></a>

## Pre
Perform actions before data extraction.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Property"></a>

## Property
Contains the specific Selector to obtain properties of DOM elements.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Obtain properties.  
<a name="Require"></a>

## Require
Returns an error if the result is not a valid value.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Select"></a>

## Select
Interprets Select Strings.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
<a name="Single"></a>

## Single
Contains the specific Selector to check if a single element is expected
as it turns out, otherwise throw an error.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Check for a single result of the previous Selector.  
<a name="Xpath"></a>

## Xpath ⇐ [<code>Selector</code>](#new_Selector_new)
Contains specific logic to extract elements from the DOM using a xpath selector.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Extracts Dom Elements.  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Xpath](#Xpath) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### xpath.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Xpath</code>](#Xpath)  
<a name="Selector+validateParameters"></a>

### xpath.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### xpath.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### xpath.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### xpath.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### xpath.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### xpath.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### xpath.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Xpath</code>](#Xpath)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="CollectionElementProcessor."></a>

## CollectionElementProcessor.(element) ⇒ <code>boolean</code>
Check the object is a generator.

**Kind**: global function  
**Returns**: <code>boolean</code> - True or False.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>any</code> | An object. |

<a name="CollectionElementProcessor."></a>

## CollectionElementProcessor.(elements)
Create a generator from a list of elements.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Array.&lt;any&gt;</code> | A list of elements. |

<a name="CollectionOptionProcessor."></a>

## CollectionOptionProcessor.(options) ⇒ <code>Promise.&lt;Generator&gt;</code>
It takes Option instances and calculates all possible values ​​of the
combinations of those options.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Generator&gt;</code> - An object that represents a promise object
for a generator containing all the possible values from a set of options.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;Option&gt;</code> | A list of the Option instances. |

