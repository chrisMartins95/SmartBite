// 📦 Importa React (necessário para criar componentes funcionais)
import React from 'react';

/* ============================================================
🧭 COMPONENTE PRINCIPAL: Sidebar
===============================================================
Componente container lateral que serve como barra de navegação
ou painel de controle. Pode conter menus, filtros ou atalhos.
=========================================================== */
export const Sidebar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,   // 🧱 Conteúdo interno da sidebar (menu, logo, etc.)
  className,  // 🎨 Classes adicionais (opcional)
}) => (
  <aside
    className={"w-64 bg-sidebar p-3 " + (className || '')} // 📏 Largura fixa + espaçamento e cor
  >
    {children}
  </aside>
);

/* ============================================================
📌 COMPONENTE: SidebarHeader
===============================================================
Seção superior da sidebar (geralmente usada para logotipo,
título do painel ou botão de colapso).
=========================================================== */
export const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"sidebar-header " + (className || '')} // 🎨 Classe padrão + customização opcional
    {...props}
  >
    {children}
  </div>
);

/* ============================================================
🧾 COMPONENTE: SidebarContent
===============================================================
Área principal da sidebar, onde ficam os itens de menu, 
links de navegação ou filtros dinâmicos.
=========================================================== */
export const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"sidebar-content p-2 " + (className || '')} // 🧱 Padding padrão para espaçamento interno
    {...props}
  >
    {children}
  </div>
);

/* ============================================================
📎 COMPONENTE: SidebarFooter
===============================================================
Seção inferior da sidebar (usada para informações secundárias,
como nome do usuário, versão, logout, etc.)
=========================================================== */
export const SidebarFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"sidebar-footer mt-4 text-sm " + (className || '')} // 🪶 Margem superior + texto menor
    {...props}
  >
    {children}
  </div>
);
