interface Bird {
    fly();

    layEggs();
}

interface Fish {
    swim();

    layEggs();
}

let smallPet: Bird | Fish = {
    fly: () => void console.log("flying~"),
    layEggs() {
    }
};

if ((smallPet as Bird).fly) {
    smallPet.fly();
} else if ((smallPet as (Bird | Fish) as Fish).swim) {
    (smallPet as Bird | Fish as Fish).swim();
}

