import { Router } from 'express';
import { addToCart, checkoutCart, getCart } from '../controllers/cart';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.get('/', isAuthenticated, getCart);
router.post('/add', isAuthenticated, addToCart);
router.post('/checkout', isAuthenticated, checkoutCart);

export default router;
