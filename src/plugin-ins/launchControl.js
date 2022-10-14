import Environment from '../environment.js'
import Process from "../process.js";

/**
 * Plugin to extend the Impressionist behavior according to the required additional configurations
 * to execute it in Docker environment.
 */
class LaunchControl {

    /**
     * Use the Process class to extend its functionality.
     * @param { Process } Impressionist - Process class.
     */
    static visit(Impressionist) {
        LaunchControl.#specifyExecutableOptions(Impressionist);
    }

    /**
     * Add options to launch process to allow running in Docker environment.
     * @param { Process } Impressionist - Process class.
     */
    static #specifyExecutableOptions(Impressionist) {
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ];

        const chromeExecutablePath = Environment.get('GOOGLE_CHROME_PATH') || '/usr/bin/google-chrome';

        Impressionist.initialize = async function initialize(url, browserOptions) {
            return await Impressionist.browserController.initialize(url, {
                ...browserOptions,
                executablePath: chromeExecutablePath,
                args
            });
        }
    }
}

export default LaunchControl;
