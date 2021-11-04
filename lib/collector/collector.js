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


import Context from './context.js';
import ProxyAccessor from './contextAccessors/proxy.js';
import CollectionCollectorFactory from './factory/collection.js';

/**
 * Collect items from a Collection by being iterated through a context element.
 */
class Collector {
    /**
     * 
     * @param { object } contextAccessor - Objects that returns an iterable 
     * object as a result of its execution.
     * @param { Collection } collection - A collection instance.
     */
    constructor(contextAccessor, collection) {
        if(arguments.length >= 2) {
            this.contextAccessor = contextAccessor;
            this.collection = collection;
        } else {
            this.contextAccessor = new ProxyAccessor();
            this.collection = contextAccessor;
        }
    }

    /**
     * Execute the collector.
     * @param { Context } context - Object that represents the context or the element
     * that is being passed on nested queries or instances executions.
     * @returns { Promise<Array> } An object that represents a promise for the collected items.
     * 
     * @example
     * ```
        await page.evaluate(async () => {
    
            const data = ( function () {

                const css = SelectorDirectory.get('css');

                return new Collector(
                    new Collection({
                        name: css('h1').property('innerText').single()
                    })
                );
                
            } )();
        
        const context = new Context();
        console.log(await data.call(context)); // [{ name: 'Plato Plugin' }]
    });
     * ```
     */
    async call(context = new Context()) {
        
        let result = [];

        let contextGenerator = await this.contextAccessor.call(context);

        for await(let updatedContext of contextGenerator) {
            result.push(await this.collection.call(updatedContext));
        }

        return result.flat();
        
    }

    /**
     * Queries to append in iterate method.
     */
    iterationQuery = {};

    /**
     * Creates a new Collector that have a custom accessor and a collection.
     * @param { object } queries - A set of queries or callable objects.
     * @returns { Collector } A Collector instance.
     * 
     * @example
     * ```
        await page.evaluate(async () => {

            const data = ( function () {

                const css = SelectorDirectory.get('css');
    
                return new ElementCollectorFactory(css('#reviews > ul > li').all()).iterate({
                    author: css('#review-author').property('innerText').single(),
                    title: css('#review-title').property('innerText').single(),
                    rating: css('#review-rating').property('innerText').single(),
                    body: css('#review-body').property('innerText').single(),
                    date: css('#review-date').property('innerText').single()
                });
        
            } )();

            const context = new Context();
            console.log(await data.call(context)); // [{ author: 'John Doe', title: 'It is okay', rating: '4', body: 'Nice product. I would recommend the version X.', date: '01-12-2021' }, { author: 'Richard Roe', title: 'Amazing!', rating: '5', body: 'Really good product.', date: '10-12-2021' }]
        });
     * ```
     */
    iterate(queries = {}) {
        Object.assign(queries, this.iterationQuery);
        return new CollectionCollectorFactory(this, queries);
    }
}

export default Collector;