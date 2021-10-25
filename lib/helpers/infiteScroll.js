class InfiniteScroll {

    async run(buttonSelector) {

        const nextButton = document.querySelector(buttonSelector);

        while(nextButton && !(nextButton?.disabled)) {
            
            try {
                await page.click(nextButtonSelector);
            } catch {
                nextButton.click();
            }
            
        }
    }
}

export default InfiniteScroll;