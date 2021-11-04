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


import Collection from "../collection/collection.js";
import Collector from "../collector.js";
import { CollectionElementProcessor, IterableAccessor } from "../index.js";

/**
 * Shortcut to create Collector that collects a collection for each iterable item in the context.
 */
class CollectionCollectorFactory {
    /**
     * @param { Collector } collector - Collector instance.
     * @param { object } collection - Object that has a series on queries.
     * @returns { Collector } A Collector instance.
     */
    constructor(collector, collection) {
        this.collector = collector;
        this.collection = collection;
        return this.#createCollector();
    }

    /**
     * Provides a new instance of the Collector to collect a collection of queries.
     * @returns { Collector }
     */
    #createCollector() {
        return new Collector(
            new IterableAccessor(
                new Collection({
                    objects: this.collector
                }).postProcessor(CollectionElementProcessor)
            ),
            new Collection(this.collection)
        );
    }
}

export default CollectionCollectorFactory;