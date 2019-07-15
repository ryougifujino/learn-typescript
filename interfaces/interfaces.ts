/** Our First Interface */
// example1
function printLabel(labelObject: { label: string }) {
    console.log(labelObject.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);  // OK
// printLabel({size: 10, label: "I am label"});    // Error

// example2
interface LabelValue {
    label: string
}

function printLabel2(labelObject: LabelValue) {
    console.log(labelObject.label);
}

printLabel2(myObj); // OK
// printLabel2({size: 10, label: "I am label"});   // Error

/** Optional Properties */
interface SquareConfig {
    color?: string;
    area?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    const newSquare = {color: '', area: 0};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.area) {
        newSquare.area = config.area;
    }
    return newSquare;
}

console.log(createSquare({color: 'Red'}));  // { color: 'Red', area: 0 }

/** Readonly properties */
interface Point {
    readonly x: number;
    readonly y: number;
}

let a: Point[] = [{x: 0, y: 0}, {x: 1, y: 1}];
let ro: ReadonlyArray<Point> = a;
// ro.push({x: 2, y: 2});  // Error
// a = ro; // Error
a = ro as Point[];
a.push({x: 3, y: 3});
console.log(a); // [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 3 } ]

/** Excess Property Checks */
let c = {colour: 'red', area: 100};
createSquare(c);    // OK
// createSquare({colour: 'red', area: 100});  // Error
createSquare({colour: 'red', width: 100} as SquareConfig);  // OK

// index signatures
interface SquareConfig2 {
    color?: string;
    area?: number;

    [propName: string]: any;
}

function createSquare2(squareConfig: SquareConfig2) {

}

createSquare2({colour: 'red', width: 100});

/** Function Types */
interface SearchFunc {
    (source: string, substring: string): boolean;
}

let mySearch: SearchFunc = function (source: string, substring: string): boolean {
    return true;
};
mySearch = function (foo, bar) {
    return true;
};

/** Indexable Types */
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ['a', 'b'];
let myStr: string = myArray[0];
// This index signature states that when a StringArray is indexed with a number,
// it will return a string.

// It is possible to support both types of indexers
class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

interface NotOkay {
    // the type returned from a numeric indexer must be a subtype of the type returned from the
    // string indexer.
    [x: number]: Dog;

    [x: string]: Animal;
}

/** Class Types */
// Implementing an interface
interface ClockInterface {
    currentTime: Date;

    setTime(date: Date): void;
}

class Clock implements ClockInterface {
    currentTime = new Date();

    setTime(date: Date): void {
        this.currentTime = date;
    }
}

// Difference between the static and instance sides of classes
interface ClockConstructor {
    new(hour: number, minute: number);
}

// class Clock2 implements ClockConstructor {  // Error
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }
// This is because when a class implements an interface, only the instance side of the class is
// checked. Since the constructor sits in the static side, it is not included in this check.
const Clock2: ClockConstructor = class Clock implements ClockInterface {
    currentTime: Date;

    setTime(date: Date): void {
    }

    constructor(h: number, m: number) {

    }
};

/** Extending Interfaces */
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = 'Red';
square.penWidth = 2;
square.sideLength = 3;

/** Hybrid Types */
interface Counter {
    (start: number): string;

    interval: number;

    reset(): void;
}

function getCounter(): Counter {
    const counter = (start => "foo") as Counter;
    counter.interval = 123;
    counter.reset = () => undefined;
    return counter;
}

let counter = getCounter();
counter(10);
console.log(counter.interval);
counter.reset();

/** Interfaces Extending Classes */
class A {
    private state: boolean;
}

class B extends A {

}

let b = new B();
// b.state;    // Error

// When an interface type extends a class type it inherits the members of the class but not their
// implementations.
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select(): void {
    }
}

class TextBox extends Control {
    select() {
    }
}

let button: SelectableControl = new Button();
let textBox: SelectableControl = new TextBox();