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
  * Returns an error.
  */
  class InterpreterMissingStrategy {
 
     /**
      * Throws an error to inform that the Select String or selector could not be interpreted.
      * @param { string } selector - A selector that represents a DOM element.
      */
     static interpret(selector) {
         throw new Error(`Unable to interpret the Select String: ${selector}`);
     }
 
     /**
      * Determine if the specific strategy can process the custom selector.
      * @param { string } selector - A selector that represents a DOM element.
      * @returns { Boolean }
      */
     static match(selector) {
         return true;
     }
 
 }
 
 export default InterpreterMissingStrategy;