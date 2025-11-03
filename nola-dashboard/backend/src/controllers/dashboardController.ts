import type { Request, Response } from "express";
import { pool } from "../db/connection";

// ======================================================
// ✅ MÉTRICAS GERAIS (últimos 30 dias)
// ======================================================
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      WITH metrics AS (
        SELECT
          SUM(total_price) AS total_revenue,
          COUNT(DISTINCT sale_id) AS total_orders
        FROM product_sales
        WHERE NOW() - INTERVAL '30 days' <= NOW()
      )
      SELECT
        total_revenue,
        total_orders,
        CASE
          WHEN total_orders > 0 THEN total_revenue / total_orders
          ELSE 0
        END AS avg_ticket
      FROM metrics
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ======================================================
// ✅ TENDÊNCIA DE RECEITA (6 últimos meses)
// ======================================================
export const getRevenueTrend = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', NOW()), 'Mon') AS name,
        SUM(total_price) AS revenue,
        COUNT(*) AS orders
      FROM product_sales
      GROUP BY DATE_TRUNC('month', NOW())
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching revenue trend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ======================================================
// ✅ VENDAS POR CANAL (TAKEOUT / DELIVERY / INDOOR)
// ======================================================
export const getSalesByChannel = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        delivery_type AS name,
        COUNT(*) AS value
      FROM delivery_sales
      GROUP BY delivery_type
      ORDER BY value DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sales by channel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ======================================================
// ✅ TOP PRODUTOS (mais vendidos)
// ======================================================
export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        p.name AS name,
        COUNT(*) AS sales
      FROM product_sales s
      JOIN products p ON p.id = s.product_id
      GROUP BY p.name
      ORDER BY sales DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ======================================================
// ✅ ÚLTIMAS TRANSAÇÕES
// ======================================================
export const getRecentTransactions = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        p.name AS product,
        s.total_price AS amount,
        s.sale_id,
        TO_CHAR(NOW(), 'DD/MM/YYYY') AS date
      FROM product_sales s
      JOIN products p ON p.id = s.product_id
      ORDER BY s.id DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
