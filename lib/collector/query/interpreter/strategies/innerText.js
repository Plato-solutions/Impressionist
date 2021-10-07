import Css from "../../selector/css.js";

/**
 * Returns a Query chain to extract the innerText property of a DOM element.
 */
 class InterpreterInnerTextStrategy {

    /**
     * Interpret a incoming selector in order to create a chain of query selectors.
     * @param { string } selector - A selector that represents a DOM element.
     * @returns { Query } Query instance that will return the innerText of a DOM element. 
     * 
     * @example <caption>Interpret 'h1'</caption>
     * ```
        await page.evaluate(async () => { 
            const query = InterpreterInnerTextStrategy.interpret('h1');
            const context = new Context();

            const result = await query.call(context);
            console.log(result); // 'Plato Plugin'
        });
     * ```
     */
    static interpret(selector) {
        const elementSelector = selector.replace('*', '').replace('document > ', '');
        return new Css(elementSelector).setGetElement(selector.startsWith('document')?new Context():undefined).property('innerText')[selector.endsWith('*')?'all':'single']();
    }

    /**
     * Determine if the specific strategy can process the custom selector.
     * @param { string } selector - A selector that represents a DOM element.
     * @returns { Boolean }
     * 
     * @example
     * ```
        await page.evaluate(async () => { 
            const result = InterpreterInnerTextStrategy.match('h1');
            console.log(result); // true
        });
     * ```
     */
    static match(selector) {
        return !selector.includes('{') && !selector.includes('{') && !selector.includes('+');
    }

}

export default InterpreterInnerTextStrategy;