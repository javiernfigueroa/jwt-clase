// 1) cree usuarios, 2) compruebe si un usuario existe
import { pool } from '../db/db.js'

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0]
}

export const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  )
  return result.rows[0]
}
