"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (request, response, next) => {
    let roleId;
    try {
        console.log('infosUser:', request.user);
        for (const key in request.user) {
            console.log('key:', key);
            console.log('value:', request.user[key]);
            if (key === 'roleId') {
                roleId = request.user[key];
            }
        }
        console.log('roleId:', roleId);
        if (roleId !== 1) {
            throw new Error('Not authorized');
        }
        next();
    }
    catch (error) {
        response.status(401).json(error.message);
    }
};
