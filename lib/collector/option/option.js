import OptionStrategyManager from "./strategyManager.js";

/** 
 * Creates an iterable object from a series of options and at the same time, the iterable object has
 * a function that is executed in each iterative cycle (next method call) to select a specific option value.
 * 
 * @summary Creates an iterable object from options.
 * 
 * @example <caption>Create an Option instance of a dropwdown (select element).</caption>
 * ```
 * const edition = new Option('edition', document.querySelector('#select_1573'));
 * const support = new Option('support', document.querySelector('#select_1583'));
 * const installation = new Option('installation', document.querySelector('#select_1593'));
 * ```
 * 
 * @example <caption>Create an Option instace of a group of buttons (div elements).</caption>
 * ```
 * // First, we need to create a function to get the options available based on the checkboxes
 * function getEditionAndSupportOptions(label, element) {
 *
 *      return new Promise((resolve, reject) => {
 * 
 *              const options = element.querySelectorAll('div'); // Get all the div elements
 *              let result = [];
 *              
 *              for(let option of options) {
 *                  result.push({
 *                      value: option,
 *                      [label]: option.innerText
 *                  });
 *              }
 * 
 *              resolve(result);
 * 
 *              });
 * }
 * 
 * // We need to create the function to make the seleccion.
 * 
 * async function setOptions(newElement) {
 *      newElement.click();
 *      return true;
 * }
 * 
 * // Now that we have out functions we can create our Option instance.
 * 
 * const edition = new Option('edition', document.querySelector('div.swatch-attribute.edition > div'), getEditionAndSupportOptions, setOptions);
 *  
 * ```
 */
class Option {
    /**
     * @param { string } label - This tag identifies which option certain values ​​are linked to.
     * For example, the CE, EE, and ECE values ​​are tied to an Edition option.
     * @param { Element } inputElement - Css query selector of a DOM Element that refers
     * to an object that contains options such as a dropdown, a series of checkboxes, etc.
     * @param { function(string, Element): Promise<object[]> } [ getSelections = Option.#getSelectValues ] - 
     * A function that creates an array of objects, in which each one of them contains two properties:
     * value - which refers to the value property of an element that will be used to make the selection of the option.
     * And, the second property is the dynamic value of the label parameter, which will contain the text
     * of the value itself.
     * @param { function( string | Element, Element): Promise<void> } [ setSelection = Option.#setSelectValue ] - 
     * Function that performs a selection of an option based on a value that is specified as a parameter.
     */
    constructor(
        identifier,
        element,
        strategy
    ) {
        this.identifier = identifier;
        this.element = element;
        this.strategy = strategy;        
    };
    
    /**
     * Creates an iterable object that contains the values of an HTML element and its respective selection function.
     * The values collection and function execution is controlled by the
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols| JavaScript Iteration Protocols}.
     * 
     * @yields { object } - The next HTML element in the sequence.
     * 
     * @example <caption>Use the next generator method to get the values</caption>
     * ```
     * const edition = new Option('edition', document.querySelector('#select_1573'));
     * 
     * // Note: The use of next below refers to the method on Option instance.
     * const editionOptions = edition.next();
     * 
     * // Note: The use of next below refers to the iteration protocol method.
     * console.log(editionOptions.next()); // {value: { value: '22334', edition: 'CE' }, done: false };
     * console.log(editionOptions.next()); // {value: { value: '22335', edition: 'EE' }, done: false };
     * console.log(editionOptions.next()); // {value: { value: '22336', edition: 'ECE' }, done: false };
     * console.log(editionOptions.next()); // {value: undefined, done: true };
     * ```
     */
    async * call() {

        if(!this.strategy) {
            this.strategy = await OptionStrategyManager.lookUp(this.element);
        }

        let options = await this.strategy.getOptions(this.identifier, this.element);
        
        for(let option of options) {
            await this.strategy.setOption(this.element, option.value);
            yield option;
        }

    }

}

export default Option;