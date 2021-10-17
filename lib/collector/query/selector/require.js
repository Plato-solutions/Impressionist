import Selector from "./selector.js";
import Context from "../../context.js";
import Logger from "../../logger.js";

/**
 * Returns an error if the result is not a valid value.
 * @extends Selector
 */
class Require extends Selector {

    async execute(context) {

        Logger.debug('Require', { context });

        if(!(context instanceof Context)) {
            Logger.error('Require', 'The context is not an instance of Context class.');
        }

        const result = this.getElement(context);
        
        if(Array.isArray(result) && result.length === 0) {
            Logger.error('Require', 'Query execution failed. Please check the chain or the selector.');
        }

        return result;
    }

}

export default Require;