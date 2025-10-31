import { Router } from 'express';
import { getTopProdutos, getTopProdutosFiltrado } from '../controllers/salesController.js';
import { explorar } from '../controllers/exploreController.js';
import { getStores, getChannels } from '../controllers/metaController.js';

export const router = Router();

// Rota original
router.get('/top-produtos', getTopProdutos);

// 🆕 Rota com filtros
router.get('/top-produtos/filtrado', getTopProdutosFiltrado);

// Rota para exploração (métricas + top produtos + breakdowns)
router.get('/explorar', explorar);

// Meta endpoints para popular selects
router.get('/stores', getStores);
router.get('/channels', getChannels);
