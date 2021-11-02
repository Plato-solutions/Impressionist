class LazyLoadHandler {

    static async execute(buttonSelector) {

        const nextButton = document.querySelector(buttonSelector);

        while(nextButton && !(nextButton?.disabled)) {
            
            try {
                await puppeteerClick(buttonSelector);
            } catch {
                nextButton.click();
            }
            
        }
    }
}

export default LazyLoadHandler;