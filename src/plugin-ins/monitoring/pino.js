import pino from 'pino';

/**
 * Initialize Pino and expose its functionality for login.
 */
class Pino {

    /**
     * The configured instance of Pino.
     */
    static #logger = pino({
        name: 'Impressionist',
        level: 'debug',
    });

    /**
     * Log a report.
     * @param {*} report - Information that will be used to compose the report.
     */
    static log(report) {
        const { origin, level, elements, message } = report;
        
        Pino.#logger[level]({
            origin,
            elements
        }, message);
    }

}

export default Pino;