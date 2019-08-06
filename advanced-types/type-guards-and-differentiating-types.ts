interface Bird {
    fly();

    layEggs();
}

interface Fish {
    swim();

    layEggs();
}

let smallPet: Bird | Fish = {
    fly: () => void console.log("flying~"),
    layEggs() {
    }
};

if ((smallPet as Bird).fly) {
    smallPet.fly();
} else if ((smallPet as (Bird | Fish) as Fish).swim) {
    (smallPet as Bird | Fish as Fish).swim();
}

// reset
smallPet = smallPet as (Bird | Fish);

// User-Defined Type Guards
// - Using type predicates
function isBird(pet: Bird | Fish): pet is Bird {
    return (pet as Bird).fly !== undefined;
}

if (isBird(smallPet)) {
    smallPet.fly();
} else {
    smallPet.swim();
}

// - Using the in operator
if ("fly" in smallPet) {
    smallPet.fly();
} else {
    smallPet.swim();
}

// typeof type guards
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === 'string';
}

// need't
function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// TypeScript will recognize it as a type guard
function padLeft2(value: string, padding: string | number) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(" ") + value;
    }

    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// instance of type guards
interface Padder {

}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace: number) {
    }
}

class StringPadder implements Padder {
    constructor(private value: string) {

    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ? new SpaceRepeatingPadder(5) : new StringPadder("");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
}

