import React, { useEffect, useState } from "react";
import {
  getMetrics,
  getRevenueTrend,
  getSalesByChannel,
  getTopProducts,
  getRecentTransactions
} from "../api/dashboardService";
import { MetricCard } from "../components/metric-card";
import { FilterBar, type FilterState } from "../components/filter-bar";

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

import { DollarSign } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// ✅ Moeda humanizada
const currencyHuman = (n: number | string) => {
  const v = typeof n === "string" ? parseFloat(n) : n;

  if (v >= 1_000_000_000) return `R$ ${(v / 1_000_000_000).toFixed(1)} bilhões`;
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)} milhões`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(1)} mil`;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(v);
};

// ✅ Número humanizado
const numberHuman = (n: number | string) => {
  const v = typeof n === "string" ? parseFloat(n) : n;

  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)} bilhões`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} milhões`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)} mil`;

  return `${v}`;
};

// ✅ Moeda normal (para tabela)
const currency = (v: number | string) => {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(n || 0);
};

export default function Dashboard() {
  const [filter, setFilter] = useState<Partial<FilterState>>({});
  const [metrics, setMetrics] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [m, r, c, p, t] = await Promise.all([
          getMetrics(),
          getRevenueTrend(),
          getSalesByChannel(),
          getTopProducts(),
          getRecentTransactions()
        ]);
        setMetrics(m);
        setRevenueData(r);
        setChannelData(c);
        setProductData(p);
        setTransactions(t);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div className="p-6 space-y-4 bg-background">
      <FilterBar onFilterChange={setFilter} />
      <h1 className="text-2xl font-bold mb-2">Painel</h1>

      {loading && <div>Carregando...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* ✅ Métricas */}
      {!loading && !error && metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <MetricCard
            title="Faturamento Total"
            value={currencyHuman(metrics.total_revenue)}
            icon={<DollarSign className="h-6 w-6" />}
          />

          <MetricCard
            title="Total de Pedidos"
            value={numberHuman(metrics.total_orders)}
            icon={
              <svg className="h-6 w-6" stroke="currentColor" fill="none">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57L22 7H5.12" />
              </svg>
            }
          />

          <MetricCard
            title="Valor Médio do Pedido"
            value={currency(metrics.avg_ticket)}
            icon={
              <svg className="h-6 w-6" stroke="currentColor" fill="none">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            }
          />

          <MetricCard
            title="Lojas Ativas"
            value={numberHuman(metrics.active_stores)}
            icon={
              <svg className="h-6 w-6" stroke="currentColor" fill="none">
                <path d="m2 7 4.41-4.41A2 2 0 017.83 2h8.34a2 2 0 011.42.59L22 7" />
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <path d="M15 22v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" />
                <path d="M2 7h20" />
              </svg>
            }
          />

        </div>
      )}

      {/* ✅ Gráficos */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Tendência */}
          <div className="bg-card border border-card-border rounded-lg px-6 py-4">
            <h2 className="text-lg font-semibold mb-4">Tendência de Receita e Pedidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <YAxis
                  yAxisId="left"
                  width={70}
                  tick={{ fontSize: 11 }}
                  stroke="#3B82F6"
                  tickFormatter={(v) =>
                    `R$ ${v.toLocaleString("pt-BR", { notation: "compact" })}`
                  }
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10B981"
                  width={40}
                  tick={{ fontSize: 11 }}
                />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pizza */}
          <div className="bg-card border border-card-border rounded-lg px-6 py-4">
            <h2 className="text-lg font-semibold mb-4">Vendas por Canal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {channelData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ✅ Top produtos */}
      {!loading && !error && (
        <div className="bg-card border border-card-border rounded-lg px-6 py-4">
          <h2 className="text-lg font-semibold mb-4">Top 5 Produtos</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={productData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ✅ Transações */}
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
