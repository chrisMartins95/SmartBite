import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card.tsx';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-4">
        <h3 className="text-lg font-medium">{title}</h3>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
