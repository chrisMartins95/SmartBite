// 📦 Importa os tipos Request e Response do Express (para tipagem correta das rotas)
import type { Request, Response } from "express";

// 🔗 Importa a conexão com o banco de dados (pool do PostgreSQL)
import { pool } from "../db/connection";

/* ============================================================
🧠 CONTROLADOR META — CANAIS E LOJAS
Essas funções fornecem dados auxiliares do sistema, usados
para popular filtros e selects do dashboard.
============================================================ */

/* 
===========================================================
🌐 GET /channels — Retorna todos os canais de venda
(ex: loja física, e-commerce, marketplace, etc.)
===========================================================
*/
export const getChannels = async (req: Request, res: Response) => {
  try {
    // 💾 Consulta todos os canais cadastrados, ordenados por nome
    const result = await pool.query(`
      SELECT id, name, type
      FROM channels
      ORDER BY name;
    `);

    // 📤 Retorna o resultado em formato JSON
    res.json(result.rows);
  } catch (error) {
    // ⚠️ Caso ocorra algum erro na consulta
    console.error("❌ Erro ao buscar channels:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

/* 
===========================================================
🏬 GET /stores — Retorna todas as lojas ativas
===========================================================
*/
export const getStores = async (req: Request, res: Response) => {
  try {
    // 💾 Consulta apenas lojas com is_active = true
    const result = await pool.query(`
      SELECT id, name
      FROM stores
      WHERE is_active = true
      ORDER BY name;
    `);

    // 📤 Retorna o resultado em formato JSON
    res.json(result.rows);
  } catch (error) {
    // ⚠️ Caso ocorra algum erro na consulta
    console.error("❌ Erro ao buscar stores:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};
