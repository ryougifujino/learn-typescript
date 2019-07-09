/** Array */
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

/** Tuple */
let x: [number, string];
x = [1, "2"];
// x = [2, 2];  Error

/** Enum */
enum Color {
    Red,
    Green,
    Blue
}

let c: Color = Color.Red;
console.log(c); // 0
let colorName: string = Color[2];
console.log(colorName); // Blue

/** Void */
let unusable: void = undefined;
unusable = null;

/** Null and Undefined */
let u: undefined = undefined;
let n: null = null;

// --strictNullChecks
// null, undefined -> any; null -> null; undefined -> undefined, void

/** Never */
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error("Something failed");
}

// never variable ONLY accepts never value
let nr: never = fail();

function infiniteLoop(): never {
    while (true) {

    }
}

/** Object */
declare function create(o: object | null);

create({}); // OK
create(null);   // OK
// create(1);  // Error

/** Type assertions */
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;