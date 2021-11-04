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

import InterpreterStrategyManager from './strategyManager.js';

/**
 * Creates a query chain from a custom selector.
 * 
 * @example
 * ```
    SelectorDirectory.register(SelectorInterpreter);
    await page.evaluate(async () => { 
    
        const data = ( function () {

            const select = SelectorDirectory.get('selectorinterpreter');

            return new Collection({
                name: select('h1')
            });
            
        } )();
        
        const context = new Context();
        console.log(await data.call(context)); // Plato Plugin
    });
 * ```
 */
class SelectorInterpreter {
    
    /**
     * @param { string } selector - A custom selector.
     * @returns { Query } A query instance.
     */
    constructor(selector) {
        return InterpreterStrategyManager.lookUp(selector).interpret(selector);
    }

}

export default SelectorInterpreter;