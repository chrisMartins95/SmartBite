// 📦 Importa o Router do Express (para definir as rotas HTTP)
import { Router } from 'express';

// 🧩 Importa as funções do controlador de dashboard
// Cada função é responsável por um endpoint diferente do painel
import {
  getMetrics,             // 📊 Retorna métricas principais (vendas, pedidos, ticket médio, etc)
  getRevenueTrend,        // 📈 Retorna tendência de receita/pedidos ao longo do tempo
  getSalesByChannel,      // 🛒 Retorna vendas agrupadas por canal (ex: loja física, online)
  getTopProducts,         // 🏆 Retorna os produtos mais vendidos
  getRecentTransactions   // 💰 Retorna as últimas transações realizadas
} from '../controllers/dashboardController';

// 🚀 Cria uma nova instância do roteador do Express
export const router = Router();

/* ============================================================
🧭 ROTAS DO DASHBOARD
===============================================================
Essas rotas são usadas para alimentar os gráficos e cards
do painel de controle com dados do banco de dados.
=========================================================== */

// 📊 Métricas principais
router.get('/metrics', getMetrics);

// 📈 Tendência de receita (gráfico de linha por mês)
router.get('/revenue-trend', getRevenueTrend);

// 🛒 Vendas por canal (gráfico de pizza ou barras)
router.get('/sales-by-channel', getSalesByChannel);

// 🏆 Produtos mais vendidos (ranking top 5)
router.get('/top-products', getTopProducts);

// 💰 Últimas transações realizadas
router.get('/recent-transactions', getRecentTransactions);
