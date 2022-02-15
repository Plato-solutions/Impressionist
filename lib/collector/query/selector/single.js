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
 * return await collector({
 *  name: css('.overview > h1').property('innerText').single()
 * }).call();
 * ```
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