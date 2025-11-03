// 📦 Importa a instância de API configurada (Axios) com baseURL definida
import api from "./api";

/* ============================================================
🌐 SERVIÇOS META — CANAIS E LOJAS
===============================================================
Essas funções fazem chamadas HTTP para o backend e retornam 
os dados de "canais" e "lojas" cadastrados no sistema.

➡️ São usadas em componentes do frontend (ex: filtros, selects, etc.)
para popular listas dinâmicas.
=========================================================== */

/* 
===========================================================
🌐 getChannels — Busca todos os canais de venda disponíveis
===========================================================
*/
export const getChannels = async () => {
  // 📡 Faz requisição GET para o endpoint /meta/channels
  const res = await api.get("/meta/channels");

  // 📤 Retorna apenas os dados da resposta (sem headers ou status)
  return res.data;
};

/* 
===========================================================
🏬 getStores — Busca todas as lojas ativas
===========================================================
*/
export const getStores = async () => {
  // 📡 Faz requisição GET para o endpoint /meta/stores
  const res = await api.get("/meta/stores");

  // 📤 Retorna os dados recebidos do backend
  return res.data;
};
