import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Point { day: string; sales_count: number; revenue: number }

export const ChartLine: React.FC<{ data: Point[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground)/0.2)" />
        <XAxis 
          dataKey="day" 
          tickFormatter={(d) => d ? d.toString().slice(5) : ''}
          tick={{ fontWeight: 400, fill: 'hsl(var(--foreground))', fontSize: 12 }}
        />
        <YAxis tick={{ fontWeight: 400, fill: 'hsl(var(--foreground))', fontSize: 12 }} />
        <Tooltip 
          formatter={(value: any, name: string) => [value, name === 'sales_count' ? 'Vendas' : 'Receita']}
          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--card-border))', color: 'hsl(var(--foreground))' }}
        />
        <Line type="monotone" dataKey="sales_count" stroke="hsl(var(--accent))" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
