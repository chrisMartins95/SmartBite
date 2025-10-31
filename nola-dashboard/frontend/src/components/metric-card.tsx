import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: { value: number; direction: 'up' | 'down' | 'neutral' };
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  return (
    <div className="p-4 rounded-lg bg-card border border-card-border">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}
