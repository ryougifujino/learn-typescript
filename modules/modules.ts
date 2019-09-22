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

