/**
 * Default strategy.
 */
class MissingStrategy {
    
    static async getOptions() { // TODO: Return empty array.
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

    static async setOption() {
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

    static match() {
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

}

export default MissingStrategy;