import Selector from "./selector.js";

/**
 * Returns a default value if there the expected result is not valid.
 * @extends Selector
 */
class Default extends Selector {

    async execute(context) {
        const result = this.getElement(context);
        return result.length > 0 ? result : this.definition;
    }

}

export default Default;