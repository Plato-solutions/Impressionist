/**
 * 
 * @param { Object } page - Page instance.
 * @param { Object } [options] - Options. Default is { selector: 'body', timeout: 200, jumps: 200 }.
 * @param { string } [options.selector = body] - CSS Selector of an element which its bounding box covers
 * the total height of the visible page. Default is 'body'.
 * @param { number } [options.timeout = 200] - Time in miliseconds to wait between each scroll movement. Default is 200.
 * @param { number } [options.jumps = 200] - Number of pixels to jump on every scroll movement. Default is 200.
 */
async function scrollPage(page, { selector = 'body', timeout = 200, jumps = 200 } = {}) {
    const element = await page.$(selector);
    let boundingBox = await element.boundingBox();
    const pageViewPort = page.viewport();

    let pixels = jumps;
    while((boundingBox.y * -1) + pageViewPort.height < boundingBox.height) {
        await page.mouse.wheel({ deltaY: pixels });
        boundingBox = await element.boundingBox();
        await page.waitForTimeout(timeout);
        pixels = pixels+jumps;
    }
}

export default scrollPage;