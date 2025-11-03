// 📦 Importa React (necessário para criar componentes funcionais)
import React from 'react';

/* ============================================================
🔔 TOAST SYSTEM — COMPONENTES BÁSICOS DE NOTIFICAÇÃO
===============================================================
Este conjunto de componentes representa uma estrutura mínima 
para sistema de *toasts* (mensagens temporárias de alerta ou feedback).

💡 Mesmo sendo placeholders simples, seguem a estrutura base usada
por bibliotecas como Radix UI ou ShadCN para manter compatibilidade.
=========================================================== */

/* ============================================================
📦 ToastProvider — Provedor global de toasts
===============================================================
Serve como contexto ou container para todos os toasts da aplicação.
Aqui está simplificado apenas para renderizar os filhos.
=========================================================== */
export const ToastProvider: React.FC<any> = ({ children }) => <>{children}</>;

/* ============================================================
🧱 ToastViewport — Área onde os toasts são exibidos
===============================================================
Geralmente posicionada no canto da tela (ex: bottom-right).
Aqui está simplificada para renderizar uma <div> padrão.
=========================================================== */
export const ToastViewport: React.FC<any> = (props) => <div {...props} />;

/* ============================================================
💬 Toast — Componente principal do toast
===============================================================
Contém o conteúdo da notificação (título, descrição, botões, etc.)
=========================================================== */
export const Toast: React.FC<any> = ({ children }) => <div>{children}</div>;

/* ============================================================
❌ ToastClose — Botão ou ação para fechar o toast
===============================================================
Aqui está simplificado e não renderiza nada.
Em uma implementação real, ele chamaria uma função de fechamento.
=========================================================== */
export const ToastClose: React.FC<any> = () => null;

/* ============================================================
🏷️ ToastTitle — Título da notificação
===============================================================
Usado para exibir o texto principal em destaque.
=========================================================== */
export const ToastTitle: React.FC<any> = ({ children }) => (
  <div className="font-semibold">{children}</div>
);

/* ============================================================
📝 ToastDescription — Texto auxiliar da notificação
===============================================================
Exibe a descrição complementar ou detalhes da mensagem.
=========================================================== */
export const ToastDescription: React.FC<any> = ({ children }) => <div>{children}</div>;

/* ============================================================
📤 Exportação padrão
===============================================================
Permite importar diretamente o componente principal:
➡️ import Toast from "./Toast"
=========================================================== */
export default Toast;
