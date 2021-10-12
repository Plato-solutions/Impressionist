import Selector from "./selector.js";

/**
 * Returns a default value if there the expected result is not valid.
 * @extends Selector
 */
class Default extends Selector {

    async execute(context) {
        const result = this.getElement(context);
        return ((result != null && result != undefined && !Array.isArray(result)) || (Array.isArray(result) ? result.length > 0 ? true : false : false)) ? result : this.definition;
    }

}

export default Default;