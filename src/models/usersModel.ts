import client from '../database';
import bcrypt from 'bcrypt';

interface User {
  email: string;
  password: string;
  id: number;
}
class Users {
  email!: string;
  password!: string;
  id!: number;
  static email: string;

  constructor(obj = {}) {
    for (const proname in obj) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[proname] = (obj as User)[proname];
    }
  }
  async signin() {
    try {
      console.log(this.email);
      const { rows } = await client.query(
        `SELECT * FROM "users" WHERE id=(SELECT id FROM "users" WHERE email = $1);`,
        [this.email],
      ); //this vient du constructeur
      if (rows.length === 0) {
        throw new Error('User not found');
      } else {
        const userSecure = {
          email: rows[0].email,
          id: rows[0].id,
          roleId: rows[0].role_id,
        };

        return userSecure;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async signup() {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      const result = await client.query(
        `INSERT INTO "users" (email, password) VALUES ($1, $2) RETURNING *;`,
        [this.email, this.password],
      );
      if (!result.rows[0].id) {
        throw new Error('Insertion failed');
      } else if (result.rows[0].id) {
        return "L'utilisateur a bien été ajouté";
      }
    } catch (error) {
      console.log('error', error.message);
      throw new Error(error.message);
    }
  }
  static async findUserById(id: number) {
    console.log('id:', id);
    try {
      const result = await client.query(`SELECT * FROM "users" WHERE id=$1`, [
        id,
      ]);
      if (!result) {
        throw new Error('User not found');
      } else {
        return result.rows[0];
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export default Users;
