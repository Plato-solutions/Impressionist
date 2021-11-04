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


import Collector from '../collector.js';
import Collection from '../collection/collection.js';
import CollectionOptionProcessor from "../collection/processors/option.js";
import Query from "../query/query.js";
import SelectorInterpreter from '../query/interpreter/selector.js';

/**
 * Shortcut to create Collector that returns an Option.
 */
class OptionCollectorFactory {

    /**
     * @param { object } options - A series of options.
     * @returns { Collector } A Collector instance.
     */
    constructor(options) {
        this.options = options;
        return this.#createCollector();
    }

    /**
     * Provide a Collector instance.
     * @returns { Collector } A Collector instance.
     */
    #createCollector() {
        
        const options = OptionCollectorFactory.#addDefaultOptions(this.options);

        const optionCollector = new Collector(
            new Collection(
                options
            ).postProcessor(CollectionOptionProcessor)
        );

        OptionCollectorFactory.#addIterationQueries(optionCollector, options);

        return optionCollector;
        
    }

    static #addDefaultOptions(options) {
        let result = {};

        for(let option in options) {
            
            let query = options[option];
            
            if(typeof query === 'string') {
                Object.assign(result, { [option]: new SelectorInterpreter(query).default(null) });
            } else if(query instanceof Query) {
                Object.assign(result, { [option]: query.default(null) });
            } else {
                Object.assign(result, { [option]: query });
            }

        }

        return result;
        
    }

    static #addIterationQueries(collector, options) {
        
        for(const identifier in options) {
            const query = { [identifier]: function getOptionValue() {
                    return this.getElement().map(option => option[identifier]).filter(el => el)[0];
                }
            };

            Object.assign(collector.iterationQuery, query);
        }

    }
}

export default OptionCollectorFactory;