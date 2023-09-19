"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = __importDefault(require("../index"));
const supertest = require("supertest");
(0, globals_1.describe)('GET /api', () => {
    it('should return status 200 get all products', async () => {
        const response = await supertest(index_1.default).get('/api');
        (0, globals_1.expect)(response.status).toBe(200);
    });
});
