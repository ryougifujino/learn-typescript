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

