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