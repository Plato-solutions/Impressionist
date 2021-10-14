class Logger {

    static error(origin, message) {
        
        logger({
            origin,
            level: 'error',
            message
        });

        throw new Error(`${origin} - ${message}`);

    }

    static warn(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'warn',
            elements,
            message
        });
    }

    static info(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'info',
            elements,
            message
        });

    }

    static debug(origin, elements, message) {
        elements = Logger.#formatElements(elements);

        logger({
            origin,
            level: 'debug',
            elements,
            message
        });
    }

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