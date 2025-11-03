import type { Request, Response } from "express";
import { pool } from "../db/connection";

export const getChannels = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name, type
      FROM channels
      ORDER BY name;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar channels:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

export const getStores = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name
      FROM stores
      WHERE is_active = true
      ORDER BY name;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar stores:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};
