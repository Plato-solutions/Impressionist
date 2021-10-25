import Merge from "../../selector/merge.js";
import SelectorInterpreter from "../selector.js";

/**
 * Returns a Query chain to extract the innerText property of a DOM element.
 */
 class InterpreterMergeStrategy {

    /**
     * Interpret a incoming selector in order to create a chain of query selectors.
     * @param { string } selector - A selector that represents a DOM element.
     * @returns { Query } Query instance that will return the innerText of a DOM element. 
     * 
     * @example <caption>Interpret 'h1'</caption>
     * ```
        await page.evaluate(async () => { 
            const query = InterpreterMergeStrategy.interpret('h1');
            const context = new Context();

            const result = await query.call(context);
            console.log(result); // 'Plato Plugin'
        });
     * ```
     */
    static interpret(selector) {
        const queries = selector.split(' + ');
        return new Merge(queries.map(query => new SelectorInterpreter(query))).all();
    }

    /**
     * Determine if the specific strategy can process the custom selector.
     * @param { string } selector - A selector that represents a DOM element.
     * @returns { Boolean }
     * 
     * @example
     * ```
        await page.evaluate(async () => { 
            const result = InterpreterMergeStrategy.match('h1');
            console.log(result); // true
        });
     * ```
     */
    static match(selector) {
        return !selector.startsWith('+') && !selector.endsWith('+') && selector.includes('+');
    }

}

export default InterpreterMergeStrategy;