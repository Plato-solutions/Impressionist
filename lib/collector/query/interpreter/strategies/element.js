import Css from "../../selector/css.js";
import Query from "../../query.js";

/**
 * Returns a Query chain to extract an element from the DOM.
 */
class InterpreterElementStrategy {

    /**
     * Interpret a incoming selector in order to create a chain of query selectors.
     * @param { string } selector - A custom selector that represents a DOM element.
     * @returns { Query } Query instance that will return a DOM element.
     * 
     * @example <caption>Interpret '{h1}'</caption>
     * ```
        await page.evaluate(async () => { 
            const query = InterpreterElementStrategy.interpret('{h1}');
            const context = new Context();

            const result = await query.call(context);
            console.log(result); // h1
        });
     * ```
     */
    static interpret(selector) {
        const elementSelector = selector.match(/{([\w\W]+)}/)[1].replace('::document > ', '');
        return new Css(elementSelector).setGetElement(elementSelector.startsWith('::document')?new Context():undefined)[selector.endsWith('*')?'all':'single']();
    }

    /**
     * Determine if the specific strategy can process the custom selector.
     * @param { string } selector - A custom selector that represents a DOM element.
     * @returns { Boolean }
     * 
     * @example
     * ```
        await page.evaluate(async () => { 
            const result = InterpreterElementStrategy.match('{h1}');
            console.log(result); // true
        });
     * ```
     */
    static match(selector) {
        return selector.startsWith('{') && ( selector.endsWith('}') || selector.endsWith('}*') );
    }

}

export default InterpreterElementStrategy;