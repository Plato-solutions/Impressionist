import Selector from "./selector.js";

class Pre extends Selector {

    async execute(context) {
        Logger.debug('Pre', { context });

        if(!(context instanceof Context)) {
            Logger.error('Pre', 'The context is not an instance of Context class.');
        }

        let elements = this.getElement(context);

        return await this.definition(elements);
    }

    validateParameters() {
        if(typeof this.definition !== 'function') {
            Logger.error('Pre', `Constructor definition should be a function. Instead it received a ${typeof this.definition}.`);
        }
    }
}

export default Pre;