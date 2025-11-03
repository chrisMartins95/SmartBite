// 📦 Importa React (necessário para componentes funcionais)
import React from 'react';

/* ============================================================
💬 TOOLTIP SYSTEM — ESTRUTURA BÁSICA
===============================================================
Esses componentes representam uma implementação simplificada
de um sistema de *tooltips* (dicas visuais flutuantes).

💡 Em projetos reais, o Tooltip costuma ser controlado por 
bibliotecas como Radix UI, mas aqui eles servem como placeholders
para manter compatibilidade e estrutura consistente.
=========================================================== */

/* ============================================================
🧩 TooltipProvider — Provedor global
===============================================================
Componente responsável por envolver a aplicação e permitir que 
os tooltips funcionem corretamente.

➡️ Aqui ele apenas renderiza os filhos, pois não há lógica real.
=========================================================== */
export const TooltipProvider: React.FC<any> = ({ children }) => <>{children}</>;

/* ============================================================
💭 Tooltip — Container da dica visual
===============================================================
Componente responsável por exibir o conteúdo de dica (tooltip)
ao passar o mouse ou focar em um elemento.

➡️ Nesta versão simplificada, ele apenas renderiza o conteúdo
dentro de uma tag <span>.
=========================================================== */
export const Tooltip: React.FC<any> = ({ children }) => <span>{children}</span>;

/* ============================================================
📤 Exportação padrão
===============================================================
Exporta o provedor como default para manter o padrão de importação:
➡️ import TooltipProvider from "./Tooltip"
=========================================================== */
export default TooltipProvider;
