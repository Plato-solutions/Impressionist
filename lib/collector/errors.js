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
 * Custom error to be used by the QuerySelector class in case an element or series of elements
 * does not exist in the DOM.
 */
class SelectorError extends Error {
    /**
     * @param { string } selector - {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors| CSS Selector}.
     */
    constructor(selector) {
        super(`CSS Selector "${selector}" does not match any element`);
        this.name = this.constructor.name;
    }
}

/**
 * Custom error to be used by the Collectable class to identify if the error was created
 * by the error or require methods of the same class.
 */
class CustomError extends Error {
    /**
     * @param { string } message - Custom message.
     */
    constructor(message) { 
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Custom error to be used by the Collectable class to return any error caused in the execution
 * of the Collectable tree and that does not have a Collectable default method specified.
 */
class CollectableError extends Error {
    /**
     * @param { string } message - Custom message
     * @param { Array<string> } history - An array of messages of previous executions in the collectable chain.
     */
    constructor(message, history) {
        super(`${message}\n\t${history.join('\n\t')}`);
        this.name = this.constructor.name;
    }
    
}

export { SelectorError, CollectableError, CustomError };