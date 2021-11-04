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
 * Log useful information and register errors.
 */
class Logger {

    /**
     * Error level.
     * @param { string } origin - Name of the class, function of where the log comes from.
     * @param { string } message - Message.
     */
    static error(origin, message) {
        
        logger({
            origin,
            level: 'error',
            message
        });

        throw new Error(`${origin} - ${message}`);

    }

    /**
     * Warn level.
     * @param { string } origin - Name of the class, function of where the log comes from.
     * @param { object } elements - Any element to record its value, data type and instance.
     * @param { string } message - Message
     */
    static warn(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'warn',
            elements,
            message
        });
    }

    /**
     * Info level.
     * @param { string } origin - Name of the class, function of where the log comes from.
     * @param { object } elements - Any element to record its value, data type and instance.
     * @param { string } message - Message 
     */
    static info(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'info',
            elements,
            message
        });

    }

    /**
     * Debug level.
     * @param { string } origin - Name of the class, function of where the log comes from.
     * @param { object } elements - Any element to record its value, data type and instance.
     * @param { string } message - Message 
     */
    static debug(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'debug',
            elements,
            message
        });
    }

    /**
     * Extract useful information from elements and give them a specific format inside a list.
     * @param { object } elements - Any element to record its value, data type and instance.
     * @returns { Array<object> } - List of objects that represent an element.
     */
    static #formatElements(elements) {
        let result = [];

        for(const element in elements) {
            result.push({
                name: element,
                value: elements[element], //FIXME: Some elements throws errors when trying to convert it to JSON.
                type: typeof elements[element],
                instance: elements[element]?.constructor.name
            })
        }
        
        return result;

    }

}

export default Logger;