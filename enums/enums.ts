/** Numeric enums */
enum E {
    A = 0,
    B
}

// enums without initializers either need to be first
function getSomeValue() {
    return 0;
}

enum E2 {
    A = getSomeValue(),
    // B   // Error
    B = 0   // OK
}

/** String enums */
enum Dictionary {
    Up = "UP",
    Down = "DOWN"
}

/** Heterogeneous enums */
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// don’t do this

/** Computed and constant members */
enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length
}

/** Union enums and enum member types */
enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle
}

let c: Circle = {
    // kind: ShapeKind.Square  // Error
    kind: ShapeKind.Circle
    // kind: 1     // also OK
};

// ---
enum E3 {
    Foo,
    Bar
}

function f(x: E3) {
    // if (x !== E3.Foo || x !== E3.Bar) {  // Error
    // }
}

/** Enums at runtime */
enum E4 {
    X
}

function f2(obj: { X: number }) {
    return obj.X;
}

f2(E4);     // OK

/** Enums at compile time */
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
type LogLevelStrings = keyof typeof LogLevel;
let error: LogLevelStrings = 'ERROR';

/** Reverse mappings */
enum Enum {
    A
}

let a = Enum.A;
let nameOfA = Enum[a];
// note string enum members do not get a reverse mapping generated at all

/** const enums */

// cannot have computed members
const enum Directions {
    Up = 1,
    Down = Up * 2,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// generated code:
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

/** Ambient enums */
declare enum Enum2 {
    A = 1,
    B,  // always considered computed
    C = 2
}