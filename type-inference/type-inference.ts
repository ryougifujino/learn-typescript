/** Best common type */
// number null
let x = [0, 1, null];

class Animal {

}

class Rhino extends Animal {

}

class Elephant extends Animal {

}

// union array type, (Rhino | Elephant)[]
let zoo = [new Rhino(), new Elephant()];

// Animal[]
let zoo2: Animal[] = [new Rhino(), new Elephant()];

/** Contextual Typing */
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);   // OK
    // console.log(mouseEvent.kangaroo);    // Error
};

// override
window.onscroll = function (uiEvent: any) {
    console.log(uiEvent.button);  // OK
};