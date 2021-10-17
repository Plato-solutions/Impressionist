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
                value: elements[element],
                type: typeof elements[element],
                instance: elements[element]?.constructor.name
            })
        }
        
        return result;

    }

}

export default Logger;