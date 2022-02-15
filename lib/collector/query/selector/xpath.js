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
 * Contains specific logic to extract elements from the DOM using a xpath selector.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Extracts Dom Elements.
 * 
 * @example <caption>Use Xpath class through its function proxy to build a query chain.</caption>
 * ```
 * return await collector({
 *  name: xpath('//h1').property('innerText').multiple()
 * });
 * ```
 * 
 * @extends Selector
 */
class Xpath extends Selector {

    async execute(context) {

        Logger.debug('Xpath', { context });

        if(!(context instanceof Context)) {
            Logger.error('Xpath', 'The context is not an instance of Context class.');
        }
        
        const node = this.getElement(context);

        const xpathElements = document.evaluate(this.definition, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        let result = [];
        
        for(let i = 0; i < xpathElements.snapshotLength; i++) {
            result.push(xpathElements.snapshotItem(i));
        }

        if(result.length === 0 && this.alternatives.length > 0) {
            Logger.warn('Xpath', { selector: this.definition }, 'Non Element matched the Xpath string. Instead, executing an alternative.');
            result = this.executeAlternatives(context);
        }

        Logger.debug('Xpath', { result });

        return result;
    }

    validateParameters() {
        if(typeof this.definition !== 'string') {
            Logger.error('Xpath', `Constructor definition should be a string. Instead it received a ${typeof this.definition}.`);
        }
    }

}

export default Xpath;