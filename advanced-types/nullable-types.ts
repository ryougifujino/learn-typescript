// it’s not possible to stop null and undefined from being assigned to any type, even when you
// would like to prevent it.
// The --strictNullChecks flag fixes this
let s = "foo";
s = null; // error, 'null' is not assignable to 'string'
let sn: string | null = "bar";
sn = null; // ok

sn = undefined; // error, 'undefined' is not assignable to 'string | null'

// - Optional parameters and properties
// With --strictNullChecks, an optional parameter automatically adds | undefined:
function f(x: number, y?: number) {
    return x + (y || 0);
}

f(1, undefined);
// f(1, null);     // Error

// The same is true for optional properties.

// - Type guards and type assertions
let n: string | null = "n";
console.log(n!.charAt(0));  // it can remove warning, rather than convert value of n to ''