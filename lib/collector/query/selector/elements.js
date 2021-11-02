import Selector from './selector.js';
import Logger from '../../logger.js';

class Elements extends Selector {

    async execute(context) {

        Logger.debug('Elements', { context });

        if(!(context instanceof Context)) {
            Logger.error('Elements', 'The context is not an instance of Context class.');
        }

        try {
            return await new ElementCollectorFactory(this.definition).call(context);
        } catch(e) {
            Logger.error('Elements', 'Collector execution failed: ', e.message);
        }
    }
}

export default Elements;