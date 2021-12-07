## Advanced Selectors

Previously we saw how Selectors can be concatenated to extend the functionality of a query. Next, we will look at advanced Selectors that further expand their use.



### elements

This Selector allows you to iterate a group of queries over different elements. Let's suppose a website has a Reviews section, the HTML layout might look something like this:

```html
<div class="reviews">
  <li>
    <ul>
      <span class="author">...</span>
      <p class="description">...</p>
      <span class="rating">...</span>
    </ul>
    <ul>
      <span class="author">...</span>
      <p class="description">...</p>
      <span class="rating">...</span>
    </ul>
    <ul>
      <span class="author">...</span>
      <p class="description">...</p>
      <span class="rating">...</span>
    </ul>
    ...
  </li>
</div>
```

This example is very close to reality. We see a list of <ul> elements whose structure is the same in each case. It is here where it would be very useful to be able to define the selectors of each data and simply iterate the same queries for each element <ul>. It is here where we can apply the Element selector.

First, let's think about how to get the list of all <ul> elements. If it were a CSS selector query it would be `document.querySelectorAll('div.reviews > li > ul)`, but since we've already learned how to use Select Strings, we know we can represent it like this: `'{div.reviews > li > ul}*'`, so so so far our collector would look like this:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          reviews: elements('{div.reviews > li}*')
        }).call();
    });
});

console.log(result);
```

Now, the Element selector provides an Iterate method with which we can specify which queries we are going to execute for each iteration of the obtained elements:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          reviews: elements('{div.reviews > li}*').iterate({
              author: 'span.author',
              body: 'p.description',
              rating: 'span.rating'
          })
        }).call();
    });
});

console.log(result);
```

We will obtain a result like the following:

```bash
[{
  reviews: [
    {
      author: "...",
      body: "...",
      rating: "..."
    },
    {
      author: "...",
      body: "...",
      rating: "..."
    },
    {
      author: "...",
      body: "...",
      rating: "..."
    },
    ...
  ] 
}]
```



### options

In the case of the Options selector, it differs from Elements in the sense that its objective is much more specific; in a website, we can find elements that need the interaction of a user to configure, for example, a product or service.

Let's go a little further in the example and think of a website that offers products or services that can be configured, such as the edition, support plans, and installation options. These options can be represented by different elements in the DOM, for example, buttons, checkboxes, dropdowns, etc, as shown in the following HTML layout:

```html
<div>
  <div>
    <span>Edition</span>
    <select id="edition">
      <option>Open Source</option>
      <option>Enterprise Edition</option>
    </select>    
  </div>
	<div>
    <span>Support</span>
  	<select id="support">
    	<option>3 Months</option>
    	<option>6 Months</option>
  	</select>  
  </div>
  <div id="installation">
    <span type="checkbox">Professional Installation</span>
  	<input>
  </div>
</div>
```

Calculating all possible values of the mixture of all options may be difficult, and the algorithm may be extensive. In this case, Options selector does all that, and even more, as we will see later.

Building a collector for where using Options selector can be like the following. First, you need to add the different options using a set of queries, where again, you can use the Select Strings for getting the DOM elements for each Select element:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          bundles: options({
            edition: '{select#edition}',
            support: '{select#support}',
            installation: '{div#installation}'
          })
        }).call();
    });
});

console.log(result);
```

Like Elements, Options selector use iterate to collect items for each iteration, in this case, each possible value of all options creates a new iteration. By default, every option will be collected so there is no need to add collectors inside the iterate definition for them, but you can add other collectors to get more data. In this example, let's suppose that for each possible option combination, the price changes dynamically, so this is a good use of iterate to get prices on every iteration:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          bundles: options({
            edition: '{select#edition}',
            support: '{select#support}',
            installation: '{div#installation}'
          })
          .iterate({
          	price: '::document > #price'
          })
        }).call();
    });
});

console.log(result);
```

Then, we can expect a result as follows:

```bash
[
	{
		installation: false,
		support: 'val-40',
		edition: 'val-10'
	},
	{
		installation: true,
		support: 'val-40',
		edition: 'val-10'
	},
	{
		additional: false,
		support: 'val-50',
		edition: 'val-10'
	},
	{
		additional: true,
		support: 'val-50',
		edition: 'val-10'
	},
	{
		additional: false,
		support: 'val-40',
		edition: 'val-20'
	},
	{
		additional: true,
		support: 'val-40',
		edition: 'val-20'
	},
	{
		additional: false,
		support: 'val-50',
		edition: 'val-20'
	},
	{
		additional: true,
		support: 'val-50',
		edition: 'val-20'
	},
	{
		additional: false,
		support: 'val-40',
		edition: 'val-30'
	},
	{
		additional: true,
		support: 'val-40',
		edition: 'val-30'
	},
	{
		additional: false,
		support: 'val-50',
		edition: 'val-30'
	},
	{
		additional: true,
		support: 'val-50',
		edition: 'val-30'
	}
]
```



### merge

With this selector you can concatenate queries. It is useful when you want to gather data from several elements in the DOM in the same field.

For example, let's suppose we want to extract some representative images of a Plugin website. On the page we find a main image next to the plugin name and further down in the HTML layout we find an image carousel section. There are more images in the page but we are not interested on those ones. The HTML layout can look like this:

```html
<body>
  ...
  <div class="main">
    <h1>Plato Plugin</h1>
    <img src="https://...main.jpg" alt="Plugin Main Image">
  </div>
  ...
	<div>
    <h3>Screenshots</h3>
  	<div class="carousel">
      <img src="https://...1.jpg" alt="Plugin Screenshot #1">
      <img src="https://...2.jpg" alt="Plugin Screenshot #2">
      <img src="https://...3.jpg" alt="Plugin Screenshot #3">
      <img src="https://...4.jpg" alt="Plugin Screenshot #4">
    </div>
  </div>
  ...
