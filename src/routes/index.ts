import Router from 'express-promise-router';
import * as api from '../api';


const router = Router();
router.post('/order', api.postOrder);


export default router;