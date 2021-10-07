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