import type { Request, Response } from 'express';
import { pool } from '../db/connection';

// Helper to build WHERE clause and params from query
function buildFilters(query: any) {
  const { dataInicio, dataFim, loja, canal } = query;
  const filtros: string[] = [];
  const valores: any[] = [];

  if (dataInicio) {
    valores.push(dataInicio);
    filtros.push(`s.created_at >= $${valores.length}`);
  }
  if (dataFim) {
    valores.push(dataFim);
    filtros.push(`s.created_at <= $${valores.length}`);
  }
  if (loja) {
    valores.push(Number(loja));
    filtros.push(`s.store_id = $${valores.length}`);
  }
  if (canal) {
    valores.push(Number(canal));
    filtros.push(`s.channel_id = $${valores.length}`);
  }

  const whereSQL = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
  return { whereSQL, valores };
}

export const explorar = async (req: Request, res: Response) => {
  try {
    const { whereSQL, valores } = buildFilters(req.query);

    // 1) Aggregated metrics: total sales, revenue, avg ticket
    const metricsQuery = `
      SELECT
        COUNT(*)::int AS total_sales,
        COALESCE(ROUND(SUM(total_amount)::numeric, 2), 0) AS total_revenue,
        COALESCE(ROUND(AVG(total_amount)::numeric, 2), 0) AS avg_ticket
      FROM sales s
      ${whereSQL};
    `;

    const metricsResult = await pool.query(metricsQuery, valores);
    const metrics = metricsResult.rows[0] || { total_sales: 0, total_revenue: 0, avg_ticket: 0 };

    // 2) Top products (limit optional)
    const limit = req.query.limit ? Math.max(1, Number(req.query.limit)) : 10;
    const productsQuery = `
      SELECT
        p.name AS produto,
        SUM(ps.quantity)::int AS quantidade_vendida,
        COALESCE(ROUND(SUM(ps.total_price)::numeric, 2), 0) AS valor_total
      FROM product_sales ps
      JOIN products p ON ps.product_id = p.id
      JOIN sales s ON ps.sale_id = s.id
      ${whereSQL}
      GROUP BY p.name
      ORDER BY SUM(ps.quantity) DESC
      LIMIT ${limit};
    `;
    const productsResult = await pool.query(productsQuery, valores);

    // 3) Sales by channel
    const byChannelQuery = `
      SELECT c.name AS channel, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      JOIN channels c ON s.channel_id = c.id
      ${whereSQL}
      GROUP BY c.name
      ORDER BY sales_count DESC;
    `;
    const byChannelResult = await pool.query(byChannelQuery, valores);

    // 5) Sales timeseries (daily)
    const timeseriesQuery = `
      SELECT DATE_TRUNC('day', s.created_at)::date AS day, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      ${whereSQL}
      GROUP BY day
      ORDER BY day ASC
      LIMIT 365;
    `;
    const timeseriesResult = await pool.query(timeseriesQuery, valores);

    // 4) Sales by store (top 10)
    const byStoreQuery = `
      SELECT st.name AS store, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      JOIN stores st ON s.store_id = st.id
      ${whereSQL}
      GROUP BY st.name
      ORDER BY sales_count DESC
      LIMIT 10;
    `;
    const byStoreResult = await pool.query(byStoreQuery, valores);

    res.json({
      metrics,
      top_products: productsResult.rows,
      sales_by_channel: byChannelResult.rows,
      sales_by_store: byStoreResult.rows,
      sales_timeseries: timeseriesResult.rows,
    });
  } catch (err) {
    console.error('Erro na rota /api/explorar:', err);
    res.status(500).json({ error: 'Erro ao explorar dados' });
  }
};

// Endpoints individuais para Explorar
export const getExploreMetrics = async (req: Request, res: Response) => {
  try {
    const { whereSQL, valores } = buildFilters(req.query);
    const metricsQuery = `
      SELECT
        COUNT(*)::int AS total_sales,
        COALESCE(ROUND(SUM(total_amount)::numeric, 2), 0) AS total_revenue,
        COALESCE(ROUND(AVG(total_amount)::numeric, 2), 0) AS avg_ticket
      FROM sales s
      ${whereSQL};
    `;
    const metricsResult = await pool.query(metricsQuery, valores);
    res.json(metricsResult.rows[0] || { total_sales: 0, total_revenue: 0, avg_ticket: 0 });
  } catch (err) {
    console.error('Error getting explore metrics:', err);
    res.status(500).json({ error: 'Error getting explore metrics' });
  }
};

export const getSalesTimeseries = async (req: Request, res: Response) => {
  try {
    const { whereSQL, valores } = buildFilters(req.query);
    const timeseriesQuery = `
      SELECT DATE_TRUNC('day', s.created_at)::date AS day, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      ${whereSQL}
      GROUP BY day
      ORDER BY day ASC
      LIMIT 365;
    `;
    const timeseriesResult = await pool.query(timeseriesQuery, valores);
    res.json(timeseriesResult.rows);
  } catch (err) {
    console.error('Error getting sales timeseries:', err);
    res.status(500).json({ error: 'Error getting sales timeseries' });
  }
};

export const getExploreSalesByChannel = async (req: Request, res: Response) => {
  try {
    const { whereSQL, valores } = buildFilters(req.query);
    const byChannelQuery = `
      SELECT c.name AS channel, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      JOIN channels c ON s.channel_id = c.id
      ${whereSQL}
      GROUP BY c.name
      ORDER BY sales_count DESC;
    `;
    const byChannelResult = await pool.query(byChannelQuery, valores);
    res.json(byChannelResult.rows);
  } catch (err) {
    console.error('Error getting sales by channel:', err);
    res.status(500).json({ error: 'Error getting sales by channel' });
  }
};

export const getSalesByStore = async (req: Request, res: Response) => {
  try {
    const { whereSQL, valores } = buildFilters(req.query);
    const byStoreQuery = `
      SELECT st.name AS store, COUNT(*)::int AS sales_count, COALESCE(ROUND(SUM(s.total_amount)::numeric,2),0) AS revenue
      FROM sales s
      JOIN stores st ON s.store_id = st.id
      ${whereSQL}
      GROUP BY st.name
      ORDER BY sales_count DESC
      LIMIT 10;
    `;
    const byStoreResult = await pool.query(byStoreQuery, valores);
    res.json(byStoreResult.rows);
  } catch (err) {
    console.error('Error getting sales by store:', err);
    res.status(500).json({ error: 'Error getting sales by store' });
  }
};
