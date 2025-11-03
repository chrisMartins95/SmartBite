import { Router } from 'express';
import {
  getMetrics,
  getRevenueTrend,
  getSalesByChannel,
  getTopProducts,
  getRecentTransactions
} from '../controllers/dashboardController';

export const router = Router();

// Dashboard routes
router.get('/metrics', getMetrics);
router.get('/revenue-trend', getRevenueTrend);
router.get('/sales-by-channel', getSalesByChannel);
router.get('/top-products', getTopProducts);
router.get('/recent-transactions', getRecentTransactions);