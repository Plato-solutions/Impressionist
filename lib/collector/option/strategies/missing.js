/**
 * Default strategy.
 */
class MissingStrategy {
    
    static async getOptions() {
        return [];
    }

    static async setOption() {
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

    static match() {
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

}

export default MissingStrategy;