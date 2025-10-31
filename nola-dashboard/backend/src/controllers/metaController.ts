import type { Request, Response } from 'express';
import { pool } from '../db/connection.js';

export const getStores = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM stores ORDER BY name LIMIT 500');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar stores:', err);
    res.status(500).json({ error: 'Erro ao buscar lojas' });
  }
};

export const getChannels = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM channels ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar channels:', err);
    res.status(500).json({ error: 'Erro ao buscar canais' });
  }
};
