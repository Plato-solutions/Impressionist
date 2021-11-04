## Classes

<dl>
<dt><a href="#Environment">Environment</a></dt>
<dd><p>It manages the use of environment variables by providing useful methods for checking and obtaining the variables.</p>
</dd>
<dt><a href="#Process">Process</a></dt>
<dd><p>Provides <a href="https://pptr.dev/">Puppeteer</a> initialization by creating
<a href="https://pptr.dev/#?product=Puppeteer&amp;version=v10.1.0&amp;show=api-class-browser">Browser</a> and
<a href="https://pptr.dev/#?product=Puppeteer&amp;version=v10.1.0&amp;show=api-class-page">Page</a> instances
to provide the browser context necessary for the execution of a custom function.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Process.">Process.([browserOptions])</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Creates the Browser and Page instances.</p>
</dd>
<dt><a href="#Process.">Process.(page)</a></dt>
<dd><p>Exposes the logger function to be used in the browser.</p>
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
    * [.execute(url, customFunction)](#Process.execute) ⇒ <code>Promise</code>
    * [.openConnection(url, [browserOptions])](#Process.openConnection) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.createPage(browser)](#Process.createPage) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.setPageConfigurations(page, url)](#Process.setPageConfigurations) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.connect(browserWSEndpoint, customFunction, [...args])](#Process.connect) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="Process.execute"></a>

### Process.execute(url, customFunction) ⇒ <code>Promise</code>
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

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [browserOptions] | <code>object</code> | <code>{}</code> | Please read the documentation about the [Launch Options](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions). |
| [args] | <code>Array</code> | <code>[]</code> | Any parameter necessary for the custom function. |

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
    const data = await Impressionist.Process.execute(url, scrape, { browserOptions: { headless: false } } );
    console.log(JSON.stringify(data));
})(scrape);

async function scrape(browser, page) {
     ...
}
```
<a name="Process.openConnection"></a>

### Process.openConnection(url, [browserOptions]) ⇒ <code>Promise.&lt;object&gt;</code>
Open a connection to a browser instance.

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object that represents an object that stores the browser, page instances.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | Target URL for scraping process. |
| [browserOptions] | <code>object</code> | <code>{}</code> | Please read the documentation about the [Launch Options](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions). |

<a name="Process.createPage"></a>

### Process.createPage(browser) ⇒ <code>Promise.&lt;object&gt;</code>
Creates a new instance of [Page](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page).

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object that represents a [Page instance](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page).  

| Param | Type | Description |
| --- | --- | --- |
| browser | <code>object</code> | [Browser instance](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-browser). |

**Example** *(Create a second Page instance)*  
```
(async () => {
    const data = await Impressionist.Process.execute(url, scrape);
    console.log(JSON.stringify(data));
})(scrape);

async function scrape(browser, page) {
     const resultMainPage = await page.evaluate(...);
     
     // Need for a second page instance
     const secondPage = await Impressionist.Process.createPage(browser);

     ...

}
```
<a name="Process.setPageConfigurations"></a>

### Process.setPageConfigurations(page, url) ⇒ <code>Promise.&lt;void&gt;</code>
Method that takes as a parameter the Page instance that is started internally within the class.
The method can modify the behavior of the Page instance. Please read the documentation about the
[Page instance](https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-class-page).

**Kind**: static method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise object that represents the method execution completion.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>page</code> | [Page instance](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page). |
| url | <code>string</code> | Target URL. |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [defaultTimeout] | <code>number</code> | <code>60000</code> | Maximum time. Please read [page.setDefaultTimeout](https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagesetdefaulttimeouttimeout) documentation. |
| [viewport] | <code>object</code> | <code>{ width: 1366, height: 768, deviceScaleFactor: 1 }</code> | Viewport. Please read [page.setViewport](https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagesetviewportviewport) documentation. |
| [navigation] | <code>object</code> | <code>{ waitUntil: &#x27;networkidle2&#x27; }</code> | Navigation parameters. Please read [page.goto](https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagegotourl-options) documentation. |

**Example** *(Create a second Page instance and apply default configurations)*  
```
(async () => {
    const data = await Impressionist.Process.execute(url, scrape);
    console.log(JSON.stringify(data));
})(scrape);

