// 📦 Importa os tipos Request e Response do Express
import type { Request, Response } from 'express';

// 🔗 Importa a conexão com o banco de dados PostgreSQL
import { pool } from '../db/connection';

/* ============================================================
🏆 SALES CONTROLLER — PRODUTOS MAIS VENDIDOS
============================================================
Contém endpoints que retornam o ranking dos produtos mais 
vendidos, com e sem filtros aplicados (data, loja, canal).
=========================================================== */

/* 
===========================================================
📊 GET /top-produtos — Lista dos 10 produtos mais vendidos
===========================================================
*/
export const getTopProdutos = async (req: Request, res: Response) => {
  try {
    // 💾 Consulta SQL: soma total de vendas por produto
    const query = `
      SELECT
        p.name AS produto,                                -- 🏷️ Nome do produto
        SUM(ps.quantity)::int AS quantidade_vendida,       -- 📦 Quantidade vendida
        ROUND(SUM(ps.total_price)::numeric, 2) AS valor_total -- 💰 Valor total das vendas
      FROM product_sales ps
      JOIN products p ON ps.product_id = p.id
      GROUP BY p.name
      ORDER BY SUM(ps.quantity) DESC                      -- 🔝 Ordena pelos mais vendidos
      LIMIT 10;                                           -- 🔟 Limita aos 10 primeiros
    `;

    // 🚀 Executa a query
    const { rows } = await pool.query(query);

    // 📤 Retorna o resultado como JSON
    res.json(rows);
  } catch (err) {
    // ⚠️ Captura e trata erros de execução
    console.error('❌ Erro ao buscar produtos mais vendidos:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos mais vendidos' });
  }
};

/* 
===========================================================
🔍 GET /top-produtos-filtrado — Lista os produtos mais vendidos
com filtros aplicados dinamicamente (data, loja, canal).
===========================================================
*/
export const getTopProdutosFiltrado = async (req: Request, res: Response) => {
  try {
    // 📥 Extrai os filtros enviados via query string
    const { dataInicio, dataFim, loja, canal } = req.query;

    // 🧱 Arrays para montar cláusulas dinâmicas e valores
    const filtros: string[] = [];
    const valores: any[] = [];

    // 📅 Filtro por data inicial
    if (dataInicio) {
      filtros.push(`s.created_at >= $${filtros.length + 1}`);
      valores.push(dataInicio);
    }

    // 📆 Filtro por data final
    if (dataFim) {
      filtros.push(`s.created_at <= $${filtros.length + 1}`);
      valores.push(dataFim);
    }

    // 🏬 Filtro por loja específica
    if (loja) {
      filtros.push(`s.store_id = $${filtros.length + 1}`);
      valores.push(loja);
    }

    // 🌐 Filtro por canal específico
    if (canal) {
      filtros.push(`s.channel_id = $${filtros.length + 1}`);
      valores.push(canal);
    }

    // 🔗 Junta as condições em uma cláusula WHERE, se existirem
    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    // 💾 Consulta SQL com filtros aplicados dinamicamente
    const query = `
      SELECT
        p.name AS produto,                                -- 🏷️ Nome do produto
        SUM(ps.quantity)::int AS quantidade_vendida,       -- 📦 Quantidade vendida
        ROUND(SUM(ps.total_price)::numeric, 2) AS valor_total -- 💰 Valor total das vendas
      FROM product_sales ps
      JOIN products p ON ps.product_id = p.id
      JOIN sales s ON s.id = ps.sale_id
      ${whereClause}
      GROUP BY p.name
      ORDER BY valor_total DESC                           -- 🔝 Ordena pelos que mais geraram receita
      LIMIT 10;                                           -- 🔟 Retorna os 10 principais
    `;

    // 🚀 Executa a query com os parâmetros de filtro
    const { rows } = await pool.query(query, valores);

    // 📤 Retorna o resultado como JSON
    res.json(rows);
  } catch (err) {
    // ⚠️ Captura e trata erros de execução
    console.error('❌ Erro ao buscar produtos filtrados:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos filtrados' });
  }
};
