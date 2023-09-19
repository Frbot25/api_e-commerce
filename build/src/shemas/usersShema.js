"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateLogin = (input) => {
    const userSchema = joi_1.default.object({
        //username: Joi.string().min(4).max(20).required(),
        email: joi_1.default.string().lowercase().email().required(),
        password: joi_1.default.string()
            .min(4)
            .lowercase()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });
    return userSchema.validate(input);
};
exports.default = { validateLogin };
