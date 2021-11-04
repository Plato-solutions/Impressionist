/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


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
        const properties = InterpreterPropertyStrategy.#splitProperties(propertySubstring);

        const elementSelector = selector.replace(`{${propertySubstring}}`, '').replace('*', '');
        const normalizedElementSelector = elementSelector.replace('::document > ', '');
    
        let selectorQuery = (normalizedElementSelector.startsWith('::item') ? new Pre((element) => [element]) : new Css(normalizedElementSelector).setGetElement(elementSelector.startsWith('::document')?new Context():undefined));

        for(const property of properties) {
            selectorQuery = selectorQuery.property(property);
        }

        return selectorQuery[selector.endsWith('*')?'all':'single']();
    }

    /**
     * Split all the properties present in a chain of nested properties.
     * @param { string } propertyChain - Nested properties.
     * @returns { Array<string> } Lis of properties.
     */
    static #splitProperties(propertyChain) {
        let result = [];
  
        function helper(chain) {
            const propertySubstring = chain.match(/{([\s\S]+)}/)?.[1] || null;
            const property = chain?.replace(`{${propertySubstring}}`, '');
            
            result.push(property);
            
            if(propertySubstring) {
                helper(propertySubstring);
            }
            
        }
        
        helper(propertyChain);
        
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
        return !selector.startsWith('{') && selector.includes('{') && ( selector.endsWith('}') || selector.endsWith('}*') );
    }

}

export default InterpreterPropertyStrategy;