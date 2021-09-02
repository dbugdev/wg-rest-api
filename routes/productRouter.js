const {
  getProducts,
  postProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productController')
const { validateProduct } = require('../middlewares')

const router = require('express').Router()
router.get('/', getProducts)
router.post('/', validateProduct, postProduct)
router.get('/:id', getProductById)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)
module.exports = router
