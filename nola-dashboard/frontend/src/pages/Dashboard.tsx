import React from "react";
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

// 🎨 Cores para o gráfico de pizza
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// 📊 Dados simulados (substitua depois pelos reais)
const revenueData = [
  { name: "Jan", revenue: 42000, orders: 120 },
  { name: "Fev", revenue: 38000, orders: 100 },
  { name: "Mar", revenue: 45000, orders: 150 },
  { name: "Abr", revenue: 47000, orders: 160 },
  { name: "Mai", revenue: 52000, orders: 180 },
];

const channelData = [
  { name: "Site", value: 45 },
  { name: "Instagram", value: 25 },
  { name: "WhatsApp", value: 20 },
  { name: "Outros", value: 10 },
];

const productData = [
  { name: "Produto A", sales: 400 },
  { name: "Produto B", sales: 300 },
  { name: "Produto C", sales: 250 },
  { name: "Produto D", sales: 200 },
  { name: "Produto E", sales: 150 },
];

const transactions = [
  { id: 1, product: "Produto A", amount: "R$ 200,00", status: "Pago", date: "01/11/2025" },
  { id: 2, product: "Produto B", amount: "R$ 150,00", status: "Pendente", date: "31/10/2025" },
  { id: 3, product: "Produto C", amount: "R$ 300,00", status: "Pago", date: "30/10/2025" },
];

export default function Dashboard() {
  const [filter, setFilter] = React.useState<Partial<FilterState>>({});

  return (
    <div className="p-6 space-y-4 bg-background">

      {/* Barra de filtros */}
      <FilterBar onFilterChange={setFilter} />
      
      {/* ✅ Título da página */}
      <h1 className="text-2xl font-bold mb-2">Painel</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <MetricCard title="Faturamento Total" value="R$ 52.000,00" icon={<DollarSign className="h-6 w-6" />} />

        <MetricCard
          title="Total de Pedidos"
          value="180"
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
          value="R$ 288,89"
          icon={
            <svg className="h-6 w-6" stroke="currentColor" fill="none">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          }
        />

        <MetricCard
          title="Lojas Ativas"
          value="12"
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

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ✅ Gráfico de tendência */}
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
                tickFormatter={(v) => `R$ ${v.toLocaleString("pt-BR", { notation: "compact" })}`}
              />

              <YAxis yAxisId="right" orientation="right" stroke="#10B981" width={40} tick={{ fontSize: 11 }} />

              <XAxis dataKey="name" stroke="#9CA3AF" />

              <Tooltip formatter={(value, name) =>
                name === "revenue" ? [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"] : [value, "Pedidos"]
              } />

              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ GRÁFICO DE PIZZA — atualizado com labels coloridos */}
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
                label={({ name, value, percent, cx, cy, midAngle, outerRadius, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 20;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill={COLORS[index]}
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={14}
                      fontWeight={700}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {channelData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras */}
      {/* ✅ Gráfico de Barras — agora horizontal */}
<div className="bg-card border border-card-border rounded-lg px-6 py-4">
  <h2 className="text-lg font-semibold mb-4">Top 5 Produtos</h2>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart
      data={productData}
      layout="vertical"       // ✅ transforma o gráfico em horizontal
      margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

      {/* ✅ Produtos no eixo Y */}
      <YAxis
        type="category"
        dataKey="name"
        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        width={80}
      />

      {/* ✅ Valores no eixo X */}
      <XAxis
        type="number"
        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
      />

      <Tooltip />

      {/* ✅ Barra horizontal */}
      <Bar dataKey="sales" fill="#3B82F6" radius={[0, 6, 6, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>


      {/* Tabela */}
      <div className="bg-card border border-card-border rounded-lg px-6 py-4">
        <h2 className="text-lg font-semibold mb-4">Transações Recentes</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border text-left">
              <th className="py-2">Produto</th>
              <th className="py-2">Valor</th>
              <th className="py-2">Status</th>
              <th className="py-2">Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-card-border hover:bg-muted/20 transition">
                <td className="py-2">{t.product}</td>
                <td className="py-2">{t.amount}</td>
                <td className="py-2">{t.status}</td>
                <td className="py-2">{t.date}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
