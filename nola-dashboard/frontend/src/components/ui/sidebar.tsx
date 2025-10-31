import React from 'react';

export const Sidebar: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, className }) => (
  <aside className={("w-64 bg-sidebar p-3 " + (className || ''))}>{children}</aside>
);

export const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={("sidebar-header " + (className || ''))} {...props}>{children}</div>
);

export const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={("sidebar-content p-2 " + (className || ''))} {...props}>{children}</div>
);

export const SidebarFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={("sidebar-footer mt-4 text-sm " + (className || ''))} {...props}>{children}</div>
);
