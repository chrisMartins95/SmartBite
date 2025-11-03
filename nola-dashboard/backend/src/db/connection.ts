// 🧩 Importa a classe Pool, responsável por gerenciar conexões com o PostgreSQL
import { Pool } from 'pg';

// ⚙️ Importa o pacote dotenv para carregar variáveis de ambiente (.env)
import dotenv from 'dotenv';

// 🌍 Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/* ============================================================
💾 CONFIGURAÇÃO DO BANCO DE DADOS (PostgreSQL)
===============================================================
Este arquivo cria e exporta uma instância do `Pool` do pacote `pg`,
usada para realizar consultas ao banco de dados.
Ele lê as configurações (host, porta, usuário, senha, nome)
a partir das variáveis de ambiente.
=========================================================== */

/* 
------------------------------------------------------------
📥 Lê as variáveis de ambiente com fallback padrão
------------------------------------------------------------
Caso as variáveis DB_* não existam, o código tenta usar as PG_*
ou valores padrão (para rodar localmente ou em Docker).
*/

const DB_HOST =
  process.env.DB_HOST || process.env.PG_HOST || process.env.PGHOST || 'postgres'; // 🏠 Endereço do banco
const DB_PORT = Number(
  process.env.DB_PORT || process.env.PG_PORT || process.env.PGPORT || 5432 // 🚪 Porta padrão: 5432
);
const DB_USER =
  process.env.DB_USER || process.env.PG_USER || process.env.PGUSER || 'challenge'; // 👤 Usuário
const DB_PASSWORD =
  process.env.DB_PASSWORD ||
  process.env.PG_PASSWORD ||
  process.env.PGPASSWORD ||
  'challenge_2024'; // 🔐 Senha
const DB_NAME =
  process.env.DB_NAME ||
  process.env.PG_DATABASE ||
  process.env.PGDATABASE ||
  'challenge_db'; // 🗃️ Nome do banco de dados

/* 
------------------------------------------------------------
🔗 Cria a instância do Pool com as configurações definidas
------------------------------------------------------------
O Pool gerencia múltiplas conexões simultâneas com o banco,
otimizando o desempenho das consultas SQL.
*/
export const pool = new Pool({
  host: DB_HOST,         // 🏠 Endereço do servidor PostgreSQL
  port: DB_PORT,         // 🚪 Porta de conexão
  user: DB_USER,         // 👤 Usuário do banco
  password: DB_PASSWORD, // 🔐 Senha do usuário
  database: DB_NAME,     // 🗃️ Nome do banco
});
