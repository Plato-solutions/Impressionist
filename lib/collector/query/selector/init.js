import Logger from "../../logger.js";
import Selector from "./selector.js";

/**
 * Perform actions during initialization.
 * 
 * @example <caption></caption>
 * ```
 * ```
 * 
 * @extends Selector
 */
class Init extends Selector {

    async execute(context) {
        Logger.debug('Init', { context });

        if(!(context instanceof Context)) {
            Logger.error('Init', 'The context is not an instance of Context class.');
        }

        return this.getElement(context); // By pass the Context element.

    }

    static register() {

        const constructionHandler = {
            construct(initClass, args) {
                const initialFunction = args[0];

                if(typeof initialFunction !== 'function') {
                    Logger.error('Init', `Constructor definition should be a function. Instead it received a ${typeof initialFunction}.`);
                }
                
                try {
                    initialFunction();
                } catch (e) {
                    Logger.error('InitialFunction', e.message);
                }

                return new initClass(...args);
            }
        };

        const proxyInit = new Proxy(this, constructionHandler);
        SelectorDirectory.register(proxyInit);
    }

}

export default Init;