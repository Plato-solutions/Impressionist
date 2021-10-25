import assert from "assert";
import Impressionist from '../../src/process.js';
import NanoServer from '../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('Main Scrape Test', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    let browser;
    let page;

    before(async () => {
        await testingServer.start();
    });

    it('Scrape Test Page', async () => {

        const result = await Impressionist.execute(url, async (browser, page) => {

            return await page.evaluate( async () => {

                const data = collector({
                    name: 'h1',
                    media_gallery: '#logo > img{src} + #carousel > img{src}*',
                    reviews: elements('{#reviews > ul > li}*').iterate({
                        title: '#review-title',
                        author: '#review-author',
                        rating: '#review-rating',
                        date: '#review-date',
                        body: '#review-body'
                    }),
                    bundles: options({
                        edition: '{#option-1}',
                        support: '{#option-2}',
                        installation: '{#option-3}',
                    }).iterate({
                        price: () => document.querySelector('#price').innerText
                    })
                });

                return await data.call();
            });
        });

        assert.deepStrictEqual(result, [{"name":"Plato Plugin","media_gallery":["http://platoanalytics.com/logo.jpg","http://platoanalytics.com/img1.jpg","http://platoanalytics.com/img2.jpg","http://platoanalytics.com/img3.jpg","http://platoanalytics.com/img4.jpg"],"reviews":[{"title":"It is okay","author":"John Doe","rating":"4","date":"01-12-2021","body":"Nice product. I would recommend the version X."},{"title":"Amazing!","author":"Richard Roe","rating":"5","date":"10-12-2021","body":"Really good product."}],"bundles":[{"edition":"val-10","support":"val-40","installation":"val-60","price":"110"},{"edition":"val-10","support":"val-40","installation":"val-70","price":"120"},{"edition":"val-10","support":"val-40","installation":"val-80","price":"130"},{"edition":"val-10","support":"val-50","installation":"val-60","price":"120"},{"edition":"val-10","support":"val-50","installation":"val-70","price":"130"},{"edition":"val-10","support":"val-50","installation":"val-80","price":"140"},{"edition":"val-20","support":"val-40","installation":"val-60","price":"120"},{"edition":"val-20","support":"val-40","installation":"val-70","price":"130"},{"edition":"val-20","support":"val-40","installation":"val-80","price":"140"},{"edition":"val-20","support":"val-50","installation":"val-60","price":"130"},{"edition":"val-20","support":"val-50","installation":"val-70","price":"140"},{"edition":"val-20","support":"val-50","installation":"val-80","price":"150"},{"edition":"val-30","support":"val-40","installation":"val-60","price":"130"},{"edition":"val-30","support":"val-40","installation":"val-70","price":"140"},{"edition":"val-30","support":"val-40","installation":"val-80","price":"150"},{"edition":"val-30","support":"val-50","installation":"val-60","price":"140"},{"edition":"val-30","support":"val-50","installation":"val-70","price":"150"},{"edition":"val-30","support":"val-50","installation":"val-80","price":"160"}]}]);
    });

    after(async () => {
        await testingServer.stop();
    });

});