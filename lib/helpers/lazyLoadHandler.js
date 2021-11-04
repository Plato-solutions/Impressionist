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
 * Loads all DOM elements that are handled by a LazyLoad.
 */
class LazyLoadHandler {

    /**
     * Executes the loading of all the elements by providing a clickable element selector, for example, a Next button. 
     * @param { string } buttonSelector - CSS Selector.
     */
    static async execute(buttonSelector) {

        const nextButton = document.querySelector(buttonSelector);

        while(nextButton && !(nextButton?.disabled)) {
            
            try {
                await puppeteerClick(buttonSelector);
            } catch {
                nextButton.click();
            }
            
        }
    }
}

export default LazyLoadHandler;