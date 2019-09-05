/** Export */
// Re-exports
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from './ZipCodeValidator'

// 如同中转站，等于转发Export
export * from "./StringValidator"; // exports 'StringValidator' interface
export * from "./ZipCodeValidator";  // exports 'ZipCodeValidator' and const 'numberRegexp' class