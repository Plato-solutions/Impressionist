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

describe('Scraping with local testing page and mixed Options', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it('Scrape Test Page', async () => {

        const result = await Impressionist.execute(url, async (browser, page) => {

            return await page.evaluate( async () => {

                const data = collector({
                    name: 'h1',
                    reviews: elements('{#reviews > ul > li}*').iterate({
                        title: '#review-title',
                        author: '#review-author',
                        rating: '#review-rating',
                        date: '#review-date',
                        body: '#review-body'
                    }),
                    bundles: options({
                        edition: '{#option-1}',
                        support: '{#div-2 > div}*',
                        installation: '{#toogle}',
                    }).iterate({
                        price: '::document > #price-div'
                    }).post(options => { 
                        return options.map(({edition, support, installation, price}) => {
                            return {edition, support, installation, price};
                        });
                    })
                });

                return await data.call();
            });
        });
        
        assert.deepStrictEqual(result, {"name":"Plato Plugin","reviews":[{"title":"It is okay","author":"John Doe","rating":"4","date":"01-12-2021","body":"Nice product. I would recommend the version X."},{"title":"Amazing!","author":"Richard Roe","rating":"5","date":"10-12-2021","body":"Really good product."}],"bundles":[{"edition":"val-10","support":"div-val-40","installation":true,"price":"110"},{"edition":"val-10","support":"div-val-40","price":"110"},{"edition":"val-10","support":"div-val-50","installation":true,"price":"120"},{"edition":"val-10","support":"div-val-50","price":"120"},{"edition":"val-20","support":"div-val-40","installation":true,"price":"110"},{"edition":"val-20","support":"div-val-40","price":"110"},{"edition":"val-20","support":"div-val-50","installation":true,"price":"120"},{"edition":"val-20","support":"div-val-50","price":"120"},{"edition":"val-30","support":"div-val-40","installation":true,"price":"110"},{"edition":"val-30","support":"div-val-40","price":"110"},{"edition":"val-30","support":"div-val-50","installation":true,"price":"120"},{"edition":"val-30","support":"div-val-50","price":"120"}]});
    });

    after(async () => {
        await testingServer.stop();
    });

});