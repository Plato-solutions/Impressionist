class Logger {

    static error(origin, elements, message) {
        
        const elements = Logger.#formatElements(elements);

        logger(origin, 'error', {
            elements   
        }, message);

    }

    static warn(origin, elements, message) {
        const elements = Logger.#formatElements(elements);

        logger(origin, 'error', {
            elements   
        }, message);
    }

    static info(origin, elements, message) {
        const elements = Logger.#formatElements(elements);

        logger(origin, 'error', {
            elements   
        }, message);
    }

    static debug(origin, elements) {
        const elements = Logger.#formatElements(elements);

        logger(origin, 'error', {
            elements   
        });
    }

    static #formatElements(elements) {
        let result = [];

        for(const element in elements) {
            result.push({
                name: element,
                value: elements[element],
                type: typeof elements[element],
                instance: elements[element].constructor.name
            })
        }

        return result;

    }

}

export default Logger;