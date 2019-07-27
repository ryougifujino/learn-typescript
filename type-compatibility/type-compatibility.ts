/** Introduction */
interface Named {
    name: string
}

class Person {
    name: string
}

// structural typing
let p: Named = new Person();

/** Starting out */
let x: Named;
let y = {name: "Alice", location: "Settle"};
x = y;

/** Comparing two functions */
// differ only in their parameter lists:
let x2 = (a: number) => 0;
let y2 = (b: number, s: string) => 0;
y2 = x2;    // OK
// x2 = y2;    // Error

// differ only by their return type:
let x3 = () => ({name: "Alice"});
let y3 = () => ({name: "Alice", location: "Seattle"});

x3 = y3; // OK
// y3 = x3; // Error, because x() lacks a location property

// Function parameter bivariance
interface EventPlus {
    timestamp: number
}

interface MouseEventPro extends EventPlus {
    x: number;
    y: number
}

interface KeyEventPlus extends EventPlus {
    keyCode: number
}

function listenEvent(handler: (e: EventPlus) => void) {
    handler({timestamp: 300});
}

// Unsound, but useful and common
listenEvent((e: MouseEventPro) => console.log(e.x, e.y));
// Undesirable alternatives in presence of soundness
listenEvent((e: EventPlus) => console.log((<MouseEventPro>e).x + ',' + (<MouseEventPro>e).y));
listenEvent(<(e: EventPlus) => void>((e: MouseEventPro) => console.log(e.x, e.y)));

// Optional Parameters and Rest Parameters
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    callback(args);
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x, y));
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x, y));

/** Enums */
enum Status { Ready, Waiting }

enum Color { Red, Blue, Green }

let s = Status.Ready;

// s = Color.Red;  // Error

/** Classes */
// only members of the instance are compared
class Animal {
    feet: number;

    constructor(name: string, numFeet: number) {
    }
}

class Size {
    feet: number;

    constructor(numFeet: number) {

    }
}

class Length {
    feet: number;
    private size: number;
}

let animal: Animal;
let size: Size;
let len: Length;

animal = size;
size = animal;

// len = size;     // Error

/** Generics */
interface Empty<T> {
}

let xe: Empty<number>;
let ye: Empty<string>;

xe = ye;

// ---

interface NotEmpty<T> {
    data: T;
}

let xne: NotEmpty<number>;
let yne: NotEmpty<string>;

// xne = yne;  // Error

// For generic types that do not have their type arguments specified
let identity = function <T>(x: T): T {
    // ...
    return x;
};

let reverse = function <U>(y: U): U {
    // ...
    return y;
};

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
