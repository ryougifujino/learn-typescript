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