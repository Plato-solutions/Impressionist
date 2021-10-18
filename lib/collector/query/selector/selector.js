import SelectorDirectory from "./directory.js";
import Query from "../query.js";
import Context from "../../context.js";
import TypeValidator from "../../typeValidator.js";

/**
 * @private
 * It contains the logic to implement a proxy object and make possible the concatenations
 * of functions / Selectables such as Css, Property, Single, etc.
 * 
 * @summary Create a Proxy object to chain classes instances.
 */
class Selector {

    /**
     * @param { string | Array<object|function> | object } definition - The value required to make the selection.
     * For example, in "css" it is a Css Selector, in "property" it is a string that represents a property
     * of the previous object as "innerText", and so on.
     * @param { Query } query - Query instance object which creates a linked list that
     * will then be executed for chain execution.
     * 
     * @returns { Object } Promise object that represents a
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy Proxy object}.
     */
    constructor(definition, query = new Query()) {
        this.definition = definition;
        this.query = query;

        this.validateParameters();
        
        this.query.add({
            implementation: this,
            next: null
        });

        return new Proxy(this, Selector);
    }

    /**
     * Validate the instance initialization parameters.
     */
    validateParameters() {
        // Validation of constructor parameters is optional.
    }

    /**
     * Method that contains all the specific Selector of the instance.
     * 
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     */
    async execute(context) {
        throw new Error(`Selector missing in ${this.constructor.name} class.`);
    }

    /**
     * The {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get handler.get()}
     * method is a trap for getting a property value.
     * 
     * @param { Selector } target - Refers to the instance that is being created. i.e: Css, Property, etc.
     * @param { string } prop - The name or Symbol  of the property to get.
     * It refers to the next function in the chain.
     * 
     * @returns { function } - Function that creates a instance of a Selector.
     */
    static get(target, prop) {

        if(!target[prop] && typeof prop === 'string') {
            target[prop] = function(definition) {
                // Create the intance of the functionality
                const selector = SelectorDirectory.get(prop);
                const queryInstance = new selector(definition, this.query);
                // Return the new Selector so new queries can be added in chain.
                return queryInstance;
            }
        }
    
        return target[prop];
        
    }

    /**
     * Main method. Start the execution processes of the chained instances.
     * 
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * 
     * @returns { Promise<string|Array<*>|Object> } Promise object that represents the result of the chain execution.
     */
    async call(context) {
        return await this.query.call(context);
    }

    /**
     * Set a new context.
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * @returns { this } The instance of a Selector sub-class.
     */
    setGetElement(context) {
        if(context) TypeValidator.check(context, Context);
        this.customContext = context;
        return this;
    }
    
    /**
     * Get the element from the context.
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * @returns { Any }
     */
    getElement(context) {
        if(context) TypeValidator.check(context, Context);
        return this.customContext?.getElement() || context.getElement();
    }

    /**
     * Queue of alternative definitions.
     */
    alternatives = [];

    /**
     * Allows the agregation of new alternatives.
     * @param { string | Array<object|function> | object } definition - The value required to make the selection.
     * For example, in "css" it is a Css Selector, in "property" it is a string that represents a property
     * of the previous object as "innerText", and so on.
     * @returns { this } Instance of Selector sub-class.
     */
    alt(definition) {
        this.alternatives.push(definition);
        return this;
    }

    /**
     * Execute the next alternative in the FIFO queue.
     * @param { Context } context - Object that represents the context or the element that is being passed on
     * nested queries or instances executions.
     * @returns { Promise<object | string | Array> } Promise object that represents the result of the chain execution.
     */
    async executeAlternatives(context) {
        this.definition = this.alternatives.shift();
        return await this.execute(context);
    }

    /**
     * Register the subclass in the Query directory.
     */
    static register() {
        SelectorDirectory.register(this);
    }

}

export default Selector;