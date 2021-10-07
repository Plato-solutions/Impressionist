import Collector from '../collector.js';
import Collection from '../collection/collection.js';
import CollectionElementProcessor from '../collection/processors/element.js';

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
        return new Collector(
            new Collection({
                elements: this.query
            }).postProcessor(CollectionElementProcessor)
        );
    }

}

export default ElementCollectorFactory;