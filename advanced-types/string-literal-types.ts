type Status = 'OK' | 'Error';
let st: Status = 'OK';
st = 'Error';
// st = '233';     // Error

// overloads
function h(tagName: 'img');
function h(tagName: 'input');
function h(tagName: string) {
    if (tagName === 'img') {
        console.log('img');
    } else if (tagName === 'input') {
        console.log('input')
    }
}