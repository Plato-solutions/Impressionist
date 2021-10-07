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