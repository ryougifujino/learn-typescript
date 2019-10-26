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
/*
1. /root/src/folder/moduleB.ts
2. /root/src/folder/moduleB.d.ts
*/

// non-relative module imports
// the compiler walks up the directory tree starting with the directory containing the importing
// file, trying to locate a matching definition file.
// import { b } from "moduleB", in a source file /root/src/folder/A.ts:
/*
1. /root/src/folder/moduleB.ts
2. /root/src/folder/moduleB.d.ts
3. /root/src/moduleB.ts
4. /root/src/moduleB.d.ts
5. /root/moduleB.ts
6. /root/moduleB.d.ts
7. /moduleB.ts
8. /moduleB.d.ts
*/

// - Node
// How Node.js resolves modules
// relative paths
/*
1. /root/src/moduleB.js
2. /root/src/moduleB/package.json - { "main": "lib/mainModule.js" } => /root/src/moduleB/lib/mainModule.js
3. /root/src/moduleB/index.js
*/

// resolution for a non-relative module name
// if /root/src/moduleA.js has the import var x = require("moduleB"):
/*
1. /root/src/node_modules/moduleB.js
2. /root/src/node_modules/moduleB/package.json (if it specifies a "main" property)
3. /root/src/node_modules/moduleB/index.js

4. /root/node_modules/moduleB.js
5. /root/node_modules/moduleB/package.json (if it specifies a "main" property)
6. /root/node_modules/moduleB/index.js

7. /node_modules/moduleB.js
8. /node_modules/moduleB/package.json (if it specifies a "main" property)
9. /node_modules/moduleB/index.js
*/

// How TypeScript resolves modules
// import { b } from "./moduleB" in /root/src/moduleA.ts
/*
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (if it specifies a "types" property)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
*/

// import { b } from "moduleB" in source file /root/src/moduleA.ts
/*
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (if it specifies a "types" property)
/root/src/node_modules/@types/moduleB.d.ts
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (if it specifies a "types" property)
/root/node_modules/@types/moduleB.d.ts
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts

/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (if it specifies a "types" property)
/node_modules/@types/moduleB.d.ts
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts
*/

/** Additional module resolution flags */
// It is important to note that the compiler will not perform any of these transformations; it just
// uses these pieces of information to guide the process of resolving a module import to its definition file.
// Base URL
