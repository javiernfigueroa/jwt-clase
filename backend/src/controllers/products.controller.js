import { getAllProducts, createProduct } from '../models/ProductModel.js'

export const listProducts = async (req, res) => {
  const products = await getAllProducts()
  res.json(products)
}

export const addProduct = async (req, res) => {
  const { name, price } = req.body
  const userId = req.user.id // lo trae el middleware de auth

  const newProduct = await createProduct(name, price, userId)
  res.status(201).json(newProduct)
}
