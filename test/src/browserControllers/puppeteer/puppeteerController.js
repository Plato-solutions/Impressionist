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

import assert, { fail } from "assert";
import NanoServer from '../../../testing-server/server.js';
import PuppeteerController from '../../../../src/browserControllers/puppeteer/puppeteerController.js';

describe('PuppeteerController Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081/';

    before(async () => {
        await testingServer.start();
    });

    describe('Initialize Puppeteer', () => {

        it('Create a configured browser and page instances', async () => {
            const result = PuppeteerController.initialize('about:blank');
            await assert.doesNotReject(result);
            await PuppeteerController.close();
        });

    });

    describe('Close Puppeteer connections', () => {
        
        it('Close browser and page', async () => {
            await PuppeteerController.initialize('about:blank');
            const result = PuppeteerController.close();
            await assert.doesNotReject(result);
        });

    });

    describe('Evaluate', () => {

        let identifier;

        beforeEach(async () => {
            identifier = await PuppeteerController.initialize('about:blank');
        });

        it('Execute a function in browser context', async () => {
            const result = await PuppeteerController.evaluate(identifier, () => {
                return 2+2;
            });

            assert.strictEqual(result, 4);
        });

        it('Execute an async function in browser context', async () => {
            const result = await PuppeteerController.evaluate(identifier, async () => {
                return 2+2;
            });
            assert.strictEqual(result, 4);
        });

        it('Execute a faulty function in browser context', async () => {
            
            async function failWithMessage() {
                return await PuppeteerController.evaluate(identifier, () => {
                    throw new Error('Custom function failed.');
                });
            }

            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Function execution failed with the following message: /
            });
        });

        afterEach(async () => {
            await PuppeteerController.close();
        });

    });

    describe('Execute', () => {
        
        let identifier;

        beforeEach(async () => {
            identifier = await PuppeteerController.initialize('about:blank');
        });

        it('Execute a function in browser context', async () => {

            const result = await PuppeteerController.execute(identifier, async (browser, page) => {
                return await page.evaluate(() => {
                    return 2+2;
                });
            });

            assert.strictEqual(result, 4);
        });

        it('Execute an async function in browser context', async () => {

            const result = await PuppeteerController.execute(identifier, async (browser, page) => {
                return await page.evaluate(async () => {
                    return 2+2;
                });
            });

            assert.strictEqual(result, 4);
        });

        it('Execute a faulty function in browser context', async () => {

            async function failWithMessage() {
                return await PuppeteerController.execute(identifier, async (browser, page) => {
                    return await page.evaluate(async () => {
                        throw new Error('Custom function failed');
                    });
                });
            }

            await assert.rejects(failWithMessage, {
                name: 'Error',
                message: /Function execution failed with the following message: /
            });
        });

        afterEach(async () => {
            await PuppeteerController.close();
        });
    });

    describe('Inject', () => {

        let identifier;
        beforeEach(async () => {
            identifier = await PuppeteerController.initialize('about:blank');
        });

        describe('Inject function', () => {
            it('Inject a function in browser context', async () => {
                await PuppeteerController.inject(identifier, function sum(num1, num2) {
                    return num1+num2;
                });
    
                const result = await PuppeteerController.evaluate(identifier, () => {
                    return sum(2, 2);
                });
    
                assert.strictEqual(result, 4);
            });
    
            it('Inject an async function in browser context', async () => {
                await PuppeteerController.inject(identifier, async function sum(num1, num2) {
                    return num1+num2;
                });
    
                const result = await PuppeteerController.evaluate(identifier, async () => {
                    return await sum(2, 2);
                });
    
                assert.strictEqual(result, 4);
            });
    
            it('Inject a faulty function in browser context', async () => {
                await PuppeteerController.inject(identifier, async function sum(num1, num2) {
                    throw new Error('Injected function failed.');
                });
    
                async function failWithMessage() {
                    return await PuppeteerController.evaluate(identifier, async () => {
                        return await sum(2, 2);
                    });
                }
    
                await assert.rejects(failWithMessage, {
                    name: 'Error',
                    message: /Function execution failed with the following message: /
                });
            });
        });

        describe('Inject class', () => {

            it('Inject a class', async () => {
                class Test {
                    static sum(num1, num2) {
                        return num1 + num2;
                    }
                }

                await PuppeteerController.inject(identifier, Test);
                const result = await PuppeteerController.evaluate(identifier, () => {
                    return Test.sum(2, 2);
                });

                assert.strictEqual(result, 4);
            });
        });

        afterEach(async () => {
            await PuppeteerController.close();
        });
    });

    describe('Expose', () => {

        let identifier;

        beforeEach(async () => {
            identifier = await PuppeteerController.initialize('about:blank');
        });

        describe('Expose function', () => {
            it('Expose a function in browser context', async () => {
                await PuppeteerController.expose(identifier, function sum(num1, num2) {
                    return num1+num2;
                });
    
                const result = await PuppeteerController.evaluate(identifier, async () => {
                    return await sum(2, 2);
                });
    
                assert.strictEqual(result, 4);
            });
    
            it('Expose an async function in browser context', async () => {
                await PuppeteerController.expose(identifier, async function sum(num1, num2) {
                    return num1+num2;
                });
    
                const result = await PuppeteerController.evaluate(identifier, async () => {
                    return await sum(2, 2);
                });
    
                assert.strictEqual(result, 4);
            });
    
            it('Expose a faulty function in browser context', async () => {
                await PuppeteerController.expose(identifier, async function sum(num1, num2) {
                    throw new Error('Injected function failed.');
                });
    
                async function failWithMessage() {
                    return await PuppeteerController.evaluate(identifier, async () => {
                        return await sum(2, 2);
                    });
                }
    
                await assert.rejects(failWithMessage, {
                    name: 'Error',
                    message: /Function execution failed with the following message: /
                });
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