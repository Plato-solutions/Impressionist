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