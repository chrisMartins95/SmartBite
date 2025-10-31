//import React from 'react';

export function FilterBar({ onFilterChange }: { onFilterChange?: (f: any) => void }) {
  return (
    <div className="p-4 flex gap-3 items-center">
      <button className="px-3 py-2 rounded-md bg-card border">Últimos 30 dias ▾</button>
      <select className="px-3 py-2 rounded-md bg-card border">
        <option>Todas as lojas</option>
      </select>
      <label className="ml-auto flex items-center gap-2 text-sm"><input type="checkbox" /> Comparar períodos</label>
    </div>
  );
}
