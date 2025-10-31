import React from 'react';

interface Props {
  stores: { id: number; name: string }[];
  onChange?: (filters: any) => void;
  onToggleSidebar?: () => void; // função para toggle da sidebar
}

export const Topbar: React.FC<Props> = ({ stores, onToggleSidebar }) => {
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* 📌 Botão hamburger sempre visível */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 transition"
              aria-label="Alternar menu lateral"
            >
              ☰
            </button>
          )}
          <span className="text-lg font-semibold text-gray-200">
            Dashboard
          </span>
        </div>

        {/* ⏰ Filtros de período e loja */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 shadow-inner hover:bg-gray-700 transition">
            📅 Últimos 30 dias ▾
          </button>
          
          <select className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 transition">
            <option value="">Todas as lojas</option>
            {stores.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* ⚙️ Configurações e comparativo */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-500 rounded border-gray-700"
            />
            Comparar períodos
          </label>

          <button className="px-2 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition">
            ⚙️
          </button>
        </div>

      </div>
    </header>
  );
};
