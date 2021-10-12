/**
 * Provides a static method that checks the data type of an incoming value.
 */
class TypeValidator {
    /**
     * Check the entry value if its data type of instance is the same than the type argument.
     * 
     * @param { any } value - Any value for which want to check the data type.
     * @param { string | object } [type=string] - Data Type: string, number, array, object, boolean, function, CollectionCollector, Collector, NodeCollector.
     * 
     * @returns { Error|void } - Throws an error if the type does not match the value's data type.
     * 
     * @example <caption>Checking if values is String</caption>
     * ```
     * TypeValidator.check('name');
     * ```
     * 
     * @example <caption>Checking if value is Number</caption>
     * ```
     * TypeValidator.check(5, 'number');
     * ```
     */
    static check(value, type = 'string', message = '') {
        
        if(typeof type === 'string') {
            if(typeof value !== type) {
                throw new Error(`The value ${value} is not a type ${type}. ${message}`);
            }
        } else {
            if(!(value instanceof type)) {
                throw new Error(`${value.constructor.name} is not an instance of ${type.name}. ${message}`);
            }
        }
        
    }

    /**
     * Check recursively if he entry value if its data type of instance is the same than the type argument.
     * @param { any } value - Any value for which want to check the data type.
     * @param { object | string } type - Data Type: string, number, array, object, boolean, function, CollectionCollector, Collector, NodeCollector.
     * //TODO: Examples.
     */
    static deepCheck(value, type, message) {
        if(Array.isArray(value)) {
            for(let item of value) {
                TypeValidator.check(item, type, message);
            }
        } else if(typeof value === 'object' && value.constructor === Object) {
            for(let item in value) {
                TypeValidator.check(value[item], type, message);
            }
        }else {
            TypeValidator.check(value, type, message);
        }
    }

}

export default TypeValidator;