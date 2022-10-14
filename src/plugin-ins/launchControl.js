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
     * Get Google Chrome executable path based on system architecture.
     */
    static #getGoogleChromePath() {
        const platform = process.platform;

        const pathOptions = new Map([
            ['darwin', "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"],
            ['linux', "/usr/bin/google-chrome"],
            ['win32', "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe"]
        ])

        return pathOptions.get(platform);
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

        const chromeExecutablePath = LaunchControl.#getGoogleChromePath() || '/usr/bin/google-chrome';

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
