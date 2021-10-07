/**
 * Knows how to get and set values from a group of options.
 */
class GroupStrategy {

    /**
     * Extract a value that will be used to identify each option.
     * @param { string } identifier - Identifies the option values ​​referenced by the element in the DOM.
     * @param { Element } element - DOM element that contains one or more values.
     * @returns { Promise<Array> } Object that represents a promise for a list of objects.
     * 
     * @example <caption>Get options from a select element</caption>
     * ```
        await page.evaluate(async () => {
            const element = document.querySelectorAll('#div-1 > div');
            const result = await GroupStrategy.getOptions('edition', element);
            console.log(result); // [ { value: div, edition: 'div-val-10'}, { value: div, edition: 'div-val-20'}, { value: div, edition: 'div-val-30' }]
        });
     * ```
     */
    static async getOptions(identifier, element) {
        let result = [];

        for(let option of element) {
            
            const clickableElement = option.querySelector('input') || option;
            
            result.push({
                value: clickableElement,
                [identifier]: option.innerText
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
     * @returns { Promise<Boolean> } Object that represents a promise for the completion of
     * a select action. 
     * 
     * @example <caption>Set second option to a div element</caption>
     * ```
        await page.evaluate(async () => {
            const parentElement = document.querySelector('#div-1');
            const element = document.querySelector('#div-1 > div:nth-child(2)');

            await GroupStrategy.setOption(parentElement, element);

            console.log(parentElement.getAttribute('value')); // 20
        });
     * ```
     */
    static async setOption(element, value) {
        value.click();
        return true;
    }

    /**
     * Check if the particular strategy is suitable for a certain element of the DOM.
     * @param { Element } element - DOM element that contains one or more values. 
     * @returns { Promise<Boolean | Error> } Object that represents a promise for a TRUE or FALSE value.
     * 
     * @example <caption>Match elements</caption>
     * ```
        await page.evaluate(async () => {
            const element = document.querySelectorAll('#div-1 > div');
            console.log(await GroupStrategy.match(element)); // true
        });
     * ```
     */
    static match(element) {
        return Array.isArray(element) || NodeList.prototype.isPrototypeOf(element)?true:false;
    }
}

export default GroupStrategy;