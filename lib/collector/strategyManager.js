/**
 * Provides a common method to share across the different strategies managers.
 */
class StrategyManager {

    /**
     * Search or look up the best strategy.
     * @param { Any } element - A criterion to be evaluated. 
     * @param { Array<object> } strategies - Available strategies.
     * @returns { Promise<object> } An object that represents a promise for a specific strategy.
     */
    static lookUp(element, strategies) {

        let strategyFound = false;
        let strategyPosition = 0;
        let counter = 0;

        while(!strategyFound) {
            
            counter ++;
            strategyFound = strategies[counter].match(element);
            
            if(strategyFound) {
                strategyPosition = counter;
                break;
            }

            if(counter >= strategies.length -1) {
                break;
            }

        }

        return strategies[strategyPosition];

    }

}

export default StrategyManager;