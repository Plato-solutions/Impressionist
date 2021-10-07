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