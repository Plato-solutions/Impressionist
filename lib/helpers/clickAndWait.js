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

import Logger from '../collector/logger.js';

/**
 * Click an element in the DOM and then wait for another event like a timeout,
 * a selector being loading in the DOM or wait for the completion of an asyncronous function.
 * @param { string } selector - CSS Selector.
 * @param { object } waitFor - Options to wait for. 
 * @param { number } waitFor.timeout - Timeout.
 * @param { string } waitFor.selector - A CSS Selector.
 * @param { function } waitFor.customFunction - A function that performs others waiting processes.
 */
async function clickAndWait(selector, { timeout = 1000, selector = '#noExist', customFunction = async (timeout) => await page.waitForTimeout(timeout) } ={}) {
    try {
        await page.click(selector);
    } catch(e) {
        Logger.warn('clickAndWait', { selector }, 'Using the click method of Puppeteer failed with the following message: ' + e.message);
        Logger.info('clickAndWait', { }, 'Making click using the click method on element.');
        document.querySelector(selector)?.click();
    } finally {
        await Promise.any([
            page.waitForTimeout(timeout),
            page.waitForSelector(selector),
            customFunction(timeout)
        ]);
    }
}

export default clickAndWait;