class InfiniteScroll {

    async run(buttonSelector) {

        while(document.querySelector(buttonSelector) && !(document.querySelector(buttonSelector)?.disabled)) {
            await page.click(nextButtonSelector);
        }
    }
}

export default InfiniteScroll;