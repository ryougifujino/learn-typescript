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