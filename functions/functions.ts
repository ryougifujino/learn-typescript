/** Function Types */
// Writing the function type
let myAdd: (a: number, b: number) => number =
    function (x: number, y: number): number {
        return x + y;
    };

/** Optional and Default Parameters */
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}   // OK
// function buildName2(firstName?: string, lastName: string) {
//     return firstName + " " + lastName;
// }   // Error

/** this */
// this parameter
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];

    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker(this: Deck): () => Card {
        // Now TypeScript knows that createCardPicker expects to be called on a Deck object. That
        // means that this is of type Deck now, not any, so --noImplicitThis will not cause any
        // errors.
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// this parameters in callbacks
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

/** Overloads */
function foo(bar: boolean): number;
function foo(bar: number): boolean;
function foo(bar): number | boolean {
    if (typeof bar === 'boolean') {
        return 1;
    } else if (typeof bar === 'number') {
        return true;
    }
}