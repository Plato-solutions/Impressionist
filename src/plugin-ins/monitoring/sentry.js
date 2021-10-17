import * as sentry from '@sentry/node';
import Environment from '../../environment.js';

/**
 * Provides an interface for {@link https://docs.sentry.io/platforms/node/ Sentry integration} with Puppeteerist.
 */
class Sentry {

    /**
     * Perform the necessary steps to configure Sentry.
     * 
     * @example
     * ```
     * Sentry.setConfigurations();
     * ```
     */
    static setConfigurations() {
        if(Environment.is(Environment.PRODUCTION)) {
            Sentry.#initialize();
            Sentry.#setTags();
        }
    }

    /**
     * Specifies the basic options for Sentry initialization.
     * Please check {@link https://docs.sentry.io/platforms/node/configuration/options/ Sentry documentation}.
     * 
     * @private
     */
    static #initialize() {
        sentry.init({
            dsn: Environment.get('SENTRY_DSN'),
            release: Environment.get('npm_package_version'),
            enviroment: Environment.get('ENV'),
        });
    }

    /**
     * Add the necessary tags for Sentry.
     * Some come from environment variables and others are defined by the library locally.
     * 
     * @private
     */
    static #setTags() {
        
        if(Environment.has('SENTRY_TAGS')) {
            for(const [name, value] of Object.entries(Environment.get('SENTRY_TAGS'))) {
                sentry.setTag(name, value);
            }
        }

        sentry.setTag('impressionist_version', Environment.IMPRESSIONIST_VERSION);
        sentry.setTag('node_version', process.versions.node);
    }

    /**
     * Send error generated to Sentry while Puppeteer execution.
     * 
     * @param { Error } error - Object that represents the error generated during the execution of the scraper.
     * 
     * @returns { Promise<void> } Promise object that represents end of the Sentry actions.
     */
    static async sendException(error) {
        sentry.captureException(error);
        await sentry.close(2000);
    }
}

export default Sentry;