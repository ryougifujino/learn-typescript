/** Identifying Kinds of Libraries */
// - Global Libraries
/*
When looking at the code of a global library, you’ll usually see:

- Top-level var statements or function declarations
- One or more assignments to window.someName
- Assumptions that DOM primitives like document or window exist

You won’t see:
- Checks for, or usage of, module loaders like require or define
- CommonJS/Node.js-style imports of the form var fs = require("fs");
- Calls to define(...)
- Documentation describing how to require or import the library
*/

// - Modular Libraries
/*
// Node.js
var fs = require("fs");

// TypeScript or ES6
import fs = require("fs");

//
var someLib = require('someLib');

define(..., ['someLib'], function(someLib) {

});

Modular libraries will typically have at least some of the following:
- Unconditional calls to require or define
- Declarations like import * as a from 'b'; or export c;
- Assignments to exports or module.exports

They will rarely have:
- Assignments to properties of window or global
*/

// - UMD
// Identifying a UMD library
/*
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
*/

// - Module Plugin or UMD Plugin
/*
import * as m from 'someModule';

// You can also import other modules if needed
import * as other from 'anotherModule';

// Here, declare the same module as the one you imported above
declare module 'someModule' {
    // Inside, add new function, classes, or variables. You can use
    // unexported types from the original module if needed.
    export function theNewMethod(x: m.foo): other.bar;

    // You can also add new properties to existing interfaces from
    // the original module by writing interface augmentations
    export interface SomeModuleOptions {
        someModuleSetting?: string;
    }

    // New types can also be declared and will appear as if they
    // are in the original module
    export interface MyModulePluginOptions {
        size: number;
    }
}
*/

// - Global Plugin

// - Global-modifying Modules

/** Consuming Dependencies */

// - Dependencies on Global Libraries

// - Dependencies on Modules

// - Dependencies on UMD libraries

/** Footnotes */