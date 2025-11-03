// 📦 Importa React e o componente de alternância de tema
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

/* ============================================================
🧱 INTERFACE: Props
===============================================================
Define as propriedades aceitas pelo Topbar:
- onToggleSidebar → função opcional para abrir/fechar a sidebar
=========================================================== */
interface Props {
  onToggleSidebar?: () => void;
}

/* ============================================================
🧭 COMPONENTE: Topbar
===============================================================
Barra superior (header) do dashboard, responsável por:
- Mostrar botão para alternar a sidebar 🧩
- Exibir o título da página 🏷️
- Incluir o botão de alternância de tema 🌗
=========================================================== */
export const Topbar: React.FC<Props> = ({ onToggleSidebar }) => {
  return (
    // 🧱 Container principal da barra superior
    <header className="w-full bg-card text-foreground border-b border-border shadow-sm transition-colors duration-300">
      {/* 🧩 Layout interno com espaçamento e alinhamento responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* ============================================================
        🧩 BOTÃO: Alternar Sidebar (menu lateral)
        ============================================================
        - Exibe um ícone clicável para abrir/fechar a sidebar
        - Responsável pela navegação lateral no layout
        ============================================================ */}
        <button
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground hover:bg-accent transition"
          aria-label="Alternar menu lateral"
        >
          {/* Ícone SVG (menu estilo "painel dividido") */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 🧱 Quadrado principal (representa a janela do app) */}
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            {/* 🧱 Linha vertical (separa as seções do menu) */}
            <path d="M9 3v18"></path>
          </svg>
        </button>

        {/* ============================================================
        🏷️ TÍTULO DO DASHBOARD
        ============================================================ */}
        <h1 className="text-xl font-semibold">Dashboard</h1>

        {/* ============================================================
        🌗 BOTÃO DE TEMA (claro/escuro)
        ============================================================
        - Usa o componente `ThemeToggle`
        - Permite alternar entre os modos visualmente
        ============================================================ */}
        <ThemeToggle />

      </div>
    </header>
  );
};
