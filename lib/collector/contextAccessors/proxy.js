import Context from '../context.js';

/**
 * Used when there is not contextProcessor in Collector.
 */
class ProxyAccessor {

    /**
     * Returns a generator with the incoming context.
     * @param { Context } context - Object that represents the context or the element
     * that is being passed on nested queries or instances executions.
     * @returns { Generator<Context> } Returns the incoming context as part of a generator.
     * 
     * @example <caption></caption>
     * ```
        await page.evaluate( async () => {
                        
            const context = new Context().update('Custom Context');

            const data = new ProxyAccessor().call(context);

            let contextContainer = [];

            for await(let newContext of data) {
                contextContainer.push(newContext);
            }

            console.log(contextContainer[0].getElement()); // 'Custom Context'
            
        });
     * ```
     */
    async * call(context) {
        yield context;
    }
    
}

export default ProxyAccessor;