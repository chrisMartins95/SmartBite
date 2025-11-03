import type { Request, Response } from "express";
import { pool } from "../db/connection";
import { buildDashboardFilters } from "../utils/buildFilters";

// ✅ MÉTRICAS PRINCIPAIS COM FILTROS
export const getMetrics = async (req: Request, res: Response) => {
  console.log("📥 GET /metrics — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    const sql = `
      SELECT 
        COALESCE(SUM(s.total_amount), 0) AS total_revenue,
        COUNT(*) AS total_orders,
        COUNT(DISTINCT s.store_id) AS active_stores,
        CASE 
          WHEN COUNT(*) > 0 THEN SUM(s.total_amount) / COUNT(*)
          ELSE 0 
        END AS avg_ticket
      FROM sales s
      ${whereClause}
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ TENDÊNCIA (RECEITA + PEDIDOS) COM FILTROS
export const getRevenueTrend = async (req: Request, res: Response) => {
  console.log("📥 GET /revenue-trend — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    const sql = `
      SELECT
        TO_CHAR(DATE_TRUNC('month', s.created_at), 'Mon') AS name,
        SUM(s.total_amount) AS revenue,
        COUNT(*) AS orders
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

// ✅ VENDAS POR CANAL USANDO FILTROS
export const getSalesByChannel = async (req: Request, res: Response) => {
  console.log("📥 GET /sales-by-channel — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    const sql = `
      SELECT 
        c.name AS name,
        COUNT(*) AS value
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

// ✅ TOP PRODUTOS USANDO FILTROS
export const getTopProducts = async (req: Request, res: Response) => {
  console.log("📥 GET /top-products — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    const sql = `
      SELECT 
        p.name AS name,
        COUNT(*) AS sales
      FROM product_sales ps
      JOIN sales s ON s.id = ps.sale_id
      JOIN products p ON p.id = ps.product_id
      ${whereClause}
      GROUP BY p.name
      ORDER BY sales DESC
      LIMIT 5
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching top products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ ÚLTIMAS TRANSAÇÕES USANDO FILTROS
export const getRecentTransactions = async (req: Request, res: Response) => {
  console.log("📥 GET /recent-transactions — query recebida:", req.query);

  try {
    const { whereClause, params } = buildDashboardFilters(req.query);

    console.log("📌 WHERE:", whereClause);
    console.log("📌 PARAMS:", params);

    const sql = `
      SELECT
        s.id,
        p.name AS product,
        ps.total_price AS amount,
        TO_CHAR(s.created_at, 'DD/MM/YYYY') AS date
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
