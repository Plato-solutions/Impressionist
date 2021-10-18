import Selector from "./selector.js";
import Context from "../../context.js";

class Post extends Selector {

    async execute(context) {
        Logger.debug('Post', { context });

        if(!(context instanceof Context)) {
            Logger.error('Post', 'The context is not an instance of Context class.');
        }

        let elements = this.getElement(context);

        return await this.definition(elements);
    }

    validateParameters() {
        if(typeof this.definition !== 'function') {
            Logger.error('Post', `Constructor definition should be a function. Instead it received a ${typeof this.definition}.`);
        }
    }
}

export default Post;