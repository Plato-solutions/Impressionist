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

describe('Query Strings', () => {
    
    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    before(async () => {
        await testingServer.start();
    });

    it("css('h1').property('innerText').single()", async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    name: css('h1').property('innerText').single()
                }).call(new Context());
            });
        });
    
        assert.deepStrictEqual(result, { name: 'Plato Plugin' });
    });

    it("css('h1').property('innerText').all()", async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    name: css('h1').property('innerText').all()
                }).call(new Context());
            });
        });
        
        assert.deepStrictEqual(result, { name: ['Plato Plugin'] });
    });

    it("xpath('//h1').property('innerText').all()", async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    name: xpath('//h1').property('innerText').all()
                }).call(new Context());
            });
        });
        
        assert.deepStrictEqual(result, { name: ['Plato Plugin'] });
    });

    it("merge([ css('#logo > img').property('src').all(), css('#carousel > img').property('src').all() ]).all()", async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    media_gallery: merge([ css('#logo > img').property('src').all(), css('#carousel > img').property('src').all() ]).all()
                }).call(new Context());
            });
        });

        assert.deepStrictEqual(result, { media_gallery: ["http://platoanalytics.com/logo.jpg", "http://platoanalytics.com/img1.jpg", "http://platoanalytics.com/img2.jpg", "http://platoanalytics.com/img3.jpg", "http://platoanalytics.com/img4.jpg"] });
    });

    it("merge([ css('#logo > img').all(), css('#carousel > img').all() ]).property('src').all()", async () => {
        
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    media_gallery: merge([ css('#logo > img').all(), css('#carousel > img').all() ]).property('src').all()
                }).call(new Context());
            });
        });

        assert.deepStrictEqual(result, { media_gallery: ["http://platoanalytics.com/logo.jpg", "http://platoanalytics.com/img1.jpg", "http://platoanalytics.com/img2.jpg", "http://platoanalytics.com/img3.jpg", "http://platoanalytics.com/img4.jpg"] });
    });

    it("css('').all({})", async () => {
            
        const result = await Impressionist.execute(url, async(browser, page) => {
            return await page.evaluate(async () => { 
                return await new Collection({
                    reviews: css('div#reviews > ul > li').all({
                        author: css('#review-author').property('innerText').single(),
                        title: css('#review-title').property('innerText').single(),
                        rating: css('#review-rating').property('innerText').single(),
                        body: css('#review-body').property('innerText').single(),
                        date: css('#review-date').property('innerText').single()
                    })
                }).call(new Context());
            });
        });
        
        assert.deepStrictEqual(result, {
            reviews: [
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
            ]
        });
    });

    describe('Using Default function', () => {

        it("css('h0').property('innerText').single().default()", async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h0').property('innerText').single().default('')
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: '' });
        });
    
        it("css('h0').property('innerText').all().default()", async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h0').property('innerText').all().default('')
                    }).call(new Context());
                });
            });
            
            assert.deepStrictEqual(result, { name: '' });
        });
    
        it("xpath('//h1'0.property('innerText').all().default()", async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: xpath('//h0').property('innerText').all().default('')
                    }).call(new Context());
                });
            });
            
            assert.deepStrictEqual(result, { name: '' });
        });
    
        it("merge([ css('#logo > imga').property('src').all().default([]), css('#carousel > imga').property('src').all().default([]) ]).all().default([])", async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        media_gallery: merge([ css('#logo > imga').property('src').all().default([]), css('#carousel > imga').property('src').all().default([]) ]).all().default([])
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, { media_gallery: [] });
        });
    
        it("merge([ css('#logo > imga').all().default([]), css('#carousel > imga').all().default([]) ]).property('src').all().default([])", async () => {
            
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        media_gallery: merge([ css('#logo > imga').all().default([]), css('#carousel > imga').all().default([]) ]).property('src').all().default([])
                    }).call(new Context());
                });
            });
    
            assert.deepStrictEqual(result, { media_gallery: [] });
        });
    
        it("css('').all({}).default()", async () => {
                
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        reviews: css('div#reviews > ul > lii').all({
                            author: css('#review-author').property('innerText').single(),
                            title: css('#review-title').property('innerText').single(),
                            rating: css('#review-rating').property('innerText').single(),
                            body: css('#review-body').property('innerText').single(),
                            date: css('#review-date').property('innerText').single()
                        }).default([])
                    }).call(new Context());
                });
            });
            
            assert.deepStrictEqual(result, {
                reviews: []
            });
        });

    });

    describe('Using Alternatives', () => {

        describe('CSS alternatives', () => {

            it("css('h0').alt('h1').property('innerText').single()", async () => {
                
                const result = await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('h0').alt('h1').property('innerText').single()
                        }).call(new Context());
                    });
                });
            
                assert.deepStrictEqual(result, { name: 'Plato Plugin' });
            });
        
            it("css('h0').alt('h1').property('innerText').all()", async () => {
                
                const result = await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('h0').alt('h1').property('innerText').all()
                        }).call(new Context());
                    });
                });
                
                assert.deepStrictEqual(result, { name: ['Plato Plugin'] });
            });

        });
        
        describe('XPATH alternatives', () => {
            it("xpath('//h0').alt('//h1').property('innerText').all()", async () => {
                
                const result = await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: xpath('//h0').alt('//h1').property('innerText').all()
                        }).call(new Context());
                    });
                });
                
                assert.deepStrictEqual(result, { name: ['Plato Plugin'] });
            });
        });
        
        describe('PROPERTY alternatives', () => {

            it("css('h1').property('noText').alt('innerText').single()", async () => {
                
                const result = await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('h1').property('noText').alt('innerText').single()
                        }).call(new Context());
                    });
                });
            
                assert.deepStrictEqual(result, { name: 'Plato Plugin' });
            });
        
            it("css('h1').property('noText').alt('innerText').all()", async () => {
                
                const result = await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('h1').property('noText').alt('innerText').all()
                        }).call(new Context());
                    });
                });
                
                assert.deepStrictEqual(result, { name: ['Plato Plugin'] });
            });

        });
    });

    describe('Single as default', () => {
        it('Getting the innerText of a single element', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h1').property('innerText')
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: 'Plato Plugin' });
        });

        it('Getting the innerText of a non-existing element use with default', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h0').property('innerText').default('Plugin')
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: 'Plugin' });
        });

        it('Getting the innerText of a non-existing element use with alternative', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h0').alt('h1').property('innerText')
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: 'Plato Plugin' });
        });

        it('Getting the innerText of a non-existing element use with require', async () => {
            
            async function throwError() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('h0').property('innerText').require()
                        }).call(new Context());
                    });
                });
            }
        
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Require - Query execution failed. Please check the chain or the selector./
            });
        });

        it('Getting the innerText of multiple elements and return error', async () => {
            
            async function throwError() {
                return await Impressionist.execute(url, async(browser, page) => {
                    return await page.evaluate(async () => { 
                        return await new Collection({
                            name: css('#carousel > img').property('src')
                        }).call(new Context());
                    });
                });
            }
            
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Single - There are more than one element that matched the Query definition./
            });
        });

    });

    describe('Using Pre', () => {
        
        it('Change the h1 text before extract it', async () => {
        
            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: pre((context) => { document.querySelector('h1').innerText = 'Plato Plugin Modified'; return context }).css('h1').property('innerText').single()
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: 'Plato Plugin Modified' });
        });
    });

    describe('Using Post', () => {
        
        it('Change the h1 text after extract it', async () => {

            const result = await Impressionist.execute(url, async(browser, page) => {
                return await page.evaluate(async () => { 
                    return await new Collection({
                        name: css('h1').property('innerText').single().post((text) => text.split(' '))
                    }).call(new Context());
                });
            });
        
            assert.deepStrictEqual(result, { name: ['Plato', 'Plugin'] });
        });
    });

    after(async () => {
        await testingServer.stop();
    });

});