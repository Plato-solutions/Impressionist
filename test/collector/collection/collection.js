import assert from "assert";
import * as Impressionist from '../../../src/index.js';
import NanoServer from '../../testing-server/server.js';
import puppeteer from 'puppeteer';

describe('Collection Class', () => {

    const testingServer = new NanoServer();
    const url = 'http://localhost:8081';

    let browser;
    let page;

    before(async () => {
        await testingServer.start();
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
        await Impressionist.Process.setPageConfigurations(page, url);
    });

    describe('Error', () => {
        it('Adding a faulty post processor', async () => {
            
            async function throwError() {
                await page.evaluate( async () => {
                    const data = ( function () {
            
                        return new Collection({
                            name: 'h1'
                        }).postProcessor( () => {
                            throw new Error('Faulty function');
                        });
                        
                    } )();
                    
                    const context = new Context();
                    return await data.call(context);
                });
            }
    
            await assert.rejects(throwError, {
                name: 'Error',
                message: /Collection - Execution of PostProcessor failed with the following message:/
            });
        });
    });

    describe('Execution', () => {

        it('Execute - Receives a Query', async () => {
            const result = await page.evaluate( async () => {
                const data = ( function () {
        
                    const css = SelectorDirectory.get('css');
        
                    return new Collection({
                        name: css('h1').property('innerText').single()
                    });
                    
                } )();
                
                const context = new Context();
                return await data.call(context);
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });
    
        it('Execute - Receives a function', async () => {
            const result = await page.evaluate( async () => {
                
                const data = new Collection({
                    name: () => 'Plato Plugin'
                });
                    
                const context = new Context();
                return await data.call(context);
    
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });
    
        it('Execute - Receives a string', async () => {
            const result = await page.evaluate( async () => {
                
                const data = new Collection({
                    name: 'h1'
                });
                    
                const context = new Context();
                return await data.call(context);
    
            });
    
            assert.deepStrictEqual(result, {
                name: 'Plato Plugin'
            });
        });

    });

    after(async () => {
        await page.close();
        await browser.close();
        await testingServer.stop();
    });

});