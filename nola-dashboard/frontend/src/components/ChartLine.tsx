// 📦 Importa React para criar o componente funcional
import React from 'react';

// 📊 Importa componentes essenciais do Recharts (gráficos de linha)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/* ============================================================
📈 INTERFACE: Point
===============================================================
Define o formato esperado dos dados do gráfico:
- day: data ou rótulo do eixo X
- sales_count: número total de vendas no dia
- revenue: receita total (pode ser usada em gráficos futuros)
=========================================================== */
interface Point {
  day: string;
  sales_count: number;
  revenue: number;
}

/* ============================================================
📉 COMPONENTE: ChartLine
===============================================================
Renderiza um gráfico de linha responsivo mostrando a evolução 
das vendas (ou receita) ao longo do tempo.

💡 Ideal para dashboards de tendências e desempenho.
=========================================================== */
export const ChartLine: React.FC<{ data: Point[] }> = ({ data }) => {
  return (
    // 🧱 Container responsivo que ajusta automaticamente o gráfico
    <ResponsiveContainer width="100%" height={300}>
      {/* ============================================================
      🧮 CONFIGURAÇÃO DO GRÁFICO
      ============================================================ */}
      <LineChart
        data={data} // 📊 Dados do gráfico
        margin={{ top: 10, right: 20, left: 0, bottom: 20 }} // 📏 Margens internas
      >
        {/* ============================================================
        🧩 GRADE DE FUNDO
        ============================================================ */}
        <CartesianGrid
          strokeDasharray="3 3" // Linhas tracejadas
          stroke="hsl(var(--muted-foreground)/0.2)" // 🎨 Cor suave (usa variável do tema)
        />

        {/* ============================================================
        📅 EIXO X — Datas (dias)
        ============================================================ */}
        <XAxis
          dataKey="day" // 🔑 Campo usado como rótulo no eixo X
          tickFormatter={(d) => (d ? d.toString().slice(5) : '')} // ✂️ Mostra apenas mês/dia (remove ano)
          tick={{
            fontWeight: 400,
            fill: 'hsl(var(--foreground))', // 🎨 Cor dinâmica do tema
            fontSize: 12,
          }}
        />

        {/* ============================================================
        📏 EIXO Y — Quantidade de vendas
        ============================================================ */}
        <YAxis
          tick={{
            fontWeight: 400,
            fill: 'hsl(var(--foreground))',
            fontSize: 12,
          }}
        />

        {/* ============================================================
        💬 TOOLTIP — Informações ao passar o mouse
        ============================================================ */}
        <Tooltip
          formatter={(value: any, name: string) => [
            value,
            name === 'sales_count' ? 'Vendas' : 'Receita', // 🔁 Nome dinâmico no tooltip
          ]}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))', // 🪶 Fundo adaptado ao tema
            borderColor: 'hsl(var(--card-border))',
            color: 'hsl(var(--foreground))',
          }}
        />

        {/* ============================================================
        📈 LINHA PRINCIPAL DO GRÁFICO
        ============================================================
        - type: suaviza a curva ("monotone")
        - dataKey: campo usado para o valor da linha
        - stroke: cor da linha (usando variável de tema)
        - dot: desativa pontos individuais (visual mais limpo)
        ============================================================ */}
        <Line
          type="monotone"
          dataKey="sales_count"
          stroke="hsl(var(--accent))"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
