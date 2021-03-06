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

/**
 * Perform actions before data extraction.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @example
 * ```
 * return await collector({
 *  name: pre(provideNewContext).css('h1').property('innerText')
 * }).call();
 * ```
 */
class Pre extends Selector {

    async execute(context) {
        Logger.debug('Pre', { context });

        if(!(context instanceof Context)) {
            Logger.error('Pre', 'The context is not an instance of Context class.');
        }

        let elements = this.getElement(context);

        return await this.definition(elements);
    }

    validateParameters() {
        if(typeof this.definition !== 'function') {
            Logger.error('Pre', `Constructor definition should be a function. Instead it received a ${typeof this.definition}.`);
        }
    }
}

export default Pre;