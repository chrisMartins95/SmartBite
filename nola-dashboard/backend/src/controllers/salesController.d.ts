// 📦 Importando os tipos Request e Response do Express
import type { Request, Response } from 'express';

/* 
=========================================================
🧠 Controlador de Vendas — Declaração de Funções
=========================================================
Essas declarações definem a estrutura das funções exportadas
no arquivo `salesController.ts`, garantindo que o TypeScript 
reconheça corretamente os tipos de parâmetros e retornos.
*/

// 🏆 Retorna os produtos mais vendidos (ranking geral)
export declare const getTopProdutos: (req: Request, res: Response) => Promise<void>;

// 🔍 Retorna os produtos mais vendidos com filtros aplicados (ex: data, loja, canal)
export declare const getTopProdutosFiltrado: (req: Request, res: Response) => Promise<void>;

// 🗺️ Mapa de origem TypeScript — usado para debugging
//# sourceMappingURL=salesController.d.ts.map
