import Selector from "./selector.js";

/**
 * Returns an error if the result is not a valid value.
 * @extends Selector
 */
class Require extends Selector {

    async execute(context) {
        const result = this.getElement(context);
        
        if(Array.isArray(result) && result.length === 0) {
            throw new Error('Query execution failed. Please check the chain or the selector.');
        }

        return result;
    }

}

export default Require;