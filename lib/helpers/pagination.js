class Pagination {

    static async * run(selector, time = 300) {
                
        function sleep() {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, time);
            })
        }

        let nextBtnSelector = null;

        do {
            yield document;
            nextBtnSelector = document.querySelector(selector);
            nextBtnSelector?.click();
            await sleep();
        } while(nextBtnSelector);
    }

}

export default Pagination;