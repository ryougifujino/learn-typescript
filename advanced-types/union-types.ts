// If we have a value that has a union type, we can only access members that are common to all types
// in the union.
interface Bird {
    fly();

    layEggs();
}

interface Fish {
    swim();

    layEggs();
}

let smallPet: Bird | Fish = {
    fly: () => void 0,
    layEggs() {
    }
};
smallPet.layEggs();
// smallPet.fly();     // Error