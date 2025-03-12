import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getCategories 
} from '../controllers/productController.js';

const router = express.Router();

// Get all categories
router.get('/categories', getCategories);

// @route   GET & POST /api/products
router.route('/')
  .get(getProducts)
  .post(createProduct);

// @route   GET & PUT & DELETE /api/products/:id
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router; 