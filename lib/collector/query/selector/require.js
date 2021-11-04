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


import Selector from "./selector.js";
import Context from "../../context.js";
import Logger from "../../logger.js";

/**
 * Returns an error if the result is not a valid value.
 * @extends Selector
 */
class Require extends Selector {

    async execute(context) {

        Logger.debug('Require', { context });

        if(!(context instanceof Context)) {
            Logger.error('Require', 'The context is not an instance of Context class.');
        }

        const result = this.getElement(context);
        
        if(Array.isArray(result) && result.length === 0) {
            Logger.error('Require', 'Query execution failed. Please check the chain or the selector.');
        }

        return result;
    }

}

export default Require;