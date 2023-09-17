import { Pool } from 'pg';

const config = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
  //tit truc de config pour la version de prod sur héroku, ça nous évitera des messages d'erreur
}

const configSsl = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

if (process.env.NODE_ENV === 'production') {
  //tit truc de config pour la version de prod sur héroku, ça nous évitera des messages d'erreur
  if (process.env.DATABASE_URL === 'production') {
    configSsl.ssl = {
      rejectUnauthorized: false,
    };
  }
}
const pool = new Pool(process.env.DATABASE_URL ? config : configSsl);

//module.exports = pool;
export default pool;
