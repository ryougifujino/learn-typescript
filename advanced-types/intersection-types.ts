// An intersection type combines multiple types into one.
function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (<First>result)[prop] = first[prop];
        }
    }

    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (<Second>result)[prop] = second[prop];
        }
    }

    return result as First & Second;
}

class Person {
    constructor(public name: string) {
    }
}

interface Loggable {
    log(name: string): void;
}

class ConsoleLogger implements Loggable {
    log(name: string): void {
        console.log(`My name is ${name}`);
    }
}

let jim = extend(new Person("jim"), ConsoleLogger.prototype);
jim.log(jim.name);

