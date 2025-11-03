import api from "./api";

function last30Days() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 30);
  return { from, to };
}

// ✅ monta a query string com os filtros
function buildQuery(filters: any) {
  const params = new URLSearchParams();

  // ✅ garante datas SEMPRE (backend precisa disso)
  let range;

  if (filters?.dateRange?.from && filters?.dateRange?.to) {
    range = filters.dateRange;
  } else {
    range = last30Days(); // fallback automático
  }

  params.append("start", range.from.toISOString());
  params.append("end", range.to.toISOString());

  // ✅ Canal (se não for "all")
  if (filters?.channel && filters.channel !== "all") {
    params.append("channel", String(filters.channel));
  }

  // ✅ Loja (se não for "all")
  if (filters?.store && filters.store !== "all") {
    params.append("store", String(filters.store));
  }

  return params.toString();
}

// ✅ MÉTRICAS
export const getMetrics = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/metrics?${q}`);
  return res.data;
};

// ✅ TENDÊNCIA
export const getRevenueTrend = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/revenue-trend?${q}`);
  return res.data;
};

// ✅ VENDAS POR CANAL
export const getSalesByChannel = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/sales-by-channel?${q}`);
  return res.data;
};

// ✅ TOP PRODUTOS
export const getTopProducts = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/top-products?${q}`);
  return res.data;
};

// ✅ TRANSAÇÕES RECENTES
export const getRecentTransactions = async (filters?: any) => {
  const q = buildQuery(filters);
  const res = await api.get(`/dashboard/recent-transactions?${q}`);
  return res.data;
};
