import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
const port = process.env.PORT || 8100;
const app = express();
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
