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
 * Provide a directory to store proxy function that will be used to instantiate the Implementation sub-classes.
 * The directory is made up of the name of each proxy function and its sub-class constructor equivalent.
 * 
 * @summary Keep a record of Selector subclasses.
 */
class SelectorDirectory {

    /**
     * An object that stores the constructors of each subclass of Selectors.
     * The key refers to the name of the proxy function and the value refers to the constructor of the sub-class.
     * For example, { css: Css }.
     */
    static #registry = {};

    /**
     * Saves a record of the subclass within the registry as a function.
     * @param { Object } selector - Constructor class such as Css, Property, Single, etc.
     * @example <caption>Use in Selector class</caption>
     * ```
     * SelectorDirectory.register(this); // 'this' referring to the class constructor that is extending Implementation.
     * ```
     */
    static register(selector) {

        const classAlias = selector.name.toLowerCase();

        if(!SelectorDirectory.#registry[classAlias]) {
            SelectorDirectory.#registry[classAlias] = function(...args) {
                return new selector(...args); // Avoid the use of new keyword in page.evaluate
            }
        }
        
    }

    /**
     * Returns the proxy function that was previously registered within the registry object.
     * 
     * @param { String } name - Name of the function stored in the registry object.
     * It will be the lowercase version of the sub-class name.
     * 
     * @returns { function } Proxy function that will create the instance of the sub-class.
     * 
     * @example <caption>Use in Selector class</caption>
     * ```
     * // Create the intance of the functionality
     * const queryImplementation = SelectorDirectory.get(prop);
     * const queryInstance = new queryImplementation(definition, this.query);
     * ```
     */
    static get(name) {
        if(!SelectorDirectory.#registry[name]) {
            throw new Error(`Class ${name.charAt(0).toUpperCase() + name.slice(1)} is not registered`);
        }

        return SelectorDirectory.#registry[name];
    }

    /**
     * Creates an iterable object of all registries inside the registry object.
     * @yields { Array<String | object> } - An array that is made up of the name of the proxy function
     * and the constructor of the Implementation sub-class.
     */
    static * iterate() {
        for(let name in SelectorDirectory.#registry) {
            yield [name, SelectorDirectory.#registry[name]];
        }
    }

}

export default SelectorDirectory;