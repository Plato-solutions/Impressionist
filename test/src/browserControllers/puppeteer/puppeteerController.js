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
import PuppeteerController from '../../../../src/browserControllers/puppeteer/puppeteerController.js';
import { isRegExp } from "util/types";

describe.only('PuppeteerController Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081/';

    before(async () => {
        await testingServer.start();
    });

    describe('Initialize Puppeteer', () => {

        it('Create a configured browser and page instances', async () => {
            const result = PuppeteerController.initialize();
            await assert.doesNotReject(result);
            await PuppeteerController.close();
        });

    });

    describe('Close Puppeteer connections', () => {
        
        it('Close browser and page', async () => {
            await PuppeteerController.initialize();
            const result = PuppeteerController.close();
            await assert.doesNotReject(result);
        });

    });

    describe('Evaluate', () => {

        beforeEach(async () => {
            await PuppeteerController.initialize();
        });

        it('Execute a function in browser context', async () => {
            const result = await PuppeteerController.evaluate(() => {
                return 2+2;
            });

            assert.strictEqual(result, 4);
        });

        it('Execute an async function in browser context', async () => {
            const result = await PuppeteerController.evaluate(async () => {
                return 2+2;
            });
            assert.strictEqual(result, 4);
        });

        it('Execute a faulty function in browser context', async () => {
            
            async function failWithMessage() {
                return await PuppeteerController.evaluate(() => {
                    throw new Error('Custom function failed.');
                });
            }

            assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Function execution failed with the following message: /
            });
        });

        afterEach(async () => {
            await PuppeteerController.close();
        });

    });

    describe('Execute', () => {
        
        beforeEach(async () => {
            await PuppeteerController.initialize();
        });

        it('Execute a function in browser context', async () => {

            const result = await PuppeteerController.execute(url, async (browser, page) => {
                return await page.evaluate(() => {
                    return 2+2;
                });
            });

            assert.strictEqual(result, 4);
        });

        it('Execute an async function in browser context', async () => {

            const result = await PuppeteerController.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                    return 2+2;
                });
            });

            assert.strictEqual(result, 4);
        });

        it('Execute a faulty function in browser context', async () => {

            async function failWithMessage() {
                return await PuppeteerController.execute(url, async (browser, page) => {
                    return await page.evaluate(async () => {
                        throw new Error('Custom function failed');
                    });
                });
            }

            assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Function execution failed with the following message: /
            });
        });

        afterEach(async () => {
            await PuppeteerController.close();
        });
    });
    
    after(async () => {
        await testingServer.stop();
    });

});