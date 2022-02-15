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
import { Context } from "../../lib/index.js";
import Impressionist from '../../src/process.js';
import NanoServer from '../testing-server/server.js';

describe('Collector Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    describe('Basic usage', () => {

        it('Process a Collection', async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    return await new Collector(
                        new Collection({
                            name: css('h1').property('innerText').single(),
                            media_gallery: merge([ css('#logo > img').all(), css('#carousel > img').all() ]).property('src').all(),
                        })
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
    
        it('Process a Collection with an iterable', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    return await new Collector(
                        new IterableAccessor(
                            new Collection({
                                reviews: css('div#reviews > ul > li').all()
                            }).postProcessor(CollectionElementProcessor)
                        ),
                        new Collection({
                            author: css('#review-author').property('innerText').single(),
                            title: css('#review-title').property('innerText').single(),
                            rating: css('#review-rating').property('innerText').single(),
                            body: css('#review-body').property('innerText').single(),
                            date: css('#review-date').property('innerText').single()
                        })
                    ).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, [
                {
                    author: 'John Doe',
                    title: 'It is okay',
                    rating: '4',
                    body: 'Nice product. I would recommend the version X.',
                    date: '01-12-2021'
                },
                {
                    author: 'Richard Roe',
                    title: 'Amazing!',
                    rating: '5',
                    body: 'Really good product.',
                    date: '10-12-2021'
                }
            ]);
        });

    });

    describe('iterate method', () => {

        it('Using the ElementCollectorFactory', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => {
                    return new ElementCollectorFactory(css('#reviews > ul > li').all()).iterate({
                        author: css('#review-author').property('innerText').single(),
                        title: css('#review-title').property('innerText').single(),
                        rating: css('#review-rating').property('innerText').single(),
                        body: css('#review-body').property('innerText').single(),
                        date: css('#review-date').property('innerText').single()
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, [
                {
                    author: 'John Doe',
                    title: 'It is okay',
                    rating: '4',
                    body: 'Nice product. I would recommend the version X.',
                    date: '01-12-2021'
                },
                {
                    author: 'Richard Roe',
                    title: 'Amazing!',
                    rating: '5',
                    body: 'Really good product.',
                    date: '10-12-2021'
                }
            ]);
        });
    });

    after(async () => {
        await testingServer.stop();
    });

});