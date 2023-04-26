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
import Impressionist from '../../src/process.js';
import NanoServer from '../testing-server/server.js';

describe('Scraping with local testing page and Select Options', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it('Scrape Test Page using select()', async () => {

        const result = await Impressionist.execute(url, async (browser, page) => {

            return await page.evaluate( async () => {

                const data = collector({
                    name: select('h1'),
                    reviews: elements('{#reviews > ul > li}*').iterate({
                        title: select('#review-title'),
                        author: select('#review-author'),
                        rating: select('#review-rating'),
                        date: select('#review-date'),
                        body: select('#review-body')
                    }),
                });

                return await data.call();
            });
        });
        
        assert.deepStrictEqual(result, {"name":"Plato Plugin","reviews":[{"title":"It is okay","author":"John Doe","rating":"4","date":"01-12-2021","body":"Nice product. I would recommend the version X."},{"title":"Amazing!","author":"Richard Roe","rating":"5","date":"10-12-2021","body":"Really good product."}]});
    });

    it('Scrape Test Page using select() and default', async () => {

        const result = await Impressionist.execute(url, async (browser, page) => {

            return await page.evaluate( async () => {

                const data = collector({
                    name: select('h0').default('Default plugin name'),
                    reviews: elements('{#reviews > ul > li}*').iterate({
                        title: select('#review-title').default('Default title'),
                        author: select('#review-author'),
                        rating: select('#review-rating'),
                        date: select('#review-date'),
                        body: select('#review-body')
                    }),
                });

                return await data.call();
            });
        });
        
        assert.deepStrictEqual(result, {"name":"Default plugin name","reviews":[{"title":"It is okay","author":"John Doe","rating":"4","date":"01-12-2021","body":"Nice product. I would recommend the version X."},{"title":"Amazing!","author":"Richard Roe","rating":"5","date":"10-12-2021","body":"Really good product."}]});
    });

    it('Should throw if selector fails and none default values has been set', async () => {

        async function failWithMessage() {
            await Impressionist.execute(url, async (browser, page) => {
    
                return await page.evaluate( async () => {
    
                    const data = collector({
                        name: select('h0'),
                        reviews: elements('{#reviews > ul > li}*').iterate({
                            title: select('#review-title').default('Default title'),
                            author: select('#review-author'),
                            rating: select('#review-rating'),
                            date: select('#review-date'),
                            body: select('#review-body')
                        }),
                    });
    
                    return await data.call();
                });
            });
        }
        
        await assert.rejects(failWithMessage, {
            name: 'Error',
            message: /Execution of query failed: Require - Query execution failed. Please check the chain or the selector./
        });
    });

    after(async () => {
        await testingServer.stop();
    });

});