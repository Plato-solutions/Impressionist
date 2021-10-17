import Pino from "./pino.js";
import Sentry from "./sentry.js";

/**
 * Log on each of the subscribed monitoring tools.
 */
class MonitorManager {
    
    /**
     * Monitoring and logging tools.
     */
    static #monitors = new Set([ Pino, Sentry ]);

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
}

export default MonitorManager;