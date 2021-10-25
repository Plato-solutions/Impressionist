/**
 * Handles the pagination of an HTML section.
 */
class Pagination {

    /**
     * Create a generator object with the new rendered document.
     * @param { string } buttonSelector - CSS selector of the button that triggers the action
     * to go to the next pagination.
     * @param { number } [time=300] - Delay time for rendering the document object.
     */
    static async * run(buttonSelector, time = 300) {
                
        function sleep() {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, time);
            })
        }

        let nextButton = null;

        do {
            yield document;
            
            nextButton = document.querySelector(buttonSelector);
            
            try {
                await puppeteerClick(buttonSelector);
            } catch {
                nextButton.click?.();
            }
            
            await sleep();
        } while(nextButton);
    }

}

export default Pagination;