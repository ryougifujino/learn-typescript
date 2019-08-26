interface PersonalPartial {
    name?: string;
    age?: number;
}

interface PersonaReadonly {
    readonly name: string;
    readonly age: number;
}

type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

// use
class Person {
    name: string;
    age: number;
}

type MyPersonPartial = MyPartial<Person>;
type MyPersonReadonly = MyReadonly<Person>;

const person1: PersonalPartial = {
    name: 'Tom'
};

const person2: MyPersonReadonly = {
    name: 'Jane',
    age: 20
};

// person2.age = 22;   // Error

// you want to add members, you can use an intersection type:
type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P]
} & { newMember: boolean }

type MyPersonPartialPro = PartialWithNewMember<Person>;
const person3: MyPersonPartialPro = {
    name: 'Amy',
    newMember: true
};

// **Do not** use the following!
// This is an error!
// type PartialWithNewMember<T> = {
//     [P in keyof T]?: T[P];
//     newMember: boolean;
// }

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean }
// equals to
type Flags2 = {
    option1: boolean,
    option2: boolean
}

// The compiler knows that it can copy all the existing property modifiers before adding any new ones.
// For example, if Person.name was readonly, Partial<Person>.name would be readonly and optional.

// proxify
// 注意这里只是一个有get方法和set方法的对象的类型
type Proxy<T> = {
    get(): T
    set(T): void
}

const exampleProxy: Proxy<string> = {
    get() {
        return 'STRING'
    },
    set(d: string) {
    }
};

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(o: T): Proxify<T> {
    const newObj = {} as Proxify<T>;
    for (let prop in o) {
        if (o.hasOwnProperty(prop)) {
            let value = o[prop];
            newObj[prop] = {
                get() {
                    console.log("Handling something...");
                    return value;
                },
                set(val: T) {
                }
            }
        }
    }
    return newObj;
}

const proxyProps = proxify({
    "A": 1,
    "B": false,
    1: "A"
});

console.log('proxyProps["A"]', proxyProps["A"].get());
console.log('proxyProps["B"]', proxyProps["B"].get());
console.log('proxyProps["1"]', proxyProps["1"].get());

// unproxify
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        if (t.hasOwnProperty(k)) {
            result[k] = t[k].get();
        }
    }
    return result;
}

const originalProps = unproxify(proxyProps);
console.log("originalProps['A']", originalProps['A']);
console.log("originalProps['B']", originalProps['B']);
console.log("originalProps['1']", originalProps['1']);