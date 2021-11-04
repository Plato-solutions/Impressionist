# Intro

Impressionist is a JavaScript library for scraping data from the web in less time and without headaches. The library works on top of [Puppeteer](https://pptr.dev/), adding ergonomic scraping syntax to Puppeteer's powerful browser automation features. Impressionist reduces distractions and errors with an elegant query syntax while simplifying maintaining context with a tree structure. Moving the repetitive minutia of interacting with the DOM and web behind the scenes so developers can focus on the problem domain.

There are several solutions that provide browser automation such as Playwright, Selenium, Cypress, etc. All of them are focused on test automation and not on data extraction. The purpose of Impressionist is to optimize for data extraction and it happens to use Puppeteer for browser automation, but could use another solution.

What you can get from Impressionist:

- 70% less of code lines.
- Saves up to 70% of the time.
- Increase code readability, making it easier to maintain the scrapers.
- Focus on scraping, not on configurations.



## Simple Example

Next, we will see a simple example of how to create a scraper using only Puppeteer. Then we will create a scraper using Impressionist. With these examples, we will highlight the benefits of using Impressionist.



### Using Puppeteer

In this example, we can notice all the necessary configurations to use Puppeteer. The code to be executed in the browser context (code inside the page.evaluate block) is extensive due to the DOM element checks, error handling, and default values.

```javascript
import puppeteer from 'puppeteer';

(async () => {
  // Browser configuration
  const browser = await puppeteer.launch();

  // Page configuration
  const page = await browser.newPage();

  // Navigate
  await page.goto('https://example.com');

  const result = await page.evaluate(() => { // page.evaluate enables execute code in Browser Context

    function getName() { // Requires the extraction of the name.
      const nameSelector = document.querySelector('h1');

      if(nameSelector) {
        return nameSelector.innerText;
      } else {
        throw new Error('Cannot find an element that match selector h1');
      }

    }

    function getDescription() { // Requires the extraction of the description outerHTML property.
      const descriptionSelector = document.querySelector('.overview > p');

      if(descriptionSelector) {
        return descriptionSelector.outerHTML;
      } else {
        throw new Error('Cannot find an element that match selector .overview > p');
      }

    }

    function getRating() { // If DOM element does not exist, return a default value.
      const ratingSelector = document.querySelector('.rating > span');

      if(ratingSelector) {
        return ratingSelector.innertext;
      } else {
        return '0';
      }

    }

    return { name: getName(), description: getDescription(), rating: getRating() };

  });

  console.log(result);
  await browser.close();

})();
```



### Using Impressionist

Impressionist has predefined Puppeteer settings that let you focus on the scraping work instead of complicating with configurations of the browser and pages. The code to be executed in the browser context is organized in such a way that it is easy to know what data we are extracting.

```javascript
import Impressionist from 'impressionist';

Impressionist.execute('https://example.com', async (browser, page) => {
  const result = await page.evaluate( async() => {
      return await collector({
          name: 'h1',
          description: '.overview > p{outerHTML}',
          rating: select('rating > span').default('0')
      }).call();
  });

  console.log(result);
});
```

The use of Impressionist is very ergonomic and configurable. For example, in the "name" query, the innerText of the h1 element is being extracted by just specifying its CSS selector. This is a default behavior of Impressionist since the innerText of an element is the most used property in scrapers. However, this is not to say that you cannot use Impressionist to extract some other property. As you can see in the query for "description", after specifying the selector we can add curly braces to specify the property that we want to extract from that element, which, in this example, is outerHTML.

By default, all queries are required, this means that if a selector does not match any element in the DOM then an error will be thrown in order to inform the user so he can correct the selector. This is also something that can be configured. In the query for "rating", we can see how to set default values when the selector is not found. For this, select( ) is used, which allows us to chain other Impressionist functionalities, which in this case is the default( ) method. In this way, the user can define which data is so important that it is better to throw an error than to return a default value.

Impressionist has many other features that we will be discussing in the next few pages. At the moment, it is very clear how Impressionist saves time building scrapers by eliminating the need to write repetitive code and providing the user with functionalities that have been tested by developers who are dedicated to building scrapers.

