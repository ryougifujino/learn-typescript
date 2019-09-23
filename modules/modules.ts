/** Export */
// Re-exports
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from './ZipCodeValidator'

// 如同中转站，等于转发Export
export * from "./StringValidator"; // exports 'StringValidator' interface
export * from "./ZipCodeValidator";  // exports 'ZipCodeValidator' and const 'numberRegexp' class

/** Import */
// Import the entire module into a single variable
import * as validator from './ZipCodeValidator';

validator.numberRegexp.test('0');
const zipCodeValidator = new validator.ZipCodeValidator();
zipCodeValidator.isAcceptable('0');

/** export = and import = require() */
import Zip = require("./ZipCodeValidator2");

const zipValidator = new Zip();

/** Optional Module Loading and Other Advanced Loading Scenarios */
// Dynamic Module Loading in Node.js
declare function require(moduleName: string): any;

// For this pattern to work, it’s important that the symbol defined via an import is only used in
// type positions (i.e. never in a position that would be emitted into the JavaScript).
import {ZipCodeValidator as Zip2} from "./ZipCodeValidator";

let needZipValidation;
if (needZipValidation) {
    let ZipCodeValidator: typeof Zip2 = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */
    }
}