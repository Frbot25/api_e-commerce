"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("./router"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const port = process.env.PORT || 8100;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const swaggerOptions = {
    openapi: 3.0,
    definition: {
        info: {
            title: 'Project E-commerce Documentation.',
            description: 'Documentation for the Project E-commerce API',
            contact: {
                name: 'Frédéric Botella',
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: 'https://localhost:8100',
            },
        ],
        schemes: ['http', 'https'],
    },
    apis: ['**/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/api', router_1.default);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
