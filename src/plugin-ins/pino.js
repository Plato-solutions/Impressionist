import pino from 'pino';
import Environment from '../environment.js';

class Pino {

    static #logger = pino({
        name: 'Impressionist',
        level: 'debug',
    });

    static log(report) {
        const { origin, level, element, message } = report;
        
        Pino.#logger[level]({
            origin,
            element
        }, message);
    }

}

export default Pino;