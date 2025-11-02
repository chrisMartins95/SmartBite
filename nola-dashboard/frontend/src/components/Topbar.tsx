import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface Props {
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<Props> = ({ onToggleSidebar }) => {
  return (
    <header className="w-full bg-card text-foreground border-b border-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Botão Sidebar */}
        <button
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground hover:bg-accent transition"
          aria-label="Alternar menu lateral"
        >
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
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </button>

        {/* Título Dashboard */}
        <h1 className="text-xl font-semibold">Dashboard</h1>

        {/* Botão Tema */}
        <ThemeToggle />

      </div>
    </header>
  );
};
