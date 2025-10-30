import type { Request, Response } from 'express';
import { pool } from '../db/connection.js';

export const getTopProdutos = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        p.name AS produto,
        SUM(ps.quantity)::int AS quantidade_vendida,
        ROUND(SUM(ps.total_price)::numeric, 2) AS valor_total
      FROM product_sales ps
      JOIN products p ON ps.product_id = p.id
      GROUP BY p.name
      ORDER BY SUM(ps.quantity) DESC
      LIMIT 10;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos mais vendidos' });
  }
};
