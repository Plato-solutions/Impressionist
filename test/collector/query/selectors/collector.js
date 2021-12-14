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

describe.only('Selector - Collector', async () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';
    
    before(async () => {
        await testingServer.start();
    });

    describe('Errors', () => {

        it('Passing a context not instance of Context', async () => {
            
            async function missingThrowError() {    
                return Impressionist.execute(url, async (browser, page) => {
                    return await page.evaluate(async () => {
                        const selector = new CollectorSelector({ name: 'h1' });
                        return await selector.call({ context: 'fake' });
                    });
                });
            } 
            
            await assert.rejects(missingThrowError, {
                name: 'Error',
                message: /CollectorSelector - The context is not an instance of Context class./
            });

        });

    });

    describe('Execution', () => {

        it('Return an array with the object', async () => {

            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                    return await new CollectorSelector({ media_gallery: '#carousel > img{src}*' }).call();
                });
            });

            assert.deepStrictEqual(result, [{ media_gallery: ["http://platoanalytics.com/img1.jpg", "http://platoanalytics.com/img2.jpg", "http://platoanalytics.com/img3.jpg", "http://platoanalytics.com/img4.jpg"] }])
        });

        it('Return the object value', async () => {

            const result = await Impressionist.execute(url, async (browser, page) => {
                return await page.evaluate(async () => {
                    return await new CollectorSelector({ name: 'h1' }).single().call();
                });
            });

            assert.deepStrictEqual(result, { name: 'Plato Plugin' });
        });

    });

    after(async () => {
        await testingServer.stop();
    });

});