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

        return OptionCollectorFactory.#addIterationQueries(optionCollector, options);
        
    }

    static #addDefaultOptions(options) {
        let result = options;

        for(let option in options) {
            
            let query = options[option];

            if(typeof query === 'string') {
                result[option] = new SelectorInterpreter(query).default(null);
            }
            
            if(query instanceof Query) {
                query = query.default(null);
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

        return collector;

    }
}

export default OptionCollectorFactory;