import Query from "../query/query.js";
import ElementCollectorFactory from "../factory/element.js";
import SelectorDirectory from "../query/selector/directory.js";

class ElementsCollectorProxy {

    constructor(definition, query = new Query) {
        this.collector = new ElementCollectorFactory(definition);

        this.query = query;

        return new Proxy(this.collector, ElementsCollectorProxy);
    }

    async execute(context) {
        return this.collector.call(context);
    }

    static get(target, props) {

        if(props === 'iterate') {
            target[props] = function(definition) {
                return target.collector.iterate(definition, target.query);
            }
        }

        if(!target[props]) {
            target[prop] = function(definition) {

                target.query.add({
                    implementation: target,
                    next: null
                });

                // Create the intance of the functionality
                const selector = SelectorDirectory.get(prop);
                const queryInstance = new selector(definition, this.query);
                // Return the new Selector so new queries can be added in chain.
                return queryInstance;
            }
        }

        return target[props];
    }

    /**
     * Register in the Query directory.
     */
     static register() {
        SelectorDirectory.register(this);
    }
}

export default ElementsCollectorProxy;