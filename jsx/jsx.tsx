/** Basic usage */
// In order to use JSX you must do two things:
// 1. Name your files with a .tsx extension
// 2. Enable the jsx option
/*
Mode	        Input	    Output	                    Output File Extension
preserve	    <div />	    <div />	                    .jsx
react	        <div />	    React.createElement("div")	.js
react-native	<div />	    <div />	                    .js
*/

/** The as operator */
// TypeScript disallows angle bracket type assertions in .tsx files.
/*
// in .tsx
var foo = <foo>bar;     // no
var foo = bar as foo;   // yes
*/

/** Type Checking */
// An intrinsic element always begins with a lowercase letter, and a value-based element always
// begins with an uppercase letter.

// - Intrinsic elements
declare namespace JSX {
    interface IntrinsicElements {
        foo: any;
    }
}
<foo />;    // ok
<bar />;    // error

// - Value-based elements
/*
import MyComponent from "./myComponent";

<MyComponent />; // ok
<SomeOtherComponent />; // error
*/
// There are two ways to define a value-based element:
// 1. Function Component (FC)
// 2. Class Component

// Function Component
interface FooProp {
    name: string;
    X: number;
    Y: number;
}

declare function AnotherComponent(prop: { name: string });
function ComponentFoo(prop: FooProp) {
    // TS enforces that its return type must be assignable to JSX.Element
    return <AnotherComponent name={prop.name} />;
}

// Class Component
// The element instance type must be assignable to JSX.ElementClass or it will result in an error.
declare namespace JSX {
    interface ElementClass {
        render: any;
    }
}

class MyComponent {
    render() {}
}
function MyFactoryFunction() {
    return { render: () => {} }
}

<MyComponent />; // ok
<MyFactoryFunction />; // ok

class NotAValidComponent {}
function NotAValidFactoryFunction() {
    return {};
}

<NotAValidComponent />; // error
<NotAValidFactoryFunction />; // error

// - Attribute type checking

// - Children type checking

/** The JSX result type */

/** Embedding Expressions */

/** React  integration */

/** Factory Functions */