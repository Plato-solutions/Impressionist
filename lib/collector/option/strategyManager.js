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


import StrategyManager from "../strategyManager.js";
import MissingStrategy from "./strategies/missing.js";

/**
 * Manage the OptionStrategies.
 */
class OptionStrategyManager {

    /**
     * Option strategies.
     */
    static #strategies = new Set([MissingStrategy]);
    
    /**
     * Add or register a OptionStrategy sub-class.
     * @param { OptionStrategy } strategy - A specific implementation/sub-class of OptionStrategy.
     * 
     * @example
     * ```
     * OptionStrategyManager.add(SelectStrategy);
     * ```
     */
    static add(strategy) {
        OptionStrategyManager.#strategies.add(strategy);
    }
    
    /**
     * Search or look up the best strategy.
     * @param { Element | Array<Element>} element - DOM element that represents or has options.
     * @returns { Promise<OptionStrategy> } Object that represents a promise to return a sub-class of OptionStrategy.
     * 
     * @example <caption>SelectStrategy matched</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            const strategy = await OptionStrategyManager.lookUp(selectElement);

            console.log(strategy === SelectStrategy); // true
        });
     * ```
     */
    static async lookUp(element) {
        return StrategyManager.lookUp(element, Array.from(OptionStrategyManager.#strategies));
    }

}

export default OptionStrategyManager;