function plunk<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

let makeAndModel: string[] = plunk(taxi, ['manufacturer', 'model']);

let modelYear: (string | number)[] = plunk(taxi, ['manufacturer', 'year']);

// - Index types and index signatures
interface Dictionary<T> {
    [key: string]: T;
}

let keys: keyof Dictionary<number>;      // string | number

let value: Dictionary<number>['foo'];   // number

// If you have a type with a number index signature, keyof T will just be number.
interface Dictionary2<T> {
    [key: number]: T;
}

let keys2: keyof Dictionary<number>;    // number