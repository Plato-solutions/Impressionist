/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import Logger from "../../logger.js";
import Selector from "./selector.js";

/**
 * Perform actions during initialization.
 * @extends Selector
 */
class Init extends Selector {

    async execute(context) {
        Logger.debug('Init', { context });

        if(!(context instanceof Context)) {
            Logger.error('Init', 'The context is not an instance of Context class.');
        }

        return this.getElement(context); // By pass the Context element.

    }

    /**
     * Modifies the record to be made in the SelectorDirectory class.
     */
    static register() {

        const constructionHandler = {
            construct(initClass, args) {
                const initialFunction = args[0];

                if(typeof initialFunction !== 'function') {
                    Logger.error('Init', `Constructor definition should be a function. Instead it received a ${typeof initialFunction}.`);
                }
                
                try {
                    initialFunction();
                } catch (e) {
                    Logger.debug('InitialFunction - Error: ', e.message);
                }

                return new initClass(...args);
            }
        };

        const proxyInit = new Proxy(this, constructionHandler);
        SelectorDirectory.register(proxyInit);
    }

}

export default Init;