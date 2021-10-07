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