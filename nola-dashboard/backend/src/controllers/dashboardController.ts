import type { Request, Response } from 'express';
import { pool } from '../db/connection.js';

// Get general metrics
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      WITH metrics AS (
        SELECT 
          SUM(valor_venda) as total_revenue,
          COUNT(*) as total_orders,
          COUNT(DISTINCT loja_id) as active_stores
        FROM vendas
        WHERE DATE(data_venda) >= NOW() - INTERVAL '30 days'
      )
      SELECT 
        total_revenue,
        total_orders,
        active_stores,
        CASE 
          WHEN total_orders > 0 THEN total_revenue / total_orders 
          ELSE 0 
        END as avg_ticket
      FROM metrics
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get revenue trend data
export const getRevenueTrend = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', data_venda), 'Mon') as name,
        SUM(valor_venda) as revenue,
        COUNT(*) as orders
      FROM vendas
      WHERE data_venda >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', data_venda)
      ORDER BY DATE_TRUNC('month', data_venda)
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching revenue trend:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get sales by channel data
export const getSalesByChannel = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.nome as name,
        COUNT(*) as value
      FROM vendas v
      JOIN canais c ON v.canal_id = c.id
      WHERE data_venda >= NOW() - INTERVAL '30 days'
      GROUP BY c.nome
      ORDER BY value DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales by channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get top products data
export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.nome as name,
        COUNT(*) as sales
      FROM vendas v
      JOIN produtos p ON v.produto_id = p.id
      WHERE data_venda >= NOW() - INTERVAL '30 days'
      GROUP BY p.nome
      ORDER BY sales DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get recent transactions
export const getRecentTransactions = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        v.id,
        p.nome as product,
        v.valor_venda as amount,
        v.status,
        TO_CHAR(v.data_venda, 'DD/MM/YYYY') as date
      FROM vendas v
      JOIN produtos p ON v.produto_id = p.id
      ORDER BY v.data_venda DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};