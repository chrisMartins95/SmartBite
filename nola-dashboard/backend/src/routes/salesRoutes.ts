import { Router } from 'express';
import { getTopProdutos, getTopProdutosFiltrado } from '../controllers/salesController';
import { getStores, getChannels } from '../controllers/metaController';

export const router = Router();

// Rota original
router.get('/top-produtos', getTopProdutos);

// 🆕 Rota com filtros
router.get('/top-produtos/filtrado', getTopProdutosFiltrado);

// Meta endpoints para popular selects
router.get('/stores', getStores);
router.get('/channels', getChannels);
