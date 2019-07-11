/** Block-scoping */
function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();

let a;

// note: TypeScript is permissive and won’t report this as an error.

/** Re-declarations and Shadowing */
function f(x) {
    // let x = 100;    // error: interferes with parameter declaration
}

function g() {
    let x = 100;
    // var x = 100;    // error: can't have both declarations of 'x'
}

/** let vs. const */
// Applying the principle of least privilege, all declarations other than those you plan to modify
// should use const.

/** Destructuring */
function f1([first, second]: [number, number]) {
    console.log(first, second);
}

f1([1, 2]);

// ...
let [first, ...rest] = [1, 2, 3, 4];
console.log(rest);  // [ 2, 3, 4 ]

/** Tuple destructuring */
let tuple: [number, string, boolean] = [1, '2', true];
let [a0, b0, c0] = tuple;

/** Object destructuring */
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};

// Property renaming
let {a: nameA}: { a: string } = o;
nameA.trim();

// Default values
function keepWhileObject(wholeObject: { a: string, b?: number }) {
    let {a, b = 1001} = wholeObject;
}

keepWhileObject({a: "A"});
keepWhileObject({a: "A", b: 2});
// keepWhileObject({a: "A", b: 2, c: 3});   Error

/** Function declarations */
type C = { a: String, b?: number };

function f2(c: C): void {

}

function f3({a}: C): void {

}

function f4({a, b}: C): void {

}

function ff({a, b = 0} = {a: ""}): void {
    // ...
}

ff({a: "yes"}); // ok, default b = 0
ff(); // ok, default to { a: "" }, which then defaults b = 0
// ff({}); // error, 'a' is required if you supply an argument