// 📦 Importa o Router do Express (para definir endpoints da API)
import { Router } from "express";

// 🧩 Importa os controladores responsáveis por retornar dados auxiliares
import { getChannels, getStores } from "../controllers/metaController";

// 🚀 Cria uma nova instância do roteador do Express
export const router = Router();

/* ============================================================
🧭 ROTAS META — DADOS AUXILIARES DO SISTEMA
===============================================================
Essas rotas retornam informações de apoio utilizadas no dashboard,
como listas de canais e lojas ativas, para preencher filtros e selects.
=========================================================== */

// 🌐 Rota que retorna todos os canais cadastrados (ex: online, físico, marketplace)
router.get("/channels", getChannels);

// 🏬 Rota que retorna todas as lojas ativas cadastradas no sistema
router.get("/stores", getStores);
