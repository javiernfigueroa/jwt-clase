import { Router } from 'express'
import { listProducts, addProduct } from '../controllers/products.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', verifyToken, listProducts)
router.post('/', verifyToken, addProduct)

export default router
