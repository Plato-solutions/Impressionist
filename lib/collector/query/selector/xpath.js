import Selector from "./selector.js";

/**
 * Contains specific logic to extract elements from the DOM using a xpath selector.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Extracts Dom Elements.
 * 
 * @example <caption>Use Xpath class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      name: xpath('//h1').property('innerText').multiple()
 * });
 * ```
 * 
 * @extends Selector
 */
class Xpath extends Selector {

    async execute(context) {
        
        const node = this.getElement(context);

        const xpathElements = document.evaluate(this.definition, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        let result = [];
        
        for(let i = 0; i < xpathElements.snapshotLength; i++) {
            result.push(xpathElements.snapshotItem(i));
        }

        if(result.length === 0 && this.alternatives.length > 0) {
            result = this.executeAlternatives(context);
        }

        return result;
    }

}

export default Xpath;