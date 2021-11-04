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


import Collector from '../../collector.js';
import Collection from '../../collection/collection.js';
import Selector from "./selector.js";
import Context from "../../context.js";
import { CollectionElementProcessor, IterableAccessor } from '../../index.js';
import Logger from '../../logger.js';

/**
 * Contains the specific logic to process nested structures. In case no parameter is passed
 * to its constructor then it will return the previous result in the execution of the chain.
 * 
 * The class itself is not open to developer use, but rather is used by a proxy function to
 * build the instance. See the example for more information.
 * 
 * @summary Process nested structures.
 * 
 * @example <caption>Use All class through its function proxy to build a query chain and execute an internal structure.</caption>
 * ```
 * const data = new Collectable({
 *      links: css('div.container > div:nth-child(2) > div.col-md-2.f-col > div:nth-child(2) > a').all({
 *          label: property('innerText').single()
 *      })
 * });
 * ```
 * @example <caption>Use all class through its function proxy to build a query chain.</caption>
 * ```
 * const data = new Collectable({
 *      media_gallery: merge([
 *          css('div.product-thumb > img'),
 *          css('div.fotorama__nav__shaft img')
 *      ])
 *      .property('src')
 *      .all() // Because any structure is passed to its constructor returns the previous result
 * });
 * ```
 * 
 * @extends Selector
 */
class All extends Selector {

    async execute(context) {
        
        Logger.debug('All', { context });

        if(!(context instanceof Context)) {
            Logger.error('All', 'The context is not an instance of Context class.');
        }

        let result = this.getElement(context);

        // Check if there are constructor parameters
        if(this.definition && typeof this.definition !== 'function') {
            result = await this.executeCollector(context);
        }

        return result;
    }

    /**
     * Execute the definition inside a loop created by the NodeIterator instance.
     * 
     * @private
     * 
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * 
     * @returns { Promise<object[]> } Promise object that represents the result of a NodeIterator instance.
     */
    async executeCollector(context) {

        const data = new Collector(
            new IterableAccessor(
                new Collection({
                    elements: context.getElement
                }).postProcessor(CollectionElementProcessor)
            ),
            new Collection(this.definition)
        );

        return await data.call(context);
    }

    validateParameters() {
        const definition = this.definition?.constructor;
        if(!(definition === Object ^ definition === undefined)) {
            Logger.error('All', `Constructor definition should be an object or empty. Instead it received a ${typeof this.definition}.`);
        }
    }
}

export default All;