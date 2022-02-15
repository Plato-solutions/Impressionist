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

import Pino from "./pino.js";
import Sentry from "./sentry.js";
import Environment from "../../environment.js";

/**
 * Log on each of the subscribed monitoring tools.
 */
class MonitorManager {
    
    /**
     * Monitoring and logging tools.
     */
    static #monitors = new Set([ Pino ]);

    /**
     * Register a report.
     * @param { object } report - Information to be logged in.
     */
    static log(report) {
        for(const logger of MonitorManager.#monitors.values()) {
            logger.log(report);
        }
    }

    /**
     * Subscribe to a monitoring or logging tool.
     * @param { object } logger - Monitoring or logging tool.
     */
    static subscribe(logger) {
        MonitorManager.#monitors.add(logger);
    }

    /**
     * Unsubscribe to a monitoring or logging tool.
     * @param { object } logger - Monitoring or logging tool.
     */
    static unsubscribe(logger) {
        MonitorManager.#monitors.delete(logger);
    }

    /**
     * Delete all logers. It can be used to discard the default loggers.
     */
    static clear() {
        MonitorManager.#monitors.clear();
    }
}

export default MonitorManager;