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

import Option from '../../option/option.js';

/**
 * Processes collected values into options.
 */
class CollectionOptionProcessor {

    /**
     * Returns all possible values ​​of the options that were passed to Collection.
     * @param { object } elementCollection - Result of running a elementCollection instance.
     * @returns { Promise<Array> } An object that represents a promise object
     * for all the possible values processed of each option.
     * 
     * @example <caption>Processing a series of options</caption>
     * ```
        const result = await page.evaluate(async () => {
                
            const options = {
                edition: document.querySelector('#option-1'),
                support: document.querySelector('#option-2')
            };

            const values = await CollectionOptionProcessor.call(options);

            let result = [];

            for await(let value of values) {
                console.log(value); // First Iteration: [{ value: '40', support: 'val-40' }, { value: '10', edition: 'val-10' }]
            }

        });
     * ```
     */
    static async call(elementCollection) {
        let result = [];

        for(let identifier in elementCollection) {
            result.push(
                new Option(identifier, elementCollection[identifier])
            );
        }

        return await CollectionOptionProcessor.#makeCombinations(result);
    }

    /**
     * It takes Option instances and calculates all possible values ​​of the
     * combinations of those options.
     * @param { Array } options - A list of the Option instances.
     * @returns { Promise<Array> } An object that represents a promise object
     * for all the possible values from a set of options.
     */
    static async #makeCombinations(options) {
        
        async function *optionsGenerator(option, optionIndex = 0, previousResult = []) {
            
            if(optionIndex !== 0) {
                previousResult = [...[option], ...previousResult] // Save previous iteration results
            }
            
            if(optionIndex < options.length) {

                for await (let element of options[optionIndex].call()) {
                    yield* optionsGenerator(element,  1 + optionIndex, previousResult); // Recursively get the following element in the array
                }

            } else {
                yield previousResult;
            }

        }

        return optionsGenerator(options);
    }

}

export default CollectionOptionProcessor;