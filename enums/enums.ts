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

