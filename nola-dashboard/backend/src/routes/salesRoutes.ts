import { Router } from 'express';
import { getTopProdutos } from '../controllers/salesController.js';
export const router = Router();

router.get('/top-produtos', getTopProdutos);
