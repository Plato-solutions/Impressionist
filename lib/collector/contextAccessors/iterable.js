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


import Context from "../context.js";

/**
 * Iterates over each item in context created by a collection,
 * returning it to be collected upon.
 */
class IterableAccessor {

    /**
     * @param { Collection } collection - Collection instance that provides the new context.
     */
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * Create a generator to pass the new context.
     * @param { Context } context - Actual context object.
     * @returns { Promise<Generator> } An object that represents a promise
     * for a generator of context objects.
     * 
     * @example <caption>Receives a Collection and returns an iterable of Context objects</caption>
     * ```
        await page.evaluate( async () => {
                        
            const data = new IterableAccessor(
                new Collection({
                    reviews: () => Array.from(document.querySelectorAll('#reviews > ul > li'))
                }).postProcessor(CollectionElementProcessor)
            );

            const context = new Context();

            for await(let newContext of data.call(context)) {
                console.log(newContext); // Returns the li elements inside of a Context object.
            }
        });
     * ```
     */
    async * call(context) {
        const elements = await this.collection.call(context);
        const newContext = new Context();

        for await(const element of elements) {
            yield newContext.update(element);
        }
    }
}

export default IterableAccessor;