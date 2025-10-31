import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartBarProps {
  data: { produto: string; quantidade_vendida: number }[];
}

const truncate = (s: string, n = 20) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="produto"
          tick={{ fontSize: 12 }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={80}
          tickFormatter={(t) => truncate(String(t), 25)}
        />
        <YAxis />
        <Tooltip formatter={(value: any) => [value, 'Vendas']} />
        <Bar dataKey="quantidade_vendida" fill="#ff5722" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
