/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

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
 * return await collector({
 *      media_gallery: merge([ select('div.product-thumb > img{src}*'), css('div.fotorama__nav__shaft img{src}*') ])
 * }).call();
 * ```
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