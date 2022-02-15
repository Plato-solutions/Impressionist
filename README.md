# Impressionist

Impressionist is a JavaScript library that allows you to scrape data in less time.

## Powered by:
[![Platosolutions](https://i.ibb.co/w4v9g9d/Plato-Logo.png)](https://www.platosolutions.io)

### Pre-requisites

-   NodeJS version **v14.15.3** or later.
-   Add `"type": "module"` in package.json.  


### Installation

- `npm i @plato2/impressionist`

## Documentation

Please visit [docs.platosolutions.io](https://docs.platosolutions.io/).

## Usage

Impressionist has predefined Puppeteer settings that let you focus on the scraping work instead of complicating with configurations of the browser and pages. The code to be executed in the browser context is organized in such a way that it is easy to know what data we are extracting.

```javascript
import Impressionist from 'impressionist';

Impressionist.execute('https://example.com', async (browser, page) => {
  const result = await page.evaluate( async() => {
      return await collector({
          name: 'h1',
          description: '.overview > p{outerHTML}',
          reviews: elements('{div.reviews > li}*').iterate({
              author: 'span.author',
              body: 'p.description',
              rating: 'span.rating'
          })
      }).call();
  });

  console.log(result);
});
```


Output:

```bash
{
  name: 'Plato Plugin',
  description: '<div class="overview"><h2>Content</h2><p>Content shows detailed information about the plugin.</p></div>',
  reviews: [
    {
      author: "John Doe",
      body: "This is the review body",
      rating: "4.8"
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
}
```