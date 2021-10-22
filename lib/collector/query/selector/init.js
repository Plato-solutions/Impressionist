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

}

export default Init;