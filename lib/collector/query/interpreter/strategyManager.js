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


import StrategyManager from "../../strategyManager.js";
import TypeValidator from "../../typeValidator.js";

/**
 * Manage which interpretation strategy will process the custom selector.
 */
class InterpreterStrategyManager {
    /**
     * List of available strategies.
     */
    static #strategies = new Set();

    /**
     * Add a new strategy.
     * @param { object } strategy - A strategy that can process a custom selector.
     * 
     * @example
     * ```
        await page.evaluate(() => {
            InterpreterStrategyManager.add(InterpreterElementStrategy);
            InterpreterStrategyManager.add(InterpreterInnerTextStrategy);
            InterpreterStrategyManager.add(InterpreterPropertyStrategy);
        });
     * ```
     */
    static add(strategy) {
        InterpreterStrategyManager.#strategies.add(strategy);
    }

    /**
     * Search among the available strategies which of them is the most suitable
     * to process a specific selector.
     * @param { string } selector - Custom selector.
     * @returns { object } A strategy that can process the custom selector.
     * 
     * @example <caption>{h1} gets InterpreterElementStrategy</caption>
     * ```
        await page.evaluate(async () => { 
            const interpreter = InterpreterStrategyManager.lookUp('{h1}');
            console.log(interpreter === InterpreterElementStrategy ? true : false); // true
        });
     * ```
     */
    static lookUp(selector) {
        TypeValidator.deepCheck(selector, 'string');
        return StrategyManager.lookUp(selector, Array.from(InterpreterStrategyManager.#strategies));
    }
}

export default InterpreterStrategyManager;