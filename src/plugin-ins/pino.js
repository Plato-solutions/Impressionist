import pino from 'pino';
import Environment from '../environment.js';

class Pino {

    static #logger = pino({
        name: 'Impressionist',
        level: 'debug',
    });

    static error(report) {

    }

    static info(report) {

    }

    static debug(report) {

    }
}

export default Pino;