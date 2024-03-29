/*
“declaration merging” means that the compiler merges two separate declarations declared with the
same name into a single definition.
*/

/** Merging Interfaces */
// At the most basic level, the merge mechanically joins the members of both declarations into a
// single interface with the same name.
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
    // Non-function members of the interfaces should be unique. If they are not unique, they must be of the same type.
    width: number;
}

let box: Box = {height: 1, width: 2, scale: .5};

// A merging with later interface A, the second interface will have a higher precedence than the first.
/*
interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}
// The three interfaces will merge to create a single declaration as so:

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
*/

// If a signature has a parameter whose type is a single string literal type (e.g. not a union of
// string literals), then it will be bubbled toward the top of its merged overload list.
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
// <=>
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}

/** Merging Namespaces */
namespace Animals {
    export class Zebra { }
}

namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}
// <=>
/*
namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}
*/

// Non-exported members are only visible in the original (un-merged) namespace.
namespace Animal {
    let haveMuscles = true;

    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}

namespace Animal {
    export function doAnimalsHaveMuscles() {
        // return haveMuscles;  // Error, because haveMuscles is not accessible here
    }
}

/** Merging Namespaces with Classes, Functions, and Enums */
// The namespace declaration must follow the declaration it will merge with.

// - Merging Namespaces with Classes
// a way of describing inner classes
class Album {
    label: Album.AlbumLabel
}
namespace Album {
    export class AlbumLabel {
    }
}

// creating a function and then extending the function further by adding properties onto the function
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));

/** Module Augmentation */
import {Observable} from "./observable";
/*
Observable.prototype.map = function (f) {

};
// TS2339: Property 'map' does not exist on type 'Observable<any>'
*/
declare module './observable' {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}
Observable.prototype.map = function (f) {
    return null;
};