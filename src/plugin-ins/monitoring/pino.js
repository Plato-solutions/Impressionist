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
     * @param { object } report - Information that will be used to compose the report.
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