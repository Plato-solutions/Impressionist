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