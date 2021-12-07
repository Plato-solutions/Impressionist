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

 import assert from "assert";
 import NanoServer from '../../../testing-server/server.js';
 import Puppeteer from '../../../../src/browserControllers/puppeteer/puppeteer.js';

describe('Puppeteer Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    beforeEach(async () => {
        await testingServer.start();
    });

    it('Launch without options', async () => {
        const browser = await Puppeteer.launch();
        const result = browser.isConnected()
        await browser.close();

        assert.strictEqual(result, true);
    });

    it('Launch with options', async () => {
        const browser = await Puppeteer.launch({
            args: ['--no-sandbox']
        });
        const result = browser.isConnected()
        await browser.close();

        assert.strictEqual(result, true);
    });

    it('Create an empty page', async () => {
        const browser = await Puppeteer.launch();
        const page = await Puppeteer.newPage(browser);
        const result = page.url();
        await browser.close();

        assert.strictEqual(result, 'about:blank');
    });

    it('Close a browser', async () => {
        const browser = await Puppeteer.launch();
        await Puppeteer.close(browser);
        const result = browser.isConnected()

        assert.strictEqual(result, false);
    });

    it('Close a page', async () => {
        const browser = await Puppeteer.launch();
        const page = await Puppeteer.newPage(browser);
        await Puppeteer.close(page);
        const result = browser.isConnected()
        await browser.close();

        assert.strictEqual(result, true);
    });

    it('Close a browser and pages', async () => {
        const browser = await Puppeteer.launch();
        const page = await Puppeteer.newPage(browser);
        await Puppeteer.close(page, browser);
        const result = browser.isConnected()

        assert.strictEqual(result, false);
    })

    afterEach(async () => {
        await testingServer.stop();
    });
});