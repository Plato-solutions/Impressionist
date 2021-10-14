import Selector from "./selector.js";
import Context from "../../context.js";

/**
 * Contains the specific Selector to check if a single element is expected
 * as it turns out, otherwise throw an error.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Check for a single result of the previous Selector.
 * 
 * @example <caption>Use Single class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      name: css('.overview > h1').property('innerText').single()
 * });
 * ```
 * 
 * @extends Selector
 */
class Single extends Selector {

    async execute(context) {

        if(!(context instanceof Context)) {
            throw new Error('Single - The context is not an instance of Context class.');
        }

        const elementList = this.getElement(context);
        
        if(elementList.length > 1) {
            throw new Error('There are more than one element that matched the Query definition.');
        }
        
        return elementList[0] || [];
    }

}

export default Single;