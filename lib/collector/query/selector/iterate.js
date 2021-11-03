import Selector from './selector.js';

class Iterate extends Selector {

    async execute(context) {

        Logger.debug('Iterate', { context });

        if(!(context instanceof Context)) {
            Logger.error('Iterate', 'The context is not an instance of Context class.');
        }

        const { iteratorCollector, collectorContext } = this.getElement(context);

        try {
            return await iteratorCollector.iterate(this.definition).call(collectorContext);
        } catch(e) {
            Logger.error('Iterate', 'Collector Iterate method execution failed: ', e.message);
        }
    }

}

export default Iterate;