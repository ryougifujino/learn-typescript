declare function f<T extends boolean>(x: T): T extends true ? string : number;

// deferred
let x: string | number = f(Math.random() < 0.5);

// resolved now
type TypeName<T> =
    T extends string ? "string" :
        T extends number ? "number" :
            T extends boolean ? "boolean" :
                T extends undefined ? "undefined" :
                    T extends Function ? "function" :
                        "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"

// - Distributive conditional types
// instantiation of T extends U ? X : Y with the type argument A | B | C for T is resolved as
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
type T10 = TypeName<string | (() => void)>;
let t10: T10;
let _t10: string | (() => void) = t10;
type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
type T11 = TypeName<string[] | number[]>;  // "object"

// references to T within the conditional type are resolved to individual constituents of the union
// type. Furthermore, references to T within X have an additional type parameter constraint U
// (i.e. T is considered assignable to U within X
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { value: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;    // 注意为true的情况时T是一个数组，所以要用T[number]把它变成元素类型
type T20 = Boxed<string>;  // BoxedValue<string>;
type T21 = Boxed<number[]>;  // BoxedArray<number>;
type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;

// The distributive property of conditional types can conveniently be used to filter union types:
type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never;    // Remove types from T that are not assignable to U
type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>;  // string | number
type T33 = Filter<string | number | (() => void), Function>;  // () => void

type MyNonNullable<T> = Diff<T, null | undefined>;  // Remove null and undefined from T
type T34 = MyNonNullable<string | number | undefined>;  // string | number
type T35 = MyNonNullable<string | string[] | null | undefined>;  // string | string[]

function f1<T>(x: T, y: MyNonNullable<T>) {
    // x = y;  // Ok
    // y = x;  // Error
}

function f2<T extends string | undefined>(x1: T, y1: MyNonNullable<T>) {
    // x = y;  // Ok
    // y = x;  // Error
    // let s1: string = x;  // Error
    // let s2: string = y;  // Ok
}

// Conditional types are particularly useful when combined with mapped types:
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart: (nameName: string) => void;
}

type T40 = FunctionPropertyNames<Part>;  // "updatePart"
type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }
// conditional types are not permitted to reference themselves recursively
