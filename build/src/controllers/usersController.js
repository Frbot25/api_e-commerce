"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = __importDefault(require("../models/usersModel"));
const usersShema_1 = __importDefault(require("../shemas/usersShema"));
const UserController = {
    signin: async (request, response) => {
        try {
            const email = request.body.email;
            const password = request.body.password;
            const user = await new usersModel_1.default({ email, password }).signin();
            if (user) {
                response.status(200).json(user);
            }
        }
        catch (error) {
            response.status(500).json({ error: error.message });
        }
    },
    signup: async (request, response) => {
        try {
            const body = request.body;
            // verify body
            const verify = usersShema_1.default.validateLogin(body);
            if (verify.error) {
                throw new Error(verify.error.message);
            }
            const user = await new usersModel_1.default(body).signup();
            if (user) {
                response.status(201).json(user);
            }
        }
        catch (error) {
            response.status(409).json({ error: error.message });
        }
    },
};
exports.default = UserController;
