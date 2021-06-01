import Router from 'express-promise-router';
import * as api from '../api';

const router = Router();
router.post('/order', api.postOrder);
router.post('/cancel_order', api.cancelOrder);
router.post('/check_order', api.checkOrder);
router.get('/recent_orders', api.getRecentOrders);

router.post('/get_top_ingredients', api.getTopIngredients);

export default router;