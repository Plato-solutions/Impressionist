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