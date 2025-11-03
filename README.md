# 📊 SalesHub — Dashboard Analítico de Vendas

### 🚀 Desafio Técnico — Sistema de Dashboard Interativo
**Autor:** Christian Martins  
**Data da entrega:** Novembro/2025  
**Stack:** React + TypeScript + Vite + Tailwind + Node.js + Express + PostgreSQL  

---

## 🧭 Visão Geral

O **SalesHub** é um **painel analítico interativo** desenvolvido para fornecer **insights de vendas e desempenho de lojas** de forma clara, visual e acessível.

A solução foi pensada para **usuários não técnicos**, permitindo que gestores explorem dados livremente — visualizando métricas-chave, gráficos, top produtos e transações recentes, tudo com **filtros de período, canal e loja**.

---

## 🎯 Objetivos da Solução

| Meta | Como foi atendida |
|------|--------------------|
| **Resolver o problema do usuário** | Interface simples e responsiva, que centraliza KPIs e tendências de vendas. |
| **Gerar insights, não apenas dados** | Gráficos e comparativos automáticos por período, canal e loja. |
| **UX intuitiva** | Filtros rápidos (7, 30, 90 dias), calendário, seletor de canais/lojas, reset prático. |
| **Design agradável e acessível** | Tema claro/escuro, fontes modernas, responsivo e mobile-friendly. |

---

## ⚙️ Arquitetura Técnica

A solução é separada em **frontend (React)** e **backend (Node + Express)**, comunicando-se via REST API.

### Estrutura resumida:
📦 saleshub
├── frontend/
│ ├── src/
│ │ ├── api/ # Serviços Axios → backend
│ │ ├── components/ # UI modular (cards, filtros, sidebar, etc.)
│ │ ├── pages/ # Dashboard principal
│ │ ├── lib/ # utilitários (cn, queryClient, etc.)
│ │ └── App.tsx # Roteamento principal
│ └── index.css # Estilos e variáveis de tema
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # Lógica de cada rota
│ │ ├── routes/ # Endpoints REST
│ │ ├── db/ # Conexão com PostgreSQL
│ │ └── server.ts # Configuração principal
│
└── package.json

yaml
Copiar código

---

## 🧠 Principais Funcionalidades

✅ **Filtros dinâmicos** — por data, loja e canal  
✅ **Cards de KPIs** — faturamento, pedidos, ticket médio, lojas ativas  
✅ **Gráfico de tendência (Linha)** — receita e pedidos por mês (meses em PT-BR)  
✅ **Gráfico de pizza** — vendas por canal  
✅ **Gráfico de barras** — top 5 produtos  
✅ **Tabela de transações** — últimos pedidos e valores  
✅ **Tema escuro e claro** — alternável pelo botão no topo  
✅ **Responsividade total** — layout fluido em desktop e mobile  

---

## 🧩 Tecnologias Utilizadas

### Frontend
- **React + TypeScript + Vite**
- **Tailwind CSS** (com variáveis CSS para tema)
- **React Query (TanStack)** — cache e requisições
- **Recharts** — gráficos dinâmicos
- **Lucide Icons** — ícones SVG modernos
- **Wouter** — roteamento leve e rápido

### Backend
- **Node.js + Express**
- **PostgreSQL + pg**
- **dotenv** — gerenciamento de variáveis de ambiente

---

## 🧱 Decisões de Engenharia

| Decisão | Justificativa |
|----------|----------------|
| **REST API simples (sem GraphQL)** | Menos complexidade para um desafio de dados agregados. |
| **React Query** | Cache automático, revalidação e controle de estado de fetch. |
| **Tailwind + CSS Variables** | Flexibilidade para tema claro/escuro e responsividade. |
| **Recharts** | Sintaxe simples e rápida para gráficos reativos. |
| **Arquitetura modular** | Facilita testes, manutenção e extensões futuras. |

---

## 🚀 Como Rodar Localmente

### 🖥️ 1. Clonar o projeto
```bash
git clone https://github.com/seuusuario/saleshub.git
cd saleshub
🧩 2. Rodar o backend
bash
Copiar código
cd backend
npm install
npm run dev
O backend roda por padrão em: http://localhost:5000/api

💻 3. Rodar o frontend
bash
Copiar código
cd frontend
npm install
npm run dev
O frontend roda em: http://localhost:5173

🔗 Principais Endpoints (Backend)
Endpoint	Descrição
/api/dashboard/metrics	KPIs agregados (faturamento, pedidos, ticket médio, lojas)
/api/dashboard/revenue-trend	Receita e pedidos agrupados por mês
/api/dashboard/sales-by-channel	Vendas por canal
/api/dashboard/top-products	Top 5 produtos vendidos
/api/dashboard/recent-transactions	Últimas transações registradas
/api/meta/channels	Lista de canais
/api/meta/stores	Lista de lojas

📈 Performance e Escalabilidade
Consultas SQL otimizadas com GROUP BY e índices sugeridos (created_at, store_id, channel_id).

Paginação nas consultas grandes (transações).

Estrutura pronta para cache (Redis) e materialized views.

Frontend leve (React + Vite) e responsivo.

🎨 UX / UI
Interface moderna e limpa, focada em legibilidade.

Tipografia Inter (Google Fonts).

Tema escuro como padrão (mas alternável).

Layout responsivo (mobile, tablet e desktop).

Foco em acessibilidade: contraste e botões com aria-label.

🧪 Testes (sugeridos)
Unitários: funções utilitárias (currencyHuman, numberHuman, buildDashboardFilters).

Integração: endpoints com Jest + Supertest.

E2E (opcional): Cypress — fluxo de uso completo no dashboard.

📽️ Roteiro do Vídeo de Apresentação
Introdução (10s): Nome, objetivo da solução.

Demonstração (1–2min):

Mostrar filtros e atualização de métricas.

Exibir gráficos e tabela de transações.

Explicação técnica (1min): Arquitetura, decisões, escalabilidade.

Encerramento (20s): O que foi aprendido e próximos passos.

💡 Próximos Passos / Extensões
Exportar relatórios (CSV/PDF).

Insights automáticos (alertas de variação acima de X%).

Integração com APIs externas (e-commerce, ERP).

Deploy no Render/Vercel com banco PostgreSQL na Railway.

🧾 Licença
Este projeto foi desenvolvido exclusivamente para o desafio técnico de estágio, com foco educacional e de demonstração.

💬 Contato
📧 Christian Martins
🔗 LinkedIn (adicione seu link aqui)
💻 Projeto criado com foco em clareza, escalabilidade e experiência do usuário.

markdown
Copiar código
