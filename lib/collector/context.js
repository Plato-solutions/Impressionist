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
 * It provides a data structure to control the context, which is an object with two properties.
 * The first is document, which refers to the document object present in the browser context.
 * If the context is not running in Browser context then document is set to null. 
 * The other property is element, which stores an element that will be used by some instance during
 * the execution of the collectable tree.
 * 
 * @summary Create an object to give context to instance executions.
 */
class Context {

    constructor() {
        // Initialize values.
        if(typeof document !== 'undefined') { // Detects if context is running on Browser.
            this.document = document;
        } else {
            this.document = null;
        }
        
        this.element = null;
    }

    /**
     * Create a new instance of the same class and assign the values of the object from which it was created.
     * The reason for this method is that the values of the element property can be updated or modified without
     * affecting the original context object, since the new instance is a completely independent object
     * from the original one. Something that does not happen with a simple copy of objects.
     * 
     * @summary Clones a context instance.
     * 
     * @returns { Context } Object that represents the context or the element that is being passed on
     * nested instances executions.
     * 
     * @example <caption>Clone an existing Context instance.</caption>
     * ```
     * const context = new Context();
     * const newContext = context.clone();
     * ```
     */
    clone() {
        const newContext = new this.constructor();
        newContext.document = this.document;
        newContext.element = this.element;
        
        return newContext;
    }

    /**
     * Update the context object by adding a new value for the element property.
     * First, clone the existing Context object using the clone () method and then update the value of element.
     * 
     * @summary Update the Context object.
     * 
     * @param { string | Array | object } element - Stores an element that will be used by some instance during
     * the execution of the collectable tree.
     *  
     * @returns { Context } Object that represents the context or the element that is being passed on
     * nested instances executions.
     * 
     * @example <caption>Update an existing Context instance.</caption>
     * ```
     * const context = new Context();
     * const newContext = context.update('new element');
     * ```
     */
    update(element) {
        const newContext = this.clone();
        newContext.element = element;
        
        return newContext;
    }

    /**
     * Gets the value of the element property.
     * If element is equal to null then it will return the value of the document property.
     * 
     * @returns { string | Array | Object } an element that will be used by some instance during
     * the execution of the collectable tree.
     * 
     * @example <caption>Getting the node to be used for nested executions</caption>
     * ```
     * const context = new Context();
     * ...
     * const element = context.getElement();
     * ```
     */
    getElement() {
        return this.element?this.element:this.document;
    }
}

export default Context;