/* ============================================================
🚀 PONTO DE ENTRADA PRINCIPAL DO FRONTEND (index.tsx)
===============================================================
Responsável por:
✅ Inicializar o React
✅ Renderizar o componente <App />
✅ Aplicar o modo estrito (StrictMode)
✅ Carregar os estilos globais (index.css)
=========================================================== */

import { StrictMode } from 'react';                 // 🧠 Ajuda a identificar problemas e boas práticas no React
import { createRoot } from 'react-dom/client';      // 🏗️ Nova API do React 18 para renderização
import App from './App';                            // 🧩 Importa o componente principal da aplicação
import './index.css';                               // 🎨 Importa o CSS global com tema e Tailwind

// 🪄 Cria a raiz e renderiza a aplicação dentro do elemento <div id="root">
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 💡 O StrictMode verifica possíveis problemas no código em tempo de desenvolvimento */}
    <App />
  </StrictMode>
);