</body>
```

Using only Select String the Collector needs to be like this:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          	main_image: 'div.main > img{src}',
          	carousel: 'div.carousel > img{src}*'
        }).call();
    });
});

console.log(result);
```

Then, the result will be:

```bash
[{
	main_image: 'https://...main.jpg',
	carousel: ['https://...1.jpg', 'https://...2.jpg', 'https://...3.jpg', 'https://...4.jpg']
}]
```

Because the elements are in different nodes, a simple query cannot get all of them in a single field. We can improve this using the Merge selector:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          media_gallery: merge([ select('div.main > img{src}*'), select('div.carousel > img{src}*') ]),
        }).call();
    });
});

console.log(result);
```

The result will look like this:

```bash
[{ 
	media_gallery: [
		'https://...main.jpg',
		'https://...1.jpg',
		'https://...2.jpg',
		'https://...3.jpg',
		'https://...4.jpg'
  ]
}]
```



## Selector Hooks

The following selectors extend the functionality of query chains giving the developer the flexibility to introduce custom functions to the chain.

### pre

It allows you execute actions before the extraction of the elements. Let's suppose that some images in a carousel are loaded as the user clicks on the next button. If we try to extract all the images from that carousel using a simple Select String we will probably only extract those present after the Document is loaded, but those loaded using the lazy-load feature will not appear. In those cases, it is useful to execute actions before the extraction. Consider the following example:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          media_gallery: pre(function loadAllImages(context) => ...).select('div.carousel > img{src}*'),
        }).call();
    });
});

console.log(result);
```



### post

It allows you execute actions after the extraction of the elements. Let's suppose we want to run a transformation or normalization of the data we have extracted. For example:

```javascript
import Impressionist from 'impressionist';

const result = Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          media_gallery: select('h1').post(function removeScapeSequenceCharacter(pluginName) => ...),
        }).call();
    });
});

console.log(result);
```



### init

It allows you execute actions once, before the execution of the Collector, in other words, during the query initialization:

```javascript
import Impressionist from 'impressionist';

const result = await Impressionist.execute('http...', async (browser, page) => {
    return await page.evaluate(async () => {
        return await collector({
          media_gallery: init(function loadAllImages() => ...).select('div.carousel > img{src}*'),
        }).call();
    });
});

console.log(result);
```



## Advanced Select Strings

As we have seen before, Select Strings are very useful for data extraction. Like Selectors, Select Strings can use some advanced features such as the following:



### Nested Properties

Many of the properties of objects have more properties internally. Select String can be used to reach such nested properties. For example:

| Query String                | Description                                                  | Query Selector Synonym                                       | Output Example |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| **'h1{innerText{length}}'** | Return the length property of the innerText property from the H1 elements. | Array.from(<br />[baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1')<br />.innerText.length) | '23'           |



### ::document

You can specify the Document object the baseElement of a Select String by adding it to the beginning of the custom selector.

For example:

| Query String          | Description                                       | Query Selector Synonym                                       | Output Example |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| **'::document > h1'** | Return the innerText property from a H1 elements. | Array.from(<br />[document](https://developer.mozilla.org/en-US/docs/Web/API/Document).querySelector('h1')<br />).map(el => el.innerText) | 'Plato Plugin' |

The use of this feature can be extremely useful in the [example we have seen with options](###options), where one of the data to be extracted is not directly related to the values of the options but to the effect of selecting those options.



### ::item

You can specify that the element from which some properties will be subtracted is the same element that is being iterated.

For example:

| Query String            | Description                                                  | Query Selector Synonym | Output Example |
| ----------------------- | ------------------------------------------------------------ | ---------------------- | -------------- |
| **'::item{innerText}'** | Return the innerText property from the element that is being iterated. |                        | '...'          |

Let's think for example of a list of reviews such as the following:

```javascript
import Impressionist from 'impressionist';

(async function main() {
  const result = await Impressionist.execute('http...', async (browser, page) => {
      return await page.evaluate(async () => {
          return await collector({
            reviews: elements('{div.reviews > li}*').iterate({
                author: 'span.author',
                body: '::item{innerText}',
                rating: 'span.rating'
            })
          }).call();
      });
  });

	console.log(result);
})();
```

See how the "body" field makes use of ::item in order to extract the innerText of the LI element that is currently being iterated.
