import type { Request, Response } from 'express';
import { pool } from '../db/connection';

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

export const getTopProdutosFiltrado = async (req: Request, res: Response) => {
  try {
    // 🔹 Pegamos os filtros passados na URL como query params
    const { dataInicio, dataFim, loja, canal } = req.query;

    // 🔹 Montamos os filtros dinamicamente
    const filtros: string[] = [];
    const valores: any[] = [];

    if (dataInicio) {
      filtros.push(`s.created_at >= $${filtros.length + 1}`);
      valores.push(dataInicio);
    }

    if (dataFim) {
      filtros.push(`s.created_at <= $${filtros.length + 1}`);
      valores.push(dataFim);
    }

    if (loja) {
      filtros.push(`s.store_id = $${filtros.length + 1}`);
      valores.push(loja);
    }

    if (canal) {
      filtros.push(`s.channel_id = $${filtros.length + 1}`);
      valores.push(canal);
    }

    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    // 🔹 Consulta SQL com os filtros aplicados dinamicamente
    const query = `
      SELECT
        p.name AS produto,
        SUM(ps.quantity)::int AS quantidade_vendida,
        ROUND(SUM(ps.total_price)::numeric, 2) AS valor_total
      FROM product_sales ps
      JOIN products p ON ps.product_id = p.id
      JOIN sales s ON s.id = ps.sale_id
      ${whereClause}
      GROUP BY p.name
      ORDER BY valor_total DESC
      LIMIT 10;
    `;

    const { rows } = await pool.query(query, valores);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar produtos filtrados:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos filtrados' });
  }
};
