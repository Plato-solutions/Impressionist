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
import CollectionElementProcessor from '../collection/processors/element.js';
import SelectorInterpreter from '../query/interpreter/selector.js';
import Query from '../query/query.js';

/**
 * Shortcut to create Collector that returns a NodeList of DOM elements.
 */
class ElementCollectorFactory {
    /**
     * @param { function | Object | Query | string } query - A callabel object.
     * @returns { Collector } A new instance of Collector.
     */
    constructor(query) {
        this.query = query;
        return this.#createCollector();
    }

    /**
     * Creates a new instance of Collector.
     * @returns { Collector } A new instance of Collector.
     */
    #createCollector() {
        let query = this.query;
        
        if(typeof this.query === 'string') {
            query = new SelectorInterpreter(query).default([]);
        }
        
        if(this.query instanceof Query) {
            query = query.default([]);
        }

        return new Collector(
            new Collection({
                elements: query
            }).postProcessor(CollectionElementProcessor)
        );
    }

}

export default ElementCollectorFactory;