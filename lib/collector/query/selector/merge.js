import Selector from "./selector.js";
import Context from "../../context.js";
import Logger from "../../logger.js";

/**
 * Contains the specific Selector that allows concatenating other query Selectors.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Concatenates query Selectors
 * 
 * @example <caption>Use Merge class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      media_gallery: merge([ css('div.product-thumb > img'), css('div.fotorama__nav__shaft img') ]).property('src').multiple()
 * });
 * ```
 * 
 * @extends Selector
 */
class Merge extends Selector {

    async execute(context) {

        Logger.debug('Merge', { context });

        if(!(context instanceof Context)) {
            Logger.error('Merge' ,'The context is not an instance of Context class.');
        }
        
        let result = [];
        
        for (let queryString of this.definition) {
            let queryResult = await queryString.call(context);
            result.push(queryResult);
        }

        return result.flat();
    }

    validateParameters() {
        if(!Array.isArray(this.definition)) {
            Logger.error('Merge' ,`Constructor definition should be an array. Instead it received a ${typeof this.definition}.`);
        }
    }

}

export default Merge;