import { db } from "../database/connection.database.js";

const create = async ({ email, userpassword, username }) => {
    const query = {
      text: "INSERT INTO users (email, userpassword, username) VALUES ($1, $2, $3) RETURNING email, username, uid, role_id",
      values: [email, userpassword, username]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const findOneByEmail = async (email) => {
    const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const findAllUser = async () => {
    const query = {
        text: `SELECT * FROM users`
    };
    const { rows } = await db.query(query);
    return rows;
};
export const UserModel = {
  create,
  findOneByEmail,
  findAllUser,
};