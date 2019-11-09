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
// Intrinsic elements
