import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.email} a la ruta protegida` })
})

export default router
