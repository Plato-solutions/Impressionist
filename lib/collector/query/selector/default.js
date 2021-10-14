import Selector from "./selector.js";
import Context from "../../context.js";
import Logger from "../../logger.js";

/**
 * Returns a default value if there the expected result is not valid.
 * @extends Selector
 */
class Default extends Selector {

    async execute(context) {

        Logger.debug('Default', { context });

        if(!(context instanceof Context)) {
            Logger.error('Default', 'The context is not an instance of Context class.');
        }

        const result = this.getElement(context);
        Logger.debug('Default', { result });
        return ((result != null && result != undefined && !Array.isArray(result)) || (Array.isArray(result) ? result.length > 0 ? true : false : false)) ? result : this.definition;
    }

}

export default Default;