import Selector from './selector.js';
import SelectorInterpreter from '../interpreter/selector.js';

class Select extends Selector {

    async execute(context) {

        Logger.debug('Select', { context });

        if(!(context instanceof Context)) {
            Logger.error('Select', 'The context is not an instance of Context class.');
        }

        try {
            return await new SelectorInterpreter(this.definition).call(context);
        } catch(e) {
            Logger.error('Select', 'Select execution failed: ', e.message);
        }
    }

}

export default Select;