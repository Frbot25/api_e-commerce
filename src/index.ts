import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const port = process.env.PORT || 8100;
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerOptions: Options = {
  definition: {
    info: {
      title: 'Project E-commerce Documentation.',
      description: 'Documentation for the Project E-commerce API',
      contact: {
        name: 'Frédéric Botella',
      },
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', router);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
