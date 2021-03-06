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
 * Returns a default value if there the expected result is not valid.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @example
 * ```
 * return await collector({
 *  name: css('h0').property('innerText).default('Plugin')
 * })
 * 
 * // 'Plugin'
 * ```
 */
class Default extends Selector {

    async execute(context) {

        Logger.debug('Default', { context });

        if(!(context instanceof Context)) {
            Logger.error('Default', 'The context is not an instance of Context class.');
        }

        const result = this.getElement(context);
        Logger.debug('Default', { result });
        return ((result != null && result != undefined && !Array.isArray(result)) || (Array.isArray(result) ? result.length > 0 ? true : false : false)) ? result : this.definition;
    }

}

export default Default;