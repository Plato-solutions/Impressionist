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

/**
 * Converts collection into a generator of elements.
 */
class CollectionElementProcessor {

    /**
     * Execute the processor.
     * @param { object } elementCollection - A serie of DOM elements or generator.
     * @returns { Generator<Element | any> } A generator with DOM elements.
     * 
     * @example <caption>Receives a collection with a list of DOM elements an returns an array with elements</caption>
     * ```
     * const result = await page.evaluate(() => {
     *      const elements = { reviews: Array.from(document.querySelectorAll('#reviews > ul > li')) };
     *      const data = CollectionElementProcessor.call(elements);
     *      console.log(data); // [li, li]
     * });
     * ```
     */
    static call(elementCollection) {
        // TODO: Check if elementCollection is an array.
        const elements = Object.values(elementCollection).flat()
        
        if(CollectionElementProcessor.#checkIfGenerator(elements[0])) {
            return elements[0];
        } else {
            return CollectionElementProcessor.#createGenerator(elements);
        }
        
    }

    static #checkIfGenerator(element) {
        // TODO: Find a better way to know if it is a generator.
        return !(element instanceof Element || element instanceof Document) && typeof element === 'object';
    }

    static * #createGenerator(elements) {
        for(let element of elements) {
            yield element;
        }
    }

}

export default CollectionElementProcessor;