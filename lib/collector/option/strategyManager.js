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