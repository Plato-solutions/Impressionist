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

/**
 * Iterate a Collector instance against a set of queries.
 */
class Iterate extends Selector {

    async execute(context) {

        if(!(context instanceof Context)) {
            Logger.error('Iterate', 'The context is not an instance of Context class.');
        }

        const { iteratorCollector, collectorContext } = this.getElement(context);

        if(!(iteratorCollector instanceof Collector)) {
            Logger.error('Iterate', 'Iterate did not received a Collector instance. Check that you are using elements or options Selectors.')
        }

        try {
            return await iteratorCollector.iterate(this.definition).call(collectorContext);
        } catch(e) {
            Logger.error('Iterate', 'Collector Iterate method execution failed: ' + e.message);
        }
    }

}

export default Iterate;