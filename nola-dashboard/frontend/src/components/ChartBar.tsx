// 📦 Importa React para criar o componente funcional
import React from 'react';

// 📊 Importa componentes do Recharts (biblioteca de gráficos)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/* ============================================================
📈 INTERFACE: ChartBarProps
===============================================================
Define o formato esperado dos dados:
- produto: nome do produto (string)
- quantidade_vendida: número total de vendas (number)
=========================================================== */
interface ChartBarProps {
  data: { produto: string; quantidade_vendida: number }[];
}

/* ============================================================
✂️ Função auxiliar: truncate()
===============================================================
Trunca textos longos no eixo X, adicionando reticências (...)
para evitar sobreposição entre labels dos produtos.
=========================================================== */
const truncate = (s: string, n = 20) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/* ============================================================
📊 COMPONENTE: ChartBar
===============================================================
Renderiza um gráfico de barras horizontais e responsivas,
usado para exibir os produtos mais vendidos no dashboard.
=========================================================== */
export const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  return (
    // 🧱 Container responsivo (se ajusta ao tamanho do pai)
    <ResponsiveContainer width="100%" height={360}>
      {/* ============================================================
      🧮 CONFIGURAÇÃO DO GRÁFICO
      ============================================================ */}
      <BarChart
        data={data} // 📊 Dados recebidos via props
        margin={{ top: 20, right: 20, left: 20, bottom: 80 }} // 📏 Margens internas
      >
        {/* 🧩 Linhas de grade */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* ============================================================
        🧾 EIXO X — Nomes dos produtos
        ============================================================ */}
        <XAxis
          dataKey="produto"            // 🔑 Campo usado no eixo X
          tick={{ fontSize: 12 }}      // 🔠 Tamanho da fonte das labels
          interval={0}                 // 📏 Exibe todas as labels (sem pular)
          angle={-45}                  // ↩️ Inclinação do texto (melhor leitura)
          textAnchor="end"             // 📍 Alinha o texto à direita
          height={80}                  // 📏 Espaço reservado para labels
          tickFormatter={(t) => truncate(String(t), 25)} // ✂️ Trunca nomes longos
        />

        {/* ============================================================
        📏 EIXO Y — Quantidade de vendas
        ============================================================ */}
        <YAxis />

        {/* ============================================================
        💬 TOOLTIP — Mostra valores ao passar o mouse
        ============================================================ */}
        <Tooltip formatter={(value: any) => [value, 'Vendas']} />

        {/* ============================================================
        📦 BARRAS DO GRÁFICO
        ============================================================
        - dataKey: campo usado para a altura das barras
        - fill: cor principal do gráfico
        - radius: cantos arredondados (superiores)
        ============================================================ */}
        <Bar
          dataKey="quantidade_vendida"
          fill="#ff5722"               // 🎨 Cor (laranja vibrante)
          radius={[6, 6, 0, 0]}        // 🟧 Arredonda os cantos superiores
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
