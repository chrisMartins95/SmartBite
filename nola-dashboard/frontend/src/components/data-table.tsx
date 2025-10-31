//import React, { useState } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export function DataTable<T>({ data, columns }: { data: T[]; columns: Column<T>[] }) {
  return (
    <table className="w-full bg-card border border-card-border rounded-md overflow-hidden">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={String(c.key)} className="p-3 text-left text-sm text-muted-foreground">{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={i % 2 ? 'bg-background' : ''}>
            {columns.map((c) => (
              <td key={String(c.key)} className="p-3">{c.render ? c.render(row) : (row as any)[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
