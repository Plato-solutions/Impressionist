import Query from "../query/query.js";

/**
 * Knows how to execute a set of queries on a set of objects.
 */
class Collection {

    /**
     * @param { Object | function | string } queries - A set of queries.
     */
    constructor(queries) {
        this.queries = queries;
    }

    /**
     * A list of processors that normalize or transform the result of the query execution.
     */
    #postProcessors = [];

    /**
     * Execute a set of queries.
     * @param { Context } context - Object that represents the context or the element
     * that is being passed on nested queries or instances executions.
     * @returns { Promise<object> } An object that represents a promise for a object with the results of the queries. 
     * 
     * @example
     * ```
        await page.evaluate( async () => {
            const data = ( function () {
    
                const css = SelectorDirectory.get('css');
    
                return new Collection({
                    name: css('h1').property('innerText').single()
                });
                
            } )();
            
            const context = new Context();
            console.log(await data.call(context)); // { name: 'Plato Plugin' }
        });
     * ```
     */
    async call(context) {

        let result = {};

        for(let query in this.queries) {
            try {
                Object.assign(result, { [query]: await this.#executeQuery(this.queries[query], context) });
            } catch (e) {
                throw new Error(`${query} - Execution of query failed: ${e.message}`);
            }
        }

        return await this.#executePostProcessors(result);
    }

    /**
     * Execute a query.
     * @param { object | string | function } query - A set of queries.
     * @param { Context } context - Object that represents the context or the element
     * that is being passed on nested queries or instances executions.
     * @returns { Promise<object|string> } An object that represents a promise for the result of the execution of a query.
     */
    async #executeQuery(query, context) {
        if(typeof query === 'string') {
            return await Query.normalize(query).call(context);
        } else {
            return await query.call(context);
        }
    }

    /**
     * Execute the postProcessors to the query result.
     * @param { Array } collection - The result of processing the queries. 
     * @returns { Promise< object | string > } An object that represents a promise
     * for the result of a post-process.
     */
    async #executePostProcessors(collection) {
        
        try {
            
            let result = collection;
            
            for(let postProcessor of this.#postProcessors) {
                result = await postProcessor.call(result);
            }

            return result;

        } catch (e) {
            throw new Error('Collection - Execution of PostProcessor failed with the following message: ' + e.message);
        }

    }

    /**
     * Take a query result and transform according to a custom functionality.
     * @param { Function } customProcessor - A custom functionality that receives
     * the query result and perform a process to return a transformed data.
     * @returns { Collection } Returns the current Collection instance.
     */
    postProcessor(customProcessor) {
        this.#postProcessors.push(customProcessor);
        return this;
    }
}

export default Collection;