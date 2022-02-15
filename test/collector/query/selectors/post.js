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

import Impressionist from '../../../../src/process.js';
import NanoServer from '../../../testing-server/server.js';
import assert from 'assert';
import { Context } from '../../../../lib/index.js';

describe('Selector - Post', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('Errors', () => {

        it('Passing a context not instance of Context', async () => {
            
            async function missingThrowError() {    
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => {
                        return await new Post((context) => context).call({ context: 'fake' });
                    });
                });
            }

            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /Post - The context is not an instance of Context class./
            });

        });

        it('Passing no function definition', async () => {

            async function missingThrowError() {    
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => {
                        return await new Post(123).call(new Context());
                    });
                });
            }
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /Post - Constructor definition should be a function. Instead it received a number./
            });

        });

    });


    after(async () => {
        await testingServer.stop();
    });

});