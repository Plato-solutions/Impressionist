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
import { Context } from "../../../lib/index.js";
import Impressionist from '../../../src/process.js';
import NanoServer from '../../testing-server/server.js';

describe('ElementCollectorFactory Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it('Return a list of Elements', async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => {

                const result = await new ElementCollectorFactory(
                    css('#reviews > ul > li').all()
                ).call(new Context());
    
                let values = [];
    
                for await(let el of result[0]) {
                    values.push(el);
                }
    
                return values.length;
            });
        });

        assert.strictEqual(result, 2);
    });

    it('Return an empty array because non-existing DOM elements', async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => {
                const result = await new ElementCollectorFactory('{#reviews > ul > la}*').call(new Context());
                
                let values = [];
    
                for await(let el of result[0]) {
                    values.push(el);
                }
    
                return values.length;
            });
        });

        assert.strictEqual(result, 0);
    });

    after(async () => {
        await testingServer.stop();
    });

});