import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../models/UserModel.js'

export const register = async (req, res) => {
  const { email, password } = req.body

  const existingUser = await findUserByEmail(email)
  if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await createUser(email, hashedPassword)

  res
    .status(201)
    .json({ message: 'Usuario creado exitosamente', use: { id: user.id, email: user.email } })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await findUserByEmail(email)
  if (!user) return res.status(404).json({ message: 'Email invalido' })

  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) return res.status(401).json({ message: 'Password invalida' })

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.json({ message: 'Login exitoso !', token })
}
