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

/**
 * It manages the use of environment variables by providing useful methods for checking and obtaining the variables.
 */
class Environment {

    /**
     * Value of the variable defined by the NodeJS processor to identify the Production execution environment.
     */
    static PRODUCTION = 'prod';

    /**
     * The current version of the library. It can be used, for example, for bug reporting plugins.
     */
    static IMPRESSIONIST_VERSION = '0.5.0-beta';

    /**
     * Check if a specific environment is running. i.e prod or dev.
     * 
     * @param { string } environment - Identifier of the ENV environment variable. For example, prod, dev, etc.
     * 
     * @returns { boolean } Result true or false.
     * 
     * @example
     * ```
     * if(Environment.is(Environment.PRODUCTION)) {
     *      ...
     * }
     * ```
     */
    static is(environment) {
        if(process.env.ENV === environment) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check if a specific environment variable exists.
     * 
     * @param { string } variable - The variable to check. 
     * 
     * @returns { boolean } Result true or false.
     * 
     * @example
     * ```
     * if(Environment.has('SENTRY_TAGS')) {
     *      ...
     * }
     * ```
     */
    static has(variable) {
        if(process.env[variable]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Return a specific env var. If not exist return null.
     * 
     * @param { string } variable The variable to extract.
     * 
     * @returns { string | Array | object | null }
     * 
     * @example
     * ```
     * for(const [name, value] of Object.entries(Environment.get('SENTRY_TAGS'))) {
     *      sentry.setTag(name, value);
     * }
     * ```
     */
    static get(variable) {
        if(Environment.has(variable)) {
            return JSON.parse(process.env[variable]);
        } else {
            return null;
        }
    }
}

export default Environment;