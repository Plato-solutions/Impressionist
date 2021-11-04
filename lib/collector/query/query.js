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

import SelectorInterpreter from "./interpreter/selector.js";
import Require from './selector/require.js';
import Single from './selector/single.js';

/**
 * @private
 * 
 * It provides the logic to execute each of the nodes that make up the linked list or query chain.
 * 
 * @summary Execute implementations in the query chain.
 */
class Query {
    
    /**
     * @type { object | null }
     * Saves the reference to the main node in the list.
     */
    header = null;

    /**
     * 
     */
    #lastNode = null;

    /**
     * It executes each of the nodes in the list in order and saves the result in a variable
     * that is being shared and updated each time a successive node interacts with it.
     * 
     * @summary Main method to execute implementation in the chain.
     * 
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     *  
     * @returns { Promise<string | Array | object> } Promise object that represents the final result of
     * all executions in the query chain.
     */
    async call(context) {
        this.#setSingleAsDefault();
        this.#setRequireAsDefault();

        let result;

        let currentNode = this.header;

        // Call the first element and execute and store in result
        result = await this.#execute(currentNode, context);
        
        // call the next implementations
        while(currentNode.next) {
            currentNode = currentNode.next;
            let newContext = context.update(result);
            // Rewrite the result variable
            result = await this.#execute(currentNode, newContext);
        }

        // Return the result
        return result;
    }

    /**
     * Set Single as default element handler in a query chain.
     */
    #setSingleAsDefault() {
        let currentNode = this.header;
        let elementHandlerFound = false;
        
        while(currentNode) { // TODO: Improve defaults methods.
            if(currentNode.implementation.constructor.name === 'All' || currentNode.implementation.constructor.name === 'Single' || currentNode.implementation.constructor.name === 'Elements' || currentNode.implementation.constructor.name === 'Options' || currentNode.implementation.constructor.name === 'Select') {
                elementHandlerFound = true;
                break;
            }

            currentNode = currentNode.next;
        }
        
        if(!elementHandlerFound) {
            new Single('', this);
        }
    
    }

    /**
     * Set Require as default error handler in a query chain.
     */
    #setRequireAsDefault() { //TODO: Improve default methods.
        if(this.#lastNode.implementation.constructor.name !== 'Default' && this.#lastNode.implementation.constructor.name !== 'Require') {
            new Require('', this);
        }
    }

    

    /**
     * Execute the implementation of a specific node.
     * 
     * @param { object } node - A node in the linked list that refers to a particular implementation.
     * @param { object } node.implementation - Refers to a specific instance of a Selectable sub-class.
     * @param { null } node.next - Represents the next available slot in the chain of selectors.
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * 
     * @returns { Promise<string | Array | object> } Promise object that represents the final result of
     * the executions of a single implementation.
     */
    async #execute(node, context) {
        return await node.implementation.execute(context);
    }

    /**
     * Add a new node at the next place in the linked list.
     * 
     * @param { object } node - A node in the linked list that refers to a particular implementation.
     * @param { object } node.implementation - Refers to a specific instance of a Selectable sub-class.
     * @param { null } node.next - Represents the next available slot in the chain of selectors.
     * 
     * @example <caption>Use in Implementation class</caption>
     * ```
     * constructor(definition, query = new Query()) {
     *      this.query = query;
     *      this.definition = definition;
     *      this.query.add({
     *          implementation: this,
     *          next: null
     *      });
     * 
     *      return new Proxy(this, Implementation);
     * }
     * ```
     */
    add(node) {

        this.#lastNode = node;

        if(!this.header) {
            this.header = node;
        } else {
            let current = this.header;
            
            while(current.next) {
                current = current.next;
            }

            current.next = node;
        }

    }

    /**
     * Normalize a string into a Query chain.
     * @param { string } selector - Custom selector.
     * @returns { SelectorInterpreter } A new instances of Query.
     */
    static normalize(selector) {
        return new SelectorInterpreter(selector);
    }

}

export default Query;