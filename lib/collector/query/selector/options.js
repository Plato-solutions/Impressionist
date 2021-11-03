import Selector from './selector.js';
import Logger from '../../logger.js';

class Options extends Selector {

    async execute(context) {

        Logger.debug('Options', { context });

        if(!(context instanceof Context)) {
            Logger.error('Options', 'The context is not an instance of Context class.');
        }

        try {
            const iteratorCollector = new OptionCollectorFactory(this.definition);
            return { iteratorCollector, collectorContext: context };
        } catch(e) {
            Logger.error('Options', 'Collector execution failed: ', e.message);
        }
    }

}

export default Options;