import Css from "../../selector/css.js";

/**
 * Returns a Query chain to extract a property of a DOM element.
 */
 class InterpreterPropertyStrategy {

    /**
     * Interpret a incoming selector in order to create a chain of query selectors.
     * @param { string } selector - A custom selector that represents a DOM element.
     * @returns { Query } Query instance that will return a property of a DOM element.
     * 
     * @example <caption>Interpret 'h1{outerHTML}'</caption>
     * ```
        await page.evaluate(async () => { 
            const query = InterpreterPropertyStrategy.interpret('h1{outerHTML}');
            const context = new Context();

            const result = await query.call(context);
            console.log(result); // <h1>Plato Plugin</h1>
        });
     * ```
     */
    static interpret(selector) {
        const [original, elementSelector, property] = selector.match(/(^[\w\W]+){([\w\W]+)}/);
        const normalizedElementSelector = elementSelector.replace('::document > ', '');
        return (normalizedElementSelector.startsWith('::item') ? new Pre((element) => [element]) : new Css(normalizedElementSelector).setGetElement(elementSelector.startsWith('::document')?new Context():undefined)).property(property)[selector.endsWith('*')?'all':'single']();
    }

    /**
     * Determine if the specific strategy can process the custom selector.
     * @param { string } selector - A custom selector that represents a DOM element.
     * @returns { Boolean }
     * 
     * @example
     * ```
        await page.evaluate(async () => { 
            const result = InterpreterPropertyStrategy.match('h1{outerHTML}');
            console.log(result); // true
        });
     * ```
     */
    static match(selector) {
        return !selector.startsWith('{') && selector.includes('{') && ( selector.endsWith('}') || selector.endsWith('}*') ) && !selector.includes('+');
    }

}

export default InterpreterPropertyStrategy;