import Selector from "./selector.js";
import TypeValidator from '../../typeValidator.js';
import { SelectorError } from '../../errors.js';

/**
 * Contains specific logic to extract elements from the DOM using a CSS selector.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Extracts Dom Elements.
 * 
 * @example <caption>Use Css class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      name: css('.overview > h1').property('innerText').single()
 * });
 * ```
 * 
 * @extends Selector
 */
class Css extends Selector {

    async execute(context) {
        
        TypeValidator.check(this.definition, 'string');

        const node = this.getElement(context);
            
        let result = Array.from(node.querySelectorAll(this.definition));
        
        if(result.length === 0 && this.alternatives.length > 0) {
            result = this.executeAlternatives(context);
        }
        
        return result;
    }

}

export default Css;