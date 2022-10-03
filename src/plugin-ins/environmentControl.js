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

import Environment from "../environment.js";
import Sentry from "./monitoring/sentry.js";
import { MonitorManager } from "./index.js";
import Process from "../process.js";

/**
 * Plugin to extend the Impressionist behavior according to the environmental variables.
 */
class EnvironmentControl {

    /**
     * Use the Process class to extend its functionality.
     * @param { Process } Impressionist - Process class.
     */
    static visit(Impressionist) {
        if(Environment.is(Environment.PRODUCTION)) {
            EnvironmentControl.#enableProxy(Impressionist);
            EnvironmentControl.#enableSentry();
        } else {
            EnvironmentControl.#customConnectionSetup(Impressionist);
        }
    }

    /**
     * Use the proxies to open connections in the target url.
     * @param { Process } Impressionist - Process class.
     */
    static #enableProxy(Impressionist) {
        Impressionist.configureConnection = async function configureConnection(connectionIdentifier) {
            await Impressionist.browserController.enableProxy(connectionIdentifier, Environment.get('PROXY'));
            await Impressionist.enableImpressionistFeatures(connectionIdentifier);
        }
    }

    /**
     * Initialize sentry to be used in the MonitorManager.
     */
    static #enableSentry() {
        Sentry.initialize({
            dsn: Environment.get('SENTRY_DSN'),
            release: Environment.get('npm_package_version'),
            enviroment: Environment.get('ENV'),
        }, Object.assign({
            impressionist_version: Environment.IMPRESSIONIST_VERSION,
            node_version: process.versions.node
        }, Environment.get('SENTRY_TAGS')));

        MonitorManager.subscribe(Sentry);
    }

    /**
     * Enable console message from browser.
     * @param { Process } Impressionist - Process class.
     */
    static #customConnectionSetup(Impressionist) {
        Impressionist.configureConnection = async function configureConnection(connectionIdentifier) {
            // TODO: Add env variable based on what debugger will be attached
            // Impressionist.browserController.enableDebugMode(connectionIdentifier);
            await Impressionist.enableImpressionistFeatures(connectionIdentifier);
            
            await Impressionist.browserController.execute(connectionIdentifier, async(browser, page) => {
                await page.exposeFunction('puppeteerPage', async (fn, ...args) => {
                    return await page[fn](...args);
                });
            });

            await Impressionist.browserController.inject(
                connectionIdentifier,
                'const page = new Proxy({}, { get: function (target, prop) { target[prop] = async function (...args) { return await puppeteerPage(prop, ...args) }; return target[prop] } })'
            );
        }
    }

}

export default EnvironmentControl;
