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