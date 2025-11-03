import { Router } from 'express';
import {
  getExploreMetrics,
  getSalesTimeseries,
  getExploreSalesByChannel,
  getSalesByStore,
  explorar
} from '../controllers/exploreController';

export const router = Router();

// Endpoint agrupado (antigo)
router.get('/', explorar);
// Endpoints individuais
router.get('/metrics', getExploreMetrics);
router.get('/sales-timeseries', getSalesTimeseries);
router.get('/sales-by-channel', getExploreSalesByChannel);
router.get('/sales-by-store', getSalesByStore);
