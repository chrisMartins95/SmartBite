// 📦 Importando os tipos Request e Response do Express
import type { Request, Response } from 'express';

/* 
====================================================
🧠 Controlador de Dashboard — Declaração de Funções
====================================================
Essas funções são responsáveis por lidar com as requisições 
relacionadas ao painel (dashboard) da aplicação. 
Elas retornam métricas, tendências, vendas, produtos e transações.
*/

// 📊 Retorna métricas gerais (ex: total de vendas, lucro, etc)
export declare const getMetrics: (req: Request, res: Response) => Promise<void>;

// 📈 Retorna a tendência de receita ao longo do tempo
export declare const getRevenueTrend: (req: Request, res: Response) => Promise<void>;

// 🛒 Retorna as vendas agrupadas por canal (ex: loja física, online, marketplace)
export declare const getSalesByChannel: (req: Request, res: Response) => Promise<void>;

// 🏆 Retorna os produtos mais vendidos (ranking de desempenho)
export declare const getTopProducts: (req: Request, res: Response) => Promise<void>;

// 💰 Retorna as transações mais recentes realizadas
export declare const getRecentTransactions: (req: Request, res: Response) => Promise<void>;

// 🗺️ Mapa de origem do arquivo TypeScript para debugging
//# sourceMappingURL=dashboardController.d.ts.map
