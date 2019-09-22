const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator {
    isAcceptable(s: string): boolean {
        return s.length === 5 && numberRegexp.test(s);
    }
}

export = ZipCodeValidator;