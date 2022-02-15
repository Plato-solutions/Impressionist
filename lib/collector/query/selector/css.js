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
 * Contains specific logic to extract elements from the DOM using a CSS selector.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Extracts Dom Elements.
 * 
 * @example <caption>Use Css class through its function proxy to build a query chain.</caption>
 * ```
 * return await Collectable({
 *      name: css('.overview > h1').property('innerText').single()
 * }).call();
 * ```
 */
class Css extends Selector {

    async execute(context) {

        const selector = this.definition;

        Logger.debug('Css', { selector, context });

        if(!(context instanceof Context)) {
            Logger.error('Css', 'The context is not an instance of Context class.');
        }

        const node = this.getElement(context);
            
        let result = Array.from(node.querySelectorAll(selector));
        
        if(result.length === 0) {
            Logger.warn('Css', { selector }, 'Non Element matched the Css selector ' + selector);
            if(this.alternatives.length > 0) {
                Logger.info('Css', {}, 'Executing an alternative.')
                result = this.executeAlternatives(context);
            }
        }

        return result;
    }

    validateParameters() {
        if(typeof this.definition !== 'string') {
            Logger.error('Css', `Constructor definition should be a string. Instead it received a ${typeof this.definition}.`);
        }
    }

}

export default Css;