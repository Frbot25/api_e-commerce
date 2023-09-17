"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
// const userschema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .required(),
//   password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//   repeat_password: Joi.ref('password'),
//   access_token: [Joi.string(), Joi.number()],
// })
//   .with('username', 'birth_year')
//   .xor('password', 'access_token')
//   .with('password', 'repeat_password');
// const loginSchema = Joi.object({
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .required(),
//   password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
// });
const validateLogin = (input) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required(),
        password: joi_1.default.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
    return schema.validate(input);
};
exports.validateLogin = validateLogin;
