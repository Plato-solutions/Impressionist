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

import * as sentry from '@sentry/node';

/**
 * Provides an interface for {@link https://docs.sentry.io/platforms/node/ Sentry integration} with Puppeteerist.
 */
class Sentry {

    /**
     * The configured Sentry instance.
     */
    static #logger;

    /**
     * Specifies the basic options for Sentry initialization.
     * @param { object } options - Please check {@link https://docs.sentry.io/platforms/node/configuration/options/ Sentry documentation}.
     * @param { object } tags - Set of tags.
     */
    static initialize(options, tags) {
        sentry.init(options);
        Sentry.#setTags(tags);
        Sentry.#logger = sentry;
    }

    /**
     * Add the necessary tags for Sentry.
     * Some come from environment variables and others are defined by the library locally.
     */
    static #setTags(tags) {
        for(const [name, value] in tags) {
            sentry.setTag(name, value);
        }
    }

    /**
     * Log a report.
     * @param { object } report - Information that will be used to compose the report.
     */
    static log(report) {
        const { origin, level, message } = report;

        if(level === 'error') {
            Sentry.sendException(`${origin} - ${message}`);
        } else {
            Sentry.#logger.captureMessage(`${origin} - ${message}`, level);
        }
    }

    /**
     * Send error generated to Sentry while Puppeteer execution.
     * 
     * @param { Error } error - Object that represents the error generated during the execution of the scraper.
     * 
     * @returns { Promise<void> } Promise object that represents end of the Sentry actions.
     */
    static sendException(error) {
        Sentry.#logger.captureException(error);
    }

}

export default Sentry;