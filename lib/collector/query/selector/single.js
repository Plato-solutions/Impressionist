import Selector from "./selector.js";
import Context from "../../context.js";
import Logger from "../../logger.js";

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

        Logger.debug('Single', { context });
        
        if(!(context instanceof Context)) {
            Logger.error('Single', 'The context is not an instance of Context class.');
        }

        let elements = this.getElement(context);

        if(!Array.isArray(elements)) {
            elements = [elements];
        }
        
        if(elements.length > 1) {
            Logger.error('Single', 'There are more than one element that matched the Query definition.');
        }
        
        return elements[0] || [];
    }

}

export default Single;