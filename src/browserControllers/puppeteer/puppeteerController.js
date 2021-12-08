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

import Puppeteer from "./puppeteer.js";

class PuppeteerController {

    static browser;
    static mainPage;

    static async initialize(options) {
        PuppeteerController.browser = await Puppeteer.launch(options);
        PuppeteerController.mainPage = await PuppeteerController.newPage();
    }

    static async newPage() {
        return await Puppeteer.newPage(PuppeteerController.browser);
    }

    static async close() {
        await Puppeteer.close(PuppeteerController.mainPage, PuppeteerController.browser);
    }

    static async evaluate(pageFunction, ...args) {
        try {
            return await Puppeteer.evaluate(PuppeteerController.mainPage, pageFunction, ...args);
        } catch(e) {
            throw new Error('Function execution failed with the following message: ' + e.message);
        }
    }
}

export default PuppeteerController;