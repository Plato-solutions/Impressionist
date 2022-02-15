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

describe('CollectorFactory - Collection', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it('Return a collection', async () => {
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => {
                return await new CollectionCollectorFactory(
                    new Collector(
                        new Collection({
                            test: () => document
                        }).postProcessor(CollectionElementProcessor)
                    ),
                    {
                        name: css('h1').property('innerText').single(),
                        media_gallery: merge([ css('#logo > img').all(), css('#carousel > img').all() ]).property('src').all(),
                    }
                ).call(new Context());
            });
        });

        assert.deepStrictEqual(result, [{
            name: 'Plato Plugin',
            media_gallery: [
                'http://platoanalytics.com/logo.jpg',
                'http://platoanalytics.com/img1.jpg',
                'http://platoanalytics.com/img2.jpg',
                'http://platoanalytics.com/img3.jpg',
                'http://platoanalytics.com/img4.jpg'
            ]
        }]);
    });

    after(async () => {
        await testingServer.stop();
    });

});