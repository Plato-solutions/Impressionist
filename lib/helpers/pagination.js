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
 * Handles the pagination of an HTML section.
 */
class Pagination {

    /**
     * Create a generator object with the new rendered document.
     * @param { string } buttonSelector - CSS selector of the button that triggers the action
     * to go to the next pagination.
     * @param { number } [time=300] - Delay time for rendering the document object.
     */
    static async * execute(buttonSelector, time = 300) {
                
        function sleep() {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, time);
            })
        }

        let nextButton = null;

        do {
            yield document;
            
            nextButton = document.querySelector(buttonSelector);
            
            try {
                await puppeteerClick(buttonSelector);
            } catch {
                nextButton?.click?.();
            }

            await sleep();
        } while(nextButton);
    }

}

export default Pagination;