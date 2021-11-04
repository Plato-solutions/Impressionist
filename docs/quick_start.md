# Quick Start



## Select Strings

You get any single piece of data with a Query.  The most used is a select string, which aims to make it very simple and intuitive to get a value. The syntax is based on the CSS selectors, so it should feel very familiar. There are only a few differences that are directly related to some features of Impressionist to provide the user with more control over what they want to extract from a DOM element. In short, most select strings are not valid CSS selectors but are easy to learn due to their similarity.

Next, we will give a tour of the select strings and we will see the ergonomics and configurable features that Impresionist has.



### Default Syntax

The queries have two default behaviors.

1. Find a **single DOM element** that matches a specific selector.
2. Extract the **innerText** property.

For example:

| Select String | Description                                        | Query Selector Synonym                                       | Output Example |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| 'h1'          | Get the innerText property of a unique H1 element. | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1').innerText | 'Plato Plugin' |



### Return Syntax

You can use curly braces to define exactly what you want to extract. In other words, at this moment we move away from the default behavior and begin to configure the extraction result.

For example, in the next example we specify the return of a property different to innerText:

| Select String   | Description                                               | Query Selector Synonym                                       | Output Example          |
| --------------- | --------------------------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| 'h1{outerHTML}' | Return the **outerHTML** property of a unique H1 element. | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1').outerHTML | '\<h1>Plato Plugin\</h1>' |

Also, we can specify to return the very same DOM element:

| Select String | Description            | Query Selector Synonym                                       | Output Example |
| ------------- | ---------------------- | ------------------------------------------------------------ | -------------- |
| '{h1}'        | Return the H1 element. | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1') | H1             |



### Match All Syntax 

You can specify queries that extract information from all DOM elements that match a specific selector using the star symbol "*" at the end of a single query.

For example:

| Select String    | Description                                             | Query Selector Synonym                                       | Output Example                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| 'h1*'            | Return the innerText property from all the H1 elements. | Array.from([baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')).map(el => el.innerText) | ['Plato Plugin', ... ]          |
| '{h1}*'          | Return all H1 elements.                                 | Array.from([baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')) | [H1, ... ]                      |
| 'h1{outerHTML}*' | Return the outerHTML property from all the H1 elements. | Array.from([baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')).map(el => el.outerHTML) | ['\<h1>Plato Plugin\</h1>', ... ] |



## Let's Practice 

Given the following HTML layout let's create a scraper to get every piece of information:

```html
<body>
    <h1>Plato Plugin</h1>
    <div>
        <p>Rating: </p>
        <span class="rating-value">4.8</span>
    </div>
    <div class="description">
        <h2>Description</h2>
        <p>This is a brief description.</p>
    </div>
    <div class="content">
        <h2>Content</h2>
        <p>Content shows detailed information about the plugin like benefits and features.</p>
    </div>
    <div>
        <h3>Media Gallery</h3>
        <div class="carousel">
            <div><img src="https://scrape-test.platoanalitycs.com/images/img1.jpg"></div>
            <div><img src="https://scrape-test.platoanalitycs.com/images/img2.jpg"></div>
            <div><img src="https://scrape-test.platoanalitycs.com/images/img3.jpg"></div>
        </div>
    </div>
    <div>
        <span>Price: </span>
        <span class="#price">150.00</span>
    </div>
</body>
```

Let's see how we can extract that information by applying the knowledge of queries using select strings.



### Initialize Impressionist

To start, we will create the Browser context using the execute method of Impressionist which accepts a function in which we will use as parameters browser and page, which are given by the Puppeteer initialization:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        // Code here will be executed in the Browser context.
    });
});

console.log(result);
```



### Create a Collector

Now we need to create a collector in order to specify what data we want to extract from the HTML layout:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          // Put here all the fields that need to be extracted.
        }).call();
    });
});

console.log(result);
```



### Get the "name"

We are going to extract the plugin name, which in this case is represented by a single '\<h1>' tag in the HTML layout. If we apply what we learned about Select Strings then we only need to specify its CSS Selector, which in this case would be 'h1'. Then our collector will look like this:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          name: 'h1'
        }).call();
    });
});

console.log(result);
```



### Get the "content"

For our content we want to extract the property outerHTML of the div that contains that section of the DOM. In this case, we will have to specify the CSS Selector along with the outerHTML property inside curly braces. The Select String would be '.content{outerHTML}'. So, our selector now will be like this:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          name: 'h1',
          content: '.content{outerHTML}'
        }).call();
    });
});

console.log(result);
```



### Get the "media_gallery"

The image gallery of our plugin is made up of multiple images. In our case, we want to extract the 'src' property of each of the images. To do so, we have to 1) specify the selector that references all the '<img>' elements present inside the div with the class 'carousel', 2) specify the 'src' property inside curly braces, and 3) use the '*' symbol to indicate that we want to extract all the elements that match that selector. The Select String would be '.carousel img{src}*'. So, our selector will finally have this structure:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          name: 'h1',
          content: '.content{outerHTML}',
          media_gallery: '.carousel img{src}*'
        }).call();
    });
});

console.log(result);
```

The result of the execution will be as follows:

```bash
[{
  name: 'Plato Plugin',
  content: '<div class="content"><h2>Content</h2><p>Content shows detailed information about the plugin like benefits and features.</p></div>',
  media_gallery: [
    'https://scrape-test.platoanalitycs.com/images/img1.jpg',
    'https://scrape-test.platoanalitycs.com/images/img2.jpg',
    'https://scrape-test.platoanalitycs.com/images/img3.jp']
}]
```

In the following pages, we will see how we can take advantage of advanced functionalities to configure the way we can extract data.