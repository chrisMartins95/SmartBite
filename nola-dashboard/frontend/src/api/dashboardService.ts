// 📦 Importa a instância Axios configurada (arquivo api.ts)
import api from "./api";

/* ============================================================
🗓️ Função auxiliar: last30Days()
===============================================================
Retorna um objeto com duas datas:
- from → 30 dias atrás
- to → data atual
➡️ Usada como fallback quando o usuário não escolhe um intervalo.
=========================================================== */
function last30Days() {
  const to = new Date();    // 📅 Data atual
  const from = new Date();  // 📅 Nova instância de data
  from.setDate(to.getDate() - 30); // 🔙 Subtrai 30 dias
  return { from, to };      // 📤 Retorna intervalo completo
}

/* ============================================================
⚙️ Função auxiliar: buildQuery(filters)
===============================================================
Monta dinamicamente a query string que será enviada ao backend.
Aceita filtros de:
- Data (sempre obrigatório)
- Canal (opcional)
- Loja (opcional)
=========================================================== */
function buildQuery(filters: any) {
  const params = new URLSearchParams(); // 🧱 Cria estrutura de parâmetros da URL
  let range; // 📆 Armazena intervalo de datas (from / to)

  /* ============================================================
  ✅ 1. DATA — Garante que sempre haja intervalo válido
  ============================================================ */
  if (filters?.dateRange?.from && filters?.dateRange?.to) {
    range = filters.dateRange; // Usa o intervalo enviado
  } else {
    range = last30Days(); // 🕒 Se não houver, usa os últimos 30 dias
  }

  // 🗓️ Adiciona os parâmetros de data no formato ISO
  params.append("start", range.from.toISOString());
  params.append("end", range.to.toISOString());

  /* ============================================================
  ✅ 2. CANAL — Só adiciona se for diferente de “all”
  ============================================================ */
  if (filters?.channel && filters.channel !== "all") {
    params.append("channel", String(filters.channel));
  }

  /* ============================================================
  ✅ 3. LOJA — Só adiciona se for diferente de “all”
  ============================================================ */
  if (filters?.store && filters.store !== "all") {
    params.append("store", String(filters.store));
  }

  // 📤 Retorna a query string final (ex: start=...&end=...&channel=...)
  return params.toString();
}

/* ============================================================
📊 FUNÇÕES PRINCIPAIS — CHAMADAS À API DO DASHBOARD
===============================================================
Todas as funções abaixo chamam endpoints do backend e retornam 
os dados já processados para uso direto nos componentes do frontend.
=========================================================== */

/* 
------------------------------------------------------------
📈 MÉTRICAS PRINCIPAIS (cards superiores)
------------------------------------------------------------
*/
export const getMetrics = async (filters?: any) => {
  const q = buildQuery(filters); // 🧱 Monta a query com filtros
  const res = await api.get(`/dashboard/metrics?${q}`); // 🌐 Chamada GET
  return res.data; // 📤 Retorna dados prontos pro frontend
};

/* 
------------------------------------------------------------
📊 TENDÊNCIA DE RECEITA (gráfico de linha)
------------------------------------------------------------
*/
export const getRevenueTrend = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/revenue-trend?${q}`);
  return res.data;
};

/* 
------------------------------------------------------------
🛒 VENDAS POR CANAL (gráfico de pizza ou barras)
------------------------------------------------------------
*/
export const getSalesByChannel = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/sales-by-channel?${q}`);
  return res.data;
};

/* 
------------------------------------------------------------
🏆 TOP PRODUTOS (ranking dos mais vendidos)
------------------------------------------------------------
*/
export const getTopProducts = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/top-products?${q}`);
  return res.data;
};

/* 
------------------------------------------------------------
💰 TRANSAÇÕES RECENTES (lista das últimas vendas)
------------------------------------------------------------
*/
export const getRecentTransactions = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/recent-transactions?${q}`);
  return res.data;
};
