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

import Selector from './selector.js';
import SelectorInterpreter from '../interpreter/selector.js';

/**
 * Interprets Select Strings.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @example
 * ```
 * return await collector({
 *  name: select('h1')
 * }).call();
 * ```
 */
class Select extends Selector {

    async execute(context) {

        Logger.debug('Select', { context });

        if(!(context instanceof Context)) {
            Logger.error('Select', 'The context is not an instance of Context class.');
        }

        try {
            return await new SelectorInterpreter(this.definition).call(context);
        } catch(e) {
            if (e.message.includes('Unable to interpret')) {
                throw e;
            } else {
                Logger.warn('Select', 'Select execution failed: ' + e.message);
                return [];
            }
        }
    }

}

export default Select;