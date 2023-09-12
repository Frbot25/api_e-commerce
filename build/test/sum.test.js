"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const a = 1;
const b = 2;
(0, globals_1.describe)('sum module', () => {
    (0, globals_1.test)('adds 1 + 2 to equal 3', () => {
        (0, globals_1.expect)(a * b).toBe(2);
    });
});