async function scrape(browser, page) {
     const resultMainPage = await page.evaluate(...);
     
     // Need for a second page instance
     const secondPage = await Impressionist.Process.createPage(browser);
     
     // Apply default configurations
     await Impressionist.Process.setPageConfigurations(secondPage, 'https://...');
     
     // Using the second Page instance
     const resultSecondPage = await secondPage.evaluate(...);

     ...

}
```

 
**Example** *(Create a second Page instance and set a different viewport)*  
```
(async () => {
    const data = await Impressionist.Process.execute(url, scrape);
    console.log(JSON.stringify(data));
})(scrape);

async function scrape(browser, page) {
     const resultMainPage = await page.evaluate(...);
     
     // Need for a second page instance
     const secondPage = await Impressionist.Process.createPage(browser);
     
     // Apply different configurations
     await Impressionist.Process.setPageConfigurations(secondPage, 'https://...', {
         viewport: {
             width: 1920,
                    height: 1080,
                    deviceScaleFactor: 1
         }
     });
     
     // Using the second Page instance
     const resultSecondPage = await secondPage.evaluate(...);

     ...

}
```
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

<a name="Process."></a>

## Process.([browserOptions]) ⇒ <code>Promise.&lt;object&gt;</code>
Creates the Browser and Page instances.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Promise object that represents an object that stores the browser, page instances.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [browserOptions] | <code>object</code> | <code>{}</code> | Please read the documentation about the [Launch Options](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-puppeteerlaunchoptions). |

<a name="Process."></a>

## Process.(page)
Exposes the logger function to be used in the browser.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | [Page instance](https://pptr.dev/#?product=Puppeteer&version=v10.1.0&show=api-class-page). |

## Classes

<dl>
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
<dd><p>Perform the necessary steps to configure Sentry.</p>
</dd>
</dl>

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
    * [.log(report)](#Sentry.log)
    * [.sendException(error)](#Sentry.sendException) ⇒ <code>Promise.&lt;void&gt;</code>

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
Perform the necessary steps to configure Sentry.

**Kind**: global function  
**Example**  
```
Sentry.setConfigurations();
```
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
| strategies | <code>Array.&lt;object&gt;</code> | Available strategies. |

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

### LazyLoadHandler.execute(buttonSelector)
Executes the loading of all the elements by providing a clickable element selector, for example, a Next button.

**Kind**: static method of [<code>LazyLoadHandler</code>](#LazyLoadHandler)  

| Param | Type | Description |
| --- | --- | --- |
| buttonSelector | <code>string</code> | CSS Selector. |

<a name="Pagination"></a>

## Pagination
Handles the pagination of an HTML section.

**Kind**: global class  
<a name="Pagination.execute"></a>

### Pagination.execute(buttonSelector, [time])
Create a generator object with the new rendered document.

**Kind**: static method of [<code>Pagination</code>](#Pagination)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buttonSelector | <code>string</code> |  | CSS selector of the button that triggers the action to go to the next pagination. |
| [time] | <code>number</code> | <code>300</code> | Delay time for rendering the document object. |

<a name="Logger."></a>

## Logger.(elements) ⇒ <code>Array.&lt;object&gt;</code>
Extract useful information from elements and give them a specific format inside a list.

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - - List of objects that represent an element.  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>object</code> | Any element to record its value, data type and instance. |

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
<dd><p>Shortcut to create a Collector isntances for collecting a collection
for each iterable item in the context.</p>
</dd>
<dt><a href="#ElementCollectorFactory">ElementCollectorFactory</a></dt>
<dd><p>Shortcut to create Collector that returns a NodeList of DOM elements.</p>
</dd>
<dt><a href="#OptionCollectorFactory">OptionCollectorFactory</a></dt>
<dd><p>Shortcut to create Collector that returns a list of combinations
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
| queries | <code>Object</code> \| <code>function</code> \| <code>string</code> | Set of queries. |

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
Shortcut to create a Collector isntances for collecting a collection
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
Shortcut to create Collector that returns a NodeList of DOM elements.

**Kind**: global class  
<a name="new_ElementCollectorFactory_new"></a>

### new ElementCollectorFactory(query)
**Returns**: <code>Collector</code> - A new instance of Collector.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>function</code> \| <code>Object</code> \| <code>Query</code> \| <code>string</code> | A callabel object. |

<a name="OptionCollectorFactory"></a>

## OptionCollectorFactory
Shortcut to create Collector that returns a list of combinations
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
<dd><p>Converts collection into a generator of elements.</p>
</dd>
<dt><a href="#CollectionOptionProcessor">CollectionOptionProcessor</a></dt>
<dd><p>Processes collected values into options.</p>
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
<dt><a href="#All">All</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Contains the specific logic to process nested structures. In case no parameter is passed
to its constructor then it will return the previous result in the execution of the chain.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Css">Css</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Contains specific logic to extract elements from the DOM using a CSS selector.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Default">Default</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Returns a default value if there the expected result is not valid.</p>
</dd>
<dt><a href="#SelectorDirectory">SelectorDirectory</a></dt>
<dd><p>Provide a directory to store proxy function that will be used to instantiate the Implementation sub-classes.
The directory is made up of the name of each proxy function and its sub-class constructor equivalent.</p>
</dd>
<dt><a href="#Elements">Elements</a></dt>
<dd><p>Creates a collector that will return a generator of a list of elements.</p>
</dd>
<dt><a href="#Init">Init</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Perform actions during initialization.</p>
</dd>
<dt><a href="#Iterate">Iterate</a></dt>
<dd><p>Iterate a Collector instance against a set of queries.</p>
</dd>
<dt><a href="#Merge">Merge</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Contains the specific Selector that allows concatenating other query Selectors.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Options">Options</a></dt>
<dd><p>Creates a collector that will return a generator of a list of option values.</p>
</dd>
<dt><a href="#Post">Post</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Perform actions after data extraction.</p>
</dd>
<dt><a href="#Pre">Pre</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Perform actions before data extraction.</p>
</dd>
<dt><a href="#Property">Property</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Contains the specific Selector to obtain properties of DOM elements.</p>
<p>The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.</p>
</dd>
<dt><a href="#Require">Require</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
<dd><p>Returns an error if the result is not a valid value.</p>
</dd>
<dt><a href="#Select">Select</a></dt>
<dd><p>Interprets Select Strings.</p>
</dd>
<dt><a href="#Single">Single</a> ⇐ <code><a href="#new_Selector_new">Selector</a></code></dt>
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
<dt><a href="#CollectionOptionProcessor.">CollectionOptionProcessor.(options)</a> ⇒ <code>Promise.&lt;Generator&gt;</code></dt>
<dd><p>It takes Option instances and calculates all possible values ​​of the
combinations of those options.</p>
</dd>
</dl>

<a name="CollectionElementProcessor"></a>

## CollectionElementProcessor
Converts collection into a generator of elements.

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
Processes collected values into options.

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
Extract a value that will be used to identify each option.

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

## All ⇐ [<code>Selector</code>](#new_Selector_new)
Contains the specific logic to process nested structures. In case no parameter is passed
to its constructor then it will return the previous result in the execution of the chain.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Process nested structures.  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [All](#All) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### all.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>All</code>](#All)  
<a name="Selector+validateParameters"></a>

### all.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>All</code>](#All)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### all.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>All</code>](#All)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### all.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>All</code>](#All)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### all.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>All</code>](#All)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### all.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>All</code>](#All)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### all.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>All</code>](#All)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### all.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>All</code>](#All)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Css"></a>

## Css ⇐ [<code>Selector</code>](#new_Selector_new)
Contains specific logic to extract elements from the DOM using a CSS selector.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Extracts Dom Elements.  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Css](#Css) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### css.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Css</code>](#Css)  
<a name="Selector+validateParameters"></a>

### css.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### css.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### css.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### css.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### css.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Css</code>](#Css)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### css.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### css.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Css</code>](#Css)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Default"></a>

## Default ⇐ [<code>Selector</code>](#new_Selector_new)
Returns a default value if there the expected result is not valid.

**Kind**: global class  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Default](#Default) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### default.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Default</code>](#Default)  
<a name="Selector+validateParameters"></a>

### default.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Default</code>](#Default)  
<a name="Selector+execute"></a>

### default.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Default</code>](#Default)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### default.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Default</code>](#Default)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### default.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Default</code>](#Default)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### default.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Default</code>](#Default)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### default.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Default</code>](#Default)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### default.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Default</code>](#Default)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

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

**Kind**: global class  
<a name="Init"></a>

## Init ⇐ [<code>Selector</code>](#new_Selector_new)
Perform actions during initialization.

**Kind**: global class  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Init](#Init) ⇐ [<code>Selector</code>](#new_Selector_new)
    * _instance_
        * [.alternatives](#Selector+alternatives)
        * [.validateParameters()](#Selector+validateParameters)
        * [.execute(context)](#Selector+execute)
        * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
        * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
        * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
        * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
        * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
    * _static_
        * [.register()](#Init.register)

<a name="Selector+alternatives"></a>

### init.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Init</code>](#Init)  
<a name="Selector+validateParameters"></a>

### init.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Init</code>](#Init)  
<a name="Selector+execute"></a>

### init.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Init</code>](#Init)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### init.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Init</code>](#Init)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### init.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Init</code>](#Init)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### init.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Init</code>](#Init)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### init.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Init</code>](#Init)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### init.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Init</code>](#Init)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Init.register"></a>

### Init.register()
Modifies the record to be made in the SelectorDirectory class.

**Kind**: static method of [<code>Init</code>](#Init)  
<a name="Iterate"></a>

## Iterate
Iterate a Collector instance against a set of queries.

**Kind**: global class  
<a name="Merge"></a>

## Merge ⇐ [<code>Selector</code>](#new_Selector_new)
Contains the specific Selector that allows concatenating other query Selectors.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Concatenates query Selectors  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Merge](#Merge) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### merge.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Merge</code>](#Merge)  
<a name="Selector+validateParameters"></a>

### merge.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### merge.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### merge.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### merge.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### merge.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Merge</code>](#Merge)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### merge.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### merge.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Merge</code>](#Merge)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Options"></a>

## Options
Creates a collector that will return a generator of a list of option values.

**Kind**: global class  
<a name="Post"></a>

## Post ⇐ [<code>Selector</code>](#new_Selector_new)
Perform actions after data extraction.

**Kind**: global class  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Post](#Post) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### post.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Post</code>](#Post)  
<a name="Selector+validateParameters"></a>

### post.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### post.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### post.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### post.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### post.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Post</code>](#Post)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### post.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### post.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Post</code>](#Post)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Pre"></a>

## Pre ⇐ [<code>Selector</code>](#new_Selector_new)
Perform actions before data extraction.

**Kind**: global class  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Pre](#Pre) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### pre.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Pre</code>](#Pre)  
<a name="Selector+validateParameters"></a>

### pre.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### pre.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### pre.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### pre.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### pre.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Pre</code>](#Pre)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### pre.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### pre.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Pre</code>](#Pre)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Property"></a>

## Property ⇐ [<code>Selector</code>](#new_Selector_new)
Contains the specific Selector to obtain properties of DOM elements.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Obtain properties.  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Property](#Property) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### property.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Property</code>](#Property)  
<a name="Selector+validateParameters"></a>

### property.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Overrides**: [<code>validateParameters</code>](#Selector+validateParameters)  
<a name="Selector+execute"></a>

### property.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### property.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### property.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### property.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Property</code>](#Property)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### property.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### property.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Property</code>](#Property)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Require"></a>

## Require ⇐ [<code>Selector</code>](#new_Selector_new)
Returns an error if the result is not a valid value.

**Kind**: global class  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Require](#Require) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### require.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Require</code>](#Require)  
<a name="Selector+validateParameters"></a>

### require.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Require</code>](#Require)  
<a name="Selector+execute"></a>

### require.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Require</code>](#Require)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### require.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Require</code>](#Require)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### require.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Require</code>](#Require)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### require.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Require</code>](#Require)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### require.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Require</code>](#Require)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### require.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Require</code>](#Require)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Select"></a>

## Select
Interprets Select Strings.

**Kind**: global class  
<a name="Single"></a>

## Single ⇐ [<code>Selector</code>](#new_Selector_new)
Contains the specific Selector to check if a single element is expected
as it turns out, otherwise throw an error.

The class itself is not open to developer use, but rather is used by a proxy function to
build the instance. See the example for more information.

**Kind**: global class  
**Summary**: Check for a single result of the previous Selector.  
**Extends**: [<code>Selector</code>](#new_Selector_new)  

* [Single](#Single) ⇐ [<code>Selector</code>](#new_Selector_new)
    * [.alternatives](#Selector+alternatives)
    * [.validateParameters()](#Selector+validateParameters)
    * [.execute(context)](#Selector+execute)
    * [.call(context)](#Selector+call) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
    * [.setGetElement(context)](#Selector+setGetElement) ⇒ <code>this</code>
    * [.getElement(context)](#Selector+getElement) ⇒ <code>Any</code>
    * [.alt(definition)](#Selector+alt) ⇒ <code>this</code>
    * [.executeAlternatives(context)](#Selector+executeAlternatives) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>

<a name="Selector+alternatives"></a>

### single.alternatives
Queue of alternative definitions.

**Kind**: instance property of [<code>Single</code>](#Single)  
<a name="Selector+validateParameters"></a>

### single.validateParameters()
Validate the instance initialization parameters.

**Kind**: instance method of [<code>Single</code>](#Single)  
<a name="Selector+execute"></a>

### single.execute(context)
Method that contains all the specific Selector of the instance.

**Kind**: instance method of [<code>Single</code>](#Single)  
**Overrides**: [<code>execute</code>](#Selector+execute)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+call"></a>

### single.call(context) ⇒ <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code>
Main method. Start the execution processes of the chained instances.

**Kind**: instance method of [<code>Single</code>](#Single)  
**Returns**: <code>Promise.&lt;(string\|Array.&lt;\*&gt;\|Object)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+setGetElement"></a>

### single.setGetElement(context) ⇒ <code>this</code>
Set a new context.

**Kind**: instance method of [<code>Single</code>](#Single)  
**Returns**: <code>this</code> - The instance of a Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+getElement"></a>

### single.getElement(context) ⇒ <code>Any</code>
Get the element from the context.

**Kind**: instance method of [<code>Single</code>](#Single)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

<a name="Selector+alt"></a>

### single.alt(definition) ⇒ <code>this</code>
Allows the agregation of new alternatives.

**Kind**: instance method of [<code>Single</code>](#Single)  
**Returns**: <code>this</code> - Instance of Selector sub-class.  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>string</code> \| <code>Array.&lt;(object\|function())&gt;</code> \| <code>object</code> | The value required to make the selection. For example, in "css" it is a Css Selector, in "property" it is a string that represents a property of the previous object as "innerText", and so on. |

<a name="Selector+executeAlternatives"></a>

### single.executeAlternatives(context) ⇒ <code>Promise.&lt;(object\|string\|Array)&gt;</code>
Execute the next alternative in the FIFO queue.

**Kind**: instance method of [<code>Single</code>](#Single)  
**Returns**: <code>Promise.&lt;(object\|string\|Array)&gt;</code> - Promise object that represents the result of the chain execution.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Context</code> | Object that represents the context or the element that is being passed on nested queries or instances executions. |

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

