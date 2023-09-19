import client from '../database';

class Admin {
  constructor(obj = {}) {
    for (const proname in obj) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[proname] = (obj as Admin)[proname];
    }
  }
  static async findRoleByRoleId(roleId: number) {
    console.log('roleId:', roleId);
    try {
      const { rows } = await client.query(`SELECT * FROM "roles" where id=$1`, [
        roleId,
      ]);
      if (rows) {
        console.log('rows.length:', rows);
      }
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
export default Admin;
