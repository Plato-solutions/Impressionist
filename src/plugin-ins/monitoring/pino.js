import pino from 'pino';
import Environment from '../environment.js';

class Pino {

    static #logger = pino({
        name: 'Impressionist',
        level: 'debug',
    });

    static log(report) {
        const { origin, level, elements, message } = report;
        
        Pino.#logger[level]({
            origin,
            elements
        }, message);
    }

}

export default Pino;