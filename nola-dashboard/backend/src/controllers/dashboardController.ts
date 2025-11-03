import type { Request, Response } from 'express';
import { pool } from '../db/connection';

// ✅ MÉTRICAS GERAIS
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      WITH metrics AS (
        SELECT 
          SUM(total_amount) AS total_revenue,
          COUNT(*) AS total_orders,
          COUNT(DISTINCT store_id) AS active_stores
        FROM sales s
        WHERE s.created_at >= NOW() - INTERVAL '30 days'
      )
      SELECT
        total_revenue,
        total_orders,
        active_stores,
        CASE
          WHEN total_orders > 0 THEN total_revenue / total_orders
          ELSE 0
        END AS avg_ticket
      FROM metrics
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ TENDÊNCIA 6 MESES
export const getRevenueTrend = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', s.created_at), 'Mon') AS name,
        SUM(s.total_amount) AS revenue,
        COUNT(*) AS orders
      FROM sales s
      WHERE s.created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', s.created_at)
      ORDER BY DATE_TRUNC('month', s.created_at)
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching revenue trend:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ VENDAS POR CANAL (CORRIGIDO 100%)
export const getSalesByChannel = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        c.name AS name,
        COUNT(*) AS value
      FROM sales s
      JOIN channels c ON s.channel_id = c.id
      WHERE s.created_at >= NOW() - INTERVAL '30 days'
      GROUP BY c.name
      ORDER BY value DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales by channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ TOP PRODUTOS (5 MAIS VENDIDOS)
export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        p.name AS name,
        COUNT(*) AS sales
      FROM product_sales ps
      JOIN sales s ON ps.sale_id = s.id
      JOIN products p ON ps.product_id = p.id
      WHERE s.created_at >= NOW() - INTERVAL '30 days'
      GROUP BY p.name
      ORDER BY sales DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ ÚLTIMAS TRANSAÇÕES
export const getRecentTransactions = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        p.name AS product,
        ps.total_price AS amount,
        s.sale_status_desc AS status,
        TO_CHAR(s.created_at, 'DD/MM/YYYY') AS date
      FROM sales s
      JOIN product_sales ps ON ps.sale_id = s.id
      JOIN products p ON ps.product_id = p.id
      ORDER BY s.created_at DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
