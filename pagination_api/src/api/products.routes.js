import { Router } from 'express';

import * as productsController from './products.controller.js';

const router = Router();

router.delete('/:productId', productsController.deleteProduct);
router.put('/:productId', productsController.updateProduct);
router.get('/:productId', productsController.detailProduct);
router.post('/', productsController.createProduct);
router.get('/', productsController.listProduct);

export default router;