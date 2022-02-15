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
import Logger from '../../logger.js';
import Context from '../../context.js';

/**
 * Creates a collector that will return a generator of a list of option values.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @example
 * ```
 * return await collector({
 *  bundles: options({
 *      version: 'div...',
 *      installation: 'div...',
 *      support: '...'
 *  })
 *  .iterate({
 *      price: '::document > span.price'
 *  })
 * }).call();
 * ```
 */
class Options extends Selector {

    async execute(context) {

        Logger.debug('Options', { context });

        if(!(context instanceof Context)) {
            Logger.error('Options', 'The context is not an instance of Context class.');
        }

        try {
            const iteratorCollector = new OptionCollectorFactory(this.definition);
            return { iteratorCollector, collectorContext: context };
        } catch(e) {
            Logger.error('Options', 'Collector execution failed: ' + e.message);
        }
    }

}

export default Options;