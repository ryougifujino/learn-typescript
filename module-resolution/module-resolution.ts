/** Resolution Steps */
// step1: try to locate a file that represents the imported module.
// step2: attempt to locate an ambient module declaration.

/** Relative vs. Non-relative module imports */
// relative import
/*
import Entry from "./components/Entry";
import { DefaultHeaders } from "../constants/http";
import "/mod";
*/
// non-relative
/*
import * as $ from "jquery";
import { Component } from "@angular/core";
*/

/** Module Resolution Strategies */
// - Classic
// relative import
// import { b } from "./moduleB" in source file /root/src/folder/A.ts:
// 1. /root/src/folder/moduleB.ts
// 2. /root/src/folder/moduleB.d.ts

// non-relative module imports
// the compiler walks up the directory tree starting with the directory containing the importing
// file, trying to locate a matching definition file.
// import { b } from "moduleB", in a source file /root/src/folder/A.ts:
// 1. /root/src/folder/moduleB.ts
// 2. /root/src/folder/moduleB.d.ts
// 3. /root/src/moduleB.ts
// 4. /root/src/moduleB.d.ts
// 5. /root/moduleB.ts
// 6. /root/moduleB.d.ts
// 7. /moduleB.ts
// 8. /moduleB.d.ts

// - Node
// How Node.js resolves modules
