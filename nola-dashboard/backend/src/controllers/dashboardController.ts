// 📦 Importa os tipos Request e Response do Express
import type { Request, Response } from "express";

// 🔗 Importa a conexão com o banco de dados (pool do PostgreSQL)
import { pool } from "../db/connection";

// 🧩 Importa função utilitária que monta os filtros dinâmicos do dashboard
import { buildDashboardFilters } from "../utils/buildFilters";

/* ============================================================
 🧠 CONTROLADOR DO DASHBOARD — MÉTRICAS, TENDÊNCIAS E RELATÓRIOS
 ============================================================ */

/* 
===========================================================
📊 MÉTRICAS PRINCIPAIS (total de vendas, pedidos, ticket médio)
===========================================================
*/
export const getMetrics = async (req: Request, res: Response) => {
  console.log("📥 GET /metrics — query recebida:", req.query);

  try {
    // 🧱 Gera cláusula WHERE e parâmetros a partir dos filtros da requisição
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    // 💾 SQL que calcula receita, pedidos, lojas ativas e ticket médio
    const sql = `
      SELECT 
        COALESCE(SUM(s.total_amount), 0) AS total_revenue, -- 💰 Receita total
        COUNT(*) AS total_orders,                          -- 🧾 Total de pedidos
        COUNT(DISTINCT s.store_id) AS active_stores,       -- 🏬 Lojas ativas
        CASE 
          WHEN COUNT(*) > 0 THEN SUM(s.total_amount) / COUNT(*)
          ELSE 0 
        END AS avg_ticket                                  -- 🎟️ Ticket médio
      FROM sales s
      ${whereClause}
    `;

    // 🚀 Executa a query no banco
    const result = await pool.query(sql, params);

    // 📤 Retorna os dados em formato JSON
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* 
===========================================================
📈 TENDÊNCIA DE RECEITA E PEDIDOS (por mês, em português)
===========================================================
*/
export const getRevenueTrend = async (req: Request, res: Response) => {
  console.log("📥 GET /revenue-trend — query recebida:", req.query);

  try {
    // 🔍 Cria filtros dinâmicos com base na query
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    // 📆 SQL que agrupa vendas por mês e retorna nome do mês em PT-BR
    const sql = `
      SELECT
        TRIM(TO_CHAR(DATE_TRUNC('month', s.created_at), 'TMMonth', 'pt_BR')) AS name, -- 🗓️ Nome do mês
        SUM(s.total_amount) AS revenue, -- 💰 Receita total do mês
        COUNT(*) AS orders               -- 🧾 Número de pedidos
      FROM sales s
      ${whereClause}
      GROUP BY DATE_TRUNC('month', s.created_at)
      ORDER BY DATE_TRUNC('month', s.created_at)
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching revenue trend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* 
===========================================================
🛒 VENDAS POR CANAL (ex: online, presencial, marketplace)
===========================================================
*/
export const getSalesByChannel = async (req: Request, res: Response) => {
  console.log("📥 GET /sales-by-channel — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    // 📊 SQL que conta vendas agrupadas por canal
    const sql = `
      SELECT 
        c.name AS name,  -- 🔖 Nome do canal (ex: Loja Online)
        COUNT(*) AS value -- 📦 Quantidade de vendas
      FROM sales s
      JOIN channels c ON c.id = s.channel_id
      ${whereClause}
      GROUP BY c.name
      ORDER BY value DESC
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching sales by channel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* 
===========================================================
🏆 TOP PRODUTOS (os mais vendidos)
===========================================================
*/
export const getTopProducts = async (req: Request, res: Response) => {
  console.log("📥 GET /top-products — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    // 🥇 SQL que retorna os produtos mais vendidos
    const sql = `
      SELECT 
        p.name AS name,       -- 🧾 Nome do produto
        COUNT(*) AS sales     -- 📈 Quantidade de vendas
      FROM product_sales ps
      JOIN sales s ON s.id = ps.sale_id
      JOIN products p ON p.id = ps.product_id
      ${whereClause}
      GROUP BY p.name
      ORDER BY sales DESC
      LIMIT 5                 -- 🔝 Limita aos 5 produtos mais vendidos
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching top products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* 
===========================================================
💰 ÚLTIMAS TRANSAÇÕES REALIZADAS
===========================================================
*/
export const getRecentTransactions = async (req: Request, res: Response) => {
  console.log("📥 GET /recent-transactions — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    // 🕓 SQL que busca as últimas 5 transações
    const sql = `
      SELECT
        s.id,                                       -- 🧾 ID da venda
        p.name AS product,                          -- 🛍️ Produto vendido
        ps.total_price AS amount,                   -- 💵 Valor total
        TO_CHAR(s.created_at, 'DD/MM/YYYY') AS date -- 📅 Data formatada
      FROM product_sales ps
      JOIN sales s ON s.id = ps.sale_id
      JOIN products p ON p.id = ps.product_id
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT 5
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching recent transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
