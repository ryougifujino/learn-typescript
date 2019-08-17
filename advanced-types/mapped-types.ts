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

