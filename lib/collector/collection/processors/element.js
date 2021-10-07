/**
 * Converts collection into a generator of collection of Nodes.
 */
class CollectionElementProcessor {

    /**
     * Execute the processor.
     * @param { object } elementCollection - A series of DOM elements.
     * @returns { Array } A list of DOM elements.
     * 
     * @example <caption>Receives a collection with a DOM element and returns an array with the element</caption>
     * ```
        const result = await page.evaluate(() => {
            const elements = { reviews: document.querySelector('h1') };
            const data = CollectionElementProcessor.call(elements);
            console.log(data); // [h1]
        });
     * ```
     * @example <caption>Receives a collection with a list of DOM elements an returns an array with elements</caption>
     * ```
        const result = await page.evaluate(() => {
            const elements = { reviews: Array.from(document.querySelectorAll('#reviews > ul > li')) };
            const data = CollectionElementProcessor.call(elements);
            console.log(data); // [li, li]
        });
     * ```
     */
    static call(elementCollection) {
        const elements = Object.values(elementCollection).flat()
        
        if(CollectionElementProcessor.#checkIfGenerator(elements[0])) {
            return elements[0];
        } else {
            return CollectionElementProcessor.#createGenerator(elements);
        }
        
    }

    static #checkIfGenerator(element) {
        return !(element instanceof Element || element instanceof Document) && typeof element === 'object';
    }

    static * #createGenerator(elements) {
        for(let element of elements) {
            yield element;
        }
    }

}

export default CollectionElementProcessor;