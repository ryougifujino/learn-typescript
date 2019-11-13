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