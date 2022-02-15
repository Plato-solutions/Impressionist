## Select Strings

| Select String Example       | Description                                                  | Synonym                                                      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **'h1'**                    | Get the innerText property of a unique H1 element.           | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1').innerText |
| **'h1{outerHTML}'**         | Return the **outerHTML** property of a unique H1 element.    | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1').outerHTML |
| **'{h1}'**                  | Return the H1 element.                                       | [baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1') |
| **'h1\*'**                  | Return the innerText property from all the H1 elements.      | Array.from(<br />[baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')<br />).map(el => el.innerText) |
| **'{h1}\*'**                | Return all H1 elements.                                      | Array.from([baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')) |
| **'h1{outerHTML}\*'**       | Return the outerHTML property from all the H1 elements.      | Array.from(<br />[baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelectorAll('h1')<br />).map(el => el.outerHTML) |
| **'h1{innerText{length}}'** | Return the length property of the innerText property from the H1 elements. | Array.from(<br />[baseElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).querySelector('h1')<br />.innerText.length) |
| **'::document > h1'**       | Return the innerText property from a H1 elements.            | Array.from(<br />[document](https://developer.mozilla.org/en-US/docs/Web/API/Document).querySelector('h1')<br />).map(el => el.innerText) |
| **'::item{innerText}'**     | Return the innerText property from the element that is being iterated. | element.innerText                                            |



## Selectors

| Selector     | Description                                                  | Example                                                      |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **select**   | Processes a Select String                                    | select('h1')                                                 |
| **css**      | Uses a CSS selector to extract all matching elements in the DOM. | css('h1')                                                    |
| **xpath**    | Uses an Xpath expression to extract all matching elements in the DOM. | xpath('//h1')                                                |
| **property** | Extracts a specific property from a list of DOM elements.    | css('h1').property('innerText')                              |
| **single**   | Returns only one value.                                      | css('h1').property('innerText').single()                     |
| **all**      | Returns all the values.                                      | css('h1').property('innerText').all()                        |
| **require**  | Throws an error if there are no values.                      | css('h1').property('innerText').single().require()           |
| **default**  | Returns the specified value if there are no values.          | css('h1').property('innerText').single().default('No name')  |
| **merge**    | Concatenates queries.                                        | merge([ select('div.main > img{src}'), select('div.carousel > img{src}') ]) |
| **elements** | Iterates a group of queries over different elements.         | elements('{div.reviews > li}*').iterate({<br />  author: 'span.author',<br/>}) |
| **options**  | Iterates each possible value of all options.                 | bundles: options({<br />  edition: '{select#edition}',<br/>  support: '{select#support}',<br/>}).iterate() |
| **pre**      | Executes actions before the extraction of the elements.      | pre(function loadAllImages(context) => ...).select('div.carousel > img{src}*') |
| **post**     | Executes actions after the extraction of the elements.       | select('h1').post(function removeScapeSequenceCharacter(pluginName) => ...) |
| **init**     | Executes actions once, before the execution of the Collector. | init(function loadAllImages() => ...).select('div.carousel > img{src}*') |

