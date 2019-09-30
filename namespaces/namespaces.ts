/** Namespacing */
// Namespaced Validators
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

for (let s of strings) {
    for (let name in validators) {
        console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
    }
}

/** Splitting Across Files */
// Even though the files are separate, they can each contribute to the same namespace and can be
// consumed as if they were all defined in one place.
// See Test.ts

// --outFile flag to compile all of the input files into a single JavaScript output file:
// tsc --outFile sample.js Test.ts
// tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts

// Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file.

/** Aliases */
// use import q = x.y.z to create shorter names
namespace Shapes {
    export namespace Polygons {
        export class Triangle {
        }

        export class Square {
        }
    }
}

import polygons = Shapes.Polygons;

let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'

/** Working with Other JavaScript Libraries */
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
let selectors: D3.Selectors = {
    select: (selector: string | EventTarget) => ({} as Selection)
};