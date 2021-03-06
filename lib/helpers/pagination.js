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

import clickAndWait from "./clickAndWait.js";

/**
 * Handles the pagination of an HTML section.
 */
class Pagination {

    /**
     * Create a generator object with the new rendered document.
     * @param { string } buttonSelector - CSS selector of the button that triggers the action
     * to go to the next pagination.
     * @param { object } waitFor - Selector of an element and timeout in milliseconds to wait for.
     * @param { number } waitFor.timeout - The number of milliseconds to wait for.
     * @param { string } waitFor.selector - A selector of an element to wait for.
     * @param { function } waitFor.customFunction - A function that performs others waiting processes.
     * @param { function } [stopLoad=(button) => button] - A function that
     * returns a boolean to control when the event needs to be stopped.
     * By default function is ```(button) => button```,
     * where the Pagination functionality needs to stop when the button is not available.
     */
    static async * execute(buttonSelector, waitFor, stopLoad = (button) => button) {
                
        let nextButton = null;

        do {
            yield document;
            nextButton = document.querySelector(buttonSelector);
            await clickAndWait(buttonSelector, waitFor);
        } while(stopLoad(nextButton));
    }

}

export default Pagination;