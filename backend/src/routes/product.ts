import { Router } from 'express';
import { isAuthenticated, isSuperAdmin } from '../middlewares/auth';
import { addProduct, getProducts, deleteProduct, updateProduct } from '../controllers/product';
import upload from '../middlewares/fileUploadMiddleware';

const router = Router();

router.get('/', isAuthenticated, getProducts); // All authenticated users can view products
router.post('/', isAuthenticated, isSuperAdmin, upload.single('image'), addProduct); // Only super-admins can add products
router.put('/:id', isAuthenticated, isSuperAdmin , upload.single('image'),updateProduct); // Only super-admins can update products
router.delete('/:id', isAuthenticated, isSuperAdmin, deleteProduct); // Only super-admins can delete products

export default router;
