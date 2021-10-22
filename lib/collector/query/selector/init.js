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
            construct(target, args) {
                const [func] = args;
                func();
                return new target(...args);
            }
        };

        const proxyInit = new Proxy(this, constructionHandler);

        SelectorDirectory.register(proxyInit);
    }

}

export default Init;