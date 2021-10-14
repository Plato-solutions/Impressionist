import Selector from "./selector.js";
import Context from "../../context.js";

/**
 * Contains the specific Selector to obtain properties of DOM elements.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Obtain properties.
 * 
 * @example <caption>Use Property class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      name: css('.overview > h1').property('innerText').single()
 * });
 * ```
 * 
 * @extends Selector
 */
class Property extends Selector {

    async execute(context) {

        if(!(context instanceof Context)) {
            throw new Error('Property - The context is not an instance of Context class.');
        }

        let elements = this.getElement(context);
        let result = [];

        if(!Array.isArray(elements)) {
            elements = [elements];
        }
        
        for(let element of elements) {
            result.push(element?.[this.definition]);
        }
        
        result = result.filter(el => el);
        
        if(result.length === 0 && this.alternatives.length > 0) {
            result = this.executeAlternatives(context);
        }

        return result;
    }

    validateParameters() {
        if(typeof this.definition !== 'string') {
            throw new Error(`Property - Constructor definition should be a string. Instead it received a ${typeof this.definition}.`);
        }
    }
}

export default Property;