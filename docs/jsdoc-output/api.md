## Classes

<dl>
<dt><a href="#Sentry">Sentry</a></dt>
<dd><p>Provides an interface for <a href="https://docs.sentry.io/platforms/node/">Sentry integration</a> with Puppeteerist.</p>
</dd>
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
<dt><a href="#StrategyManager">StrategyManager</a></dt>
<dd><p>Provides a common method to share across the different strategies managers.</p>
</dd>
<dt><a href="#TypeValidator">TypeValidator</a></dt>
<dd><p>Provides a static method that checks the data type of an incoming value.</p>
</dd>
</dl>

<a name="Sentry"></a>

## Sentry
Provides an interface for [Sentry integration](https://docs.sentry.io/platforms/node/) with Puppeteerist.

**Kind**: global class  

* [Sentry](#Sentry)
    * [.setConfigurations()](#Sentry.setConfigurations)
    * [.sendException(error)](#Sentry.sendException) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Sentry.setConfigurations"></a>

### Sentry.setConfigurations()
Perform the necessary steps to configure Sentry.

**Kind**: static method of [<code>Sentry</code>](#Sentry)  
**Example**  
```
Sentry.setConfigurations();
```
<a name="Sentry.sendException"></a>

### Sentry.sendException(error) ⇒ <code>Promise.&lt;void&gt;</code>
Send error generated to Sentry while Puppeteer execution.

**Kind**: static method of [<code>Sentry</code>](#Sentry)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Promise object that represents end of the Sentry actions.  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Object that represents the error generated during the execution of the scraper. |

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
    
                return new ElementCollectorFactory(css('#reviews > ul > li').all()).iterate({
                    author: css('#review-author').property('innerText').single(),
                    title: css('#review-title').property('innerText').single(),
                    rating: css('#review-rating').property('innerText').single(),
                    body: css('#review-body').property('innerText').single(),
                    date: css('#review-date').property('innerText').single()
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

