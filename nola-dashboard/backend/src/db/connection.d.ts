// 🧩 Importa a classe Pool do pacote 'pg' (PostgreSQL)
import { Pool } from 'pg';

/* 
=========================================================
💾 Conexão com o Banco de Dados — Declaração do Pool
=========================================================
Esta declaração garante que o TypeScript saiba que existe
um objeto `pool` exportado em outro arquivo (connection.ts),
responsável por gerenciar as conexões com o banco PostgreSQL.
*/

// 🔗 Exporta o pool de conexões do PostgreSQL
export declare const pool: Pool;

// 🗺️ Mapa de origem TypeScript — usado apenas para debugging
//# sourceMappingURL=connection.d.ts.map
