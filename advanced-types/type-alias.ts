type Name = string;
type PrintName = (name: Name) => void;
const printName: PrintName = name => console.log(name);
printName('Tom');

// generic
type Container<T> = { value: T };
const container: Container<string> = {value: 'must be string here'};
// refer to self
type Tree<T> = {
    value: T,
    left: Tree<T>,
    right: Tree<T>
};