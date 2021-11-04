# Advanced Selectors

Previously we saw how Selectors can be concatenated to extend the functionality of a query. Next, we will look at advanced Selectors that further expand their use.



## elements

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

