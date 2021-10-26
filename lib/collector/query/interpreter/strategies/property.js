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
        const propertySubstring = selector.match(/{([\s\S]+)}/)[1];
        const properties = InterpreterPropertyStrategy.#getProperties(propertySubstring);

        const elementSelector = selector.replace(`{${propertySubstring}}`, '').replace('*', '');
        const normalizedElementSelector = elementSelector.replace('::document > ', '');
    
        let selectorQuery = (normalizedElementSelector.startsWith('::item') ? new Pre((element) => [element]) : new Css(normalizedElementSelector).setGetElement(elementSelector.startsWith('::document')?new Context():undefined));

        for(const property of properties) {
            selectorQuery = selectorQuery.property(property);
        }

        return selectorQuery[selector.endsWith('*')?'all':'single']();
    }

    static #getProperties(query) {
        let result = [];
  
        function helper(query) {
            const subQuery = query.match(/{([\s\S]+)}/)?.[1] || null;
            const property = query?.replace(`{${subQuery}}`, '');
            
            result.push(property);
            
            if(subQuery) {
                helper(subQuery);
            }
            
        }
        
        helper(query);
        
        return result;
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