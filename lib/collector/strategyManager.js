/*
 Copyright 2021 Plato Solutions, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Provides a common method to share across the different strategies managers.
 */
class StrategyManager {

    /**
     * Search or look up the best strategy.
     * @param { Any } element - A criterion to be evaluated. 
     * @param { Set<object> } strategies - Available strategies.
     * @returns { Promise<object> } An object that represents a promise for a specific strategy.
     */
    static lookUp(element, strategies) {
        let matchedStrategy;

        strategies.forEach(strategy => {
            if(strategy.match(element)) { 
                matchedStrategy=strategy;
            }
        })

        return matchedStrategy;
    }

}

export default StrategyManager;