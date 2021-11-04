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
 * Knows how to get and set values from an element with two states: TRUE/FALSE.
 */
class ToogleStrategy {
    
    /**
     * Extract a value that will be used to identify each option.
     * @param { string } identifier - Identifies the option values ​​referenced by the element in the DOM.
     * @param { Element } element - DOM element that contains one or more values.
     * @returns { Promise<Array> } Object that represents a promise for a list of objects.
     * 
     * @example <caption>Get options from a checkbox element</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#toogle');
            console.log(await ToogleStrategy.getOptions('installation', selectElement));
            // [{ value: { click: {}, selection: true }, installation: true }, { value: { click: {}, selection: false }, installation: false }]
        });
     * ```
     */
    static async getOptions(identifier, element) {
        
        const clickableElement = element.querySelector('input') || element;

        let result = [
            {
                value: { click: clickableElement, selection: true },
                [identifier]: true
            },
            {
                value: { click: clickableElement, selection: false },
                [identifier]: false
            }
        ];
        
        return result;
    }

    /**
     * Select a specific option.
     * @param { Element } element - DOM element that contains one or more values. 
     * @param { string | object } value - Value that will be used to select a specific option.
     * @returns { Promise<void> } Object that represents a promise for the completion of a select action. 
     * 
     * @example <caption>Select an input element</caption>
     * ```
        await page.evaluate(async () => {
            const inputElement = document.querySelector('#toogle > input');
            await ToogleStrategy.setOption(inputElement, { click: inputElement, selection: true });
            console.log(inputElement.checked); // true
     * ```
     */
    static async setOption(element, value) {
        const { click, selection } = value;

        if(click?.checked !== selection) {
            click.click();
        }

        return true;
    }

    /**
     * Check if the particular strategy is suitable for a certain element of the DOM.
     * @param { Element } element - DOM element that contains one or more values. 
     * @returns { Promise<Boolean | Error> } Object that represents a promise for a TRUE or FALSE value.
     * 
     * @example <caption>Match an element</caption>
     * ```
        await page.evaluate(async () => {
            const selectElement = document.querySelector('#toogle');
            console.log(await ToogleStrategy.match(selectElement)); // true
        });
     * ```
     */
    static match(element) {
        let result = false;

        if(element && !Array.isArray(element) && !NodeList.prototype.isPrototypeOf(element)) {
            if(element.tagName !== 'SELECT') {
                result = true;
            }
        }

        return result;
    }
}

export default ToogleStrategy;