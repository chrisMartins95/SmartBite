// 📦 Importa React e os ícones de tema
import React from 'react';
import { Moon, Sun } from 'lucide-react';

// 🎨 Importa o hook personalizado que gerencia o tema global
import { useTheme } from './theme-provider';

/* ============================================================
🌗 COMPONENTE: ThemeToggle
===============================================================
Componente responsável por alternar o tema da aplicação entre 
"light" ☀️ e "dark" 🌙.

💡 Usa o contexto global de tema fornecido pelo `ThemeProvider`.
=========================================================== */
export function ThemeToggle() {
  // 🎛️ Obtém o tema atual e a função para atualizá-lo
  const { theme, setTheme } = useTheme();

  return (
    /* ============================================================
    🖱️ Botão de alternância de tema
    ============================================================
    - Alterna entre "light" e "dark" ao clicar
    - Exibe ícone correspondente (☀️ ou 🌙)
    ============================================================ */
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md" // 💅 Estilo básico do botão
    >
      {/* 🌙 Mostra o ícone oposto ao tema atual */}
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" /> // ☀️ Modo claro
      ) : (
        <Moon className="w-5 h-5" /> // 🌙 Modo escuro
      )}
    </button>
  );
}
