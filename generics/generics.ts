/** Generic Types */
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;
myIdentity("1").trim();

// interface form
interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myIdentity2: GenericIdentityFn = identity;
myIdentity2("2").trim();

// move the generic parameter to be a parameter of the whole interface
interface GenericIdentityFn2<T> {
    (arg: T): T;
}

let myIdentity3: GenericIdentityFn2<number> = identity;
// myIdentity3("3");   // Error
myIdentity3(3);     // OK

/** Generic Classes */
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

/** Generic Constraints */
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// loggingIdentity(3);     // Error
loggingIdentity("3");   // OK
loggingIdentity({length: 3});   // OK

// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};
getProperty(x, 'a');    // OK
// getProperty(x, 'e');    // Error

// Using Class Types in Generics
function create<T>(c: { new(): T; }): T {
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new() => A): A {
    return new c();
}

createInstance(Bee).keeper.hasMask;
createInstance(Lion).keeper.nametag;