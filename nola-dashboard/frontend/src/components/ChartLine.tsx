import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Point { day: string; sales_count: number; revenue: number }

export const ChartLine: React.FC<{ data: Point[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tickFormatter={(d) => d ? d.toString().slice(5) : ''} />
        <YAxis />
        <Tooltip formatter={(value: any, name: string) => [value, name === 'sales_count' ? 'Vendas' : 'Receita']} />
        <Line type="monotone" dataKey="sales_count" stroke="#1976d2" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
