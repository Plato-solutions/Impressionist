import Collector from '../collector.js';
import Collection from '../collection/collection.js';
import CollectionOptionProcessor from "../collection/processors/option.js";

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
        const optionCollector = new Collector(
            new Collection(
                this.options //TODO: Use select() if query === string to concatenate default(null);
            ).postProcessor(CollectionOptionProcessor)
        );

        for(const identifier in this.options) {
            const query = { [identifier]: function getOptionValue() {
                    return this.getElement().map(option => option[identifier]).filter(el => el)[0];
                }
            };

            Object.assign(optionCollector.iterationQuery, query);
        }

        return optionCollector;
    }
}

export default OptionCollectorFactory;