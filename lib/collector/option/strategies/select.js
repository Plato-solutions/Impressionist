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
 * Knows how to get and set values from SELECT DOM elements.
 */
class SelectStrategy {
    
    /**
     * Extract a value that will be used to identify each option.
     * @param { string } identifier - Identifies the option values ​​referenced by the element in the DOM.
     * @param { Element } element - DOM element that contains one or more values.
     * @returns { Promise<Array> } Object that represents a promise for a list of objects.
     * 
     * @example <caption>Get options from a select element</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            console.log(await SelectStrategy.getOptions('edition', selectElement)); // [{ value: '10', edition: 'val-10' }, { value: '20', edition: 'val-20' }, { value: '30', edition: 'val-30' }]
        });
     * ```
     */
    static async getOptions(identifier, element) {

        let result = [];

        for(let option of element.options) {
            result.push({
                value: option.getAttribute('value'),
                [identifier]: option
            });
        }

        if(result.length === 0) {
            result = result.concat([ { value: null, [identifier]: null } ]);
        }
        
        return result;
    }

    /**
     * Select a specific option.
     * @param { Element } element - DOM element that contains one or more values. 
     * @param { string | object } value - Value that will be used to select a specific option.
     * @returns { Promise<void> } Object that represents a promise for the completion of a select action.
     * 
     * @example <caption>Set second option to a select element</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            await SelectStrategy.setOption(selectElement, '20');
            console.log(selectElement.value); // '20'
        });
     * ```
     */
    static async setOption(element, value) {
        
        if(value) {
            element.value = value;

            return element.dispatchEvent(
                new Event(
                    'change',
                    { bubbles: true }
                )
            );
        } else {
            return false;
        }
        
    }

    /**
     * Check if the particular strategy is suitable for a certain element of the DOM.
     * @param { Element } element - DOM element that contains one or more values. 
     * @returns { Promise<Boolean | Error> } Object that represents a promise for a TRUE or FALSE value.
     * 
     * @example <caption>Match a SELECT element</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#option-1');
            console.log(await SelectStrategy.match(selectElement)); // true
        });
     * ```
     */
    static match(element) {
        return element && !Array.isArray(element) && !NodeList.prototype.isPrototypeOf(element) && element?.tagName === 'SELECT' ? true : false;
    }
}

export default SelectStrategy;