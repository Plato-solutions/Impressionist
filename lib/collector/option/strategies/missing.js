/**
 * Default strategy.
 */
class MissingStrategy {
    
    static async getOptions(identifier, element) {
        return [{ value: null, [identifier]: null }];
    }

    static async setOption() {
        return true;
    }

    static match() {
        throw new Error('None of the available strategies work for the item entered. Try entering custom functions.');
    }

}

export default MissingStrategy;