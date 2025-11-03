// ✅ IMPORTAÇÕES
// 📦 React + hooks
import React, { useEffect, useState } from "react";

// 🔗 Serviços de API — responsáveis por buscar dados no backend
import {
  getMetrics,
  getRevenueTrend,
  getSalesByChannel,
  getTopProducts,
  getRecentTransactions
} from "../api/dashboardService";

// 🧩 Componentes visuais
import { MetricCard } from "../components/metric-card";
import { FilterBar, type FilterState } from "../components/filter-bar";

// 📊 Biblioteca de gráficos Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// 💰 Ícones
import { DollarSign } from "lucide-react";

// 🎨 Paleta padrão dos gráficos
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

/* ============================================================
🗓️ MAPEAMENTO DOS MESES — inglês ➜ português
=========================================================== */
const monthMap: Record<string, string> = {
  Jan: "Jan", Feb: "Fev", Mar: "Mar", Apr: "Abr", May: "Mai", Jun: "Jun",
  Jul: "Jul", Aug: "Ago", Sep: "Set", Oct: "Out", Nov: "Nov", Dec: "Dez",
};

/* ============================================================
💰 FUNÇÕES DE FORMATAÇÃO
=========================================================== */

// 💵 Formata valores grandes de forma humanizada (R$, milhões, bilhões, etc.)
const currencyHuman = (n: number | string) => {
  const v = typeof n === "string" ? parseFloat(n) : n;

  if (v >= 1_000_000_000) return `R$ ${(v / 1_000_000_000).toFixed(1)} bilhões`;
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)} milhões`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(1)} mil`;

  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
};

// 🔢 Formata números grandes (1.000 ➜ 1 mil, 1.000.000 ➜ 1 milhão)
const numberHuman = (n: number | string) => {
  const v = typeof n === "string" ? parseFloat(n) : n;

  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)} bilhões`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} milhões`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)} mil`;
  return `${v}`;
};

// 💸 Formatação simples de moeda (R$)
const currency = (v: number | string) => {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n || 0);
};

/* ============================================================
📊 COMPONENTE PRINCIPAL: Dashboard
=========================================================== */
export default function Dashboard() {
  // 🎛️ Estado dos filtros
  const [filter, setFilter] = useState<Partial<FilterState>>({});

  // 📊 Estados dos dados do dashboard
  const [metrics, setMetrics] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // ⚙️ Estado de controle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ============================================================
  🔁 EFEITO PRINCIPAL — BUSCA DOS DADOS DO DASHBOARD
  ============================================================ */
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        // 🔄 Busca paralela de todos os blocos de dados
        const [m, r, c, p, t] = await Promise.all([
          getMetrics(filter),
          getRevenueTrend(filter),
          getSalesByChannel(filter),
          getTopProducts(filter),
          getRecentTransactions(filter),
        ]);

        // 💾 Armazena resultados
        setMetrics(m);
        setRevenueData(r);

        // 🔧 Converte números e normaliza canais
        setChannelData(c.map((item: any) => ({ ...item, value: Number(item.value) || 0 })));

        // 🧩 Limpa nomes dos produtos (remove "#123")
        setProductData(
          p.map((item: any) => ({
            ...item,
            name: item.name.replace(/^#\d+[\s-]*/, "").replace(/\s?#\d+\b/g, "").trim(),
          }))
        );

        // 💳 Normaliza nomes de produtos em transações
        setTransactions(
          t.map((item: any) => ({
            ...item,
            product: item.product.replace(/^#\d+[\s-]*/, "").replace(/\s?#\d+\b/g, "").trim(),
          }))
        );
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [filter]);

  /* ============================================================
  🧱 RENDERIZAÇÃO
  ============================================================ */
  return (
    <div className="p-6 space-y-4 bg-background">
      {/* 🎛️ Barra de Filtros */}
      <FilterBar onFilterChange={setFilter} />

      <h1 className="text-2xl font-bold mb-2">Painel</h1>

      {/* 🔄 Estados de carregamento e erro */}
      {loading && <div>Carregando...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* ✅ MÉTRICAS GERAIS */}
      {!loading && !error && metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Faturamento Total" value={currencyHuman(metrics.total_revenue)} icon={<DollarSign className="h-6 w-6" />} />
          <MetricCard title="Total de Pedidos" value={numberHuman(metrics.total_orders)} />
          <MetricCard title="Valor Médio do Pedido" value={currency(metrics.avg_ticket)} />
          <MetricCard title="Lojas Ativas" value={numberHuman(metrics.active_stores)} />
        </div>
      )}

      {/* ✅ GRÁFICOS */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 📈 Tendência de Receita e Pedidos */}
          <div className="bg-card border border-card-border rounded-lg px-6 py-4">
            <h2 className="text-lg font-semibold mb-4">Tendência de Receita e Pedidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9CA3AF" tickFormatter={(v) => monthMap[v] || v} />
                <YAxis yAxisId="left" width={70} tick={{ fontSize: 11 }} stroke="#3B82F6"
                  tickFormatter={(v) => `R$ ${v.toLocaleString("pt-BR", { notation: "compact" })}`} />
                <YAxis yAxisId="right" orientation="right" width={40} tick={{ fontSize: 11 }} stroke="#10B981" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot connectNulls />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} dot connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🥧 Vendas por Canal */}
          <div className="bg-card border border-card-border rounded-lg px-6 py-4">
            <h2 className="text-lg font-semibold mb-4">Vendas por Canal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}
                  label={({ name, percent }) => `${name} - ${(percent * 100).toFixed(1)}%`}>
                  {channelData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString("pt-BR")} vendas`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 🏆 TOP PRODUTOS */}
      {!loading && !error && (
        <div className="bg-card border border-card-border rounded-lg px-6 py-4">
          <h2 className="text-lg font-semibold mb-4">Top 5 Produtos</h2>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={productData} layout="vertical" margin={{ top: 10, right: 40, left: 110, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 13 }} width={110} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 💳 TRANSACOES RECENTES */}
      {!loading && !error && (
        <div className="bg-card border border-card-border rounded-lg px-6 py-4">
          <h2 className="text-lg font-semibold mb-4">Transações Recentes</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left">
                <th className="py-2">Produto</th>
                <th className="py-2">Valor</th>
                <th className="py-2">Pedido</th>
                <th className="py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t: any) => (
                <tr key={t.id} className="border-b border-card-border hover:bg-muted/20 transition">
                  <td className="py-2">{t.product}</td>
                  <td className="py-2">{currency(t.amount)}</td>
                  <td className="py-2">{t.sale_id}</td>
                  <td className="py-2">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
