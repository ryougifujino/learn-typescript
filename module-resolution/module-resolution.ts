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
