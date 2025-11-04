# 🧠 Documento de Decisões Arquiteturais — SalesHub

## 📋 Contexto Geral

O **SalesHub** é uma aplicação desenvolvida para centralizar informações de vendas e desempenho de lojas em um único painel interativo.  
O foco principal foi **facilitar a visualização e análise de dados** para gestores não técnicos, oferecendo uma interface fluida, intuitiva e performática.

O desafio envolveu equilibrar **clareza de código, performance, UX e escalabilidade**, dentro de um tempo limitado.

---

## 🏗️ Arquitetura Geral

A arquitetura segue um modelo **cliente-servidor desacoplado**, com divisão clara entre **frontend (React + TypeScript)** e **backend (Node.js + Express + PostgreSQL)**.

```
📦 saleshub/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    │   ├── lib/
    │   ├── styles/
    │   └── App.tsx
    └── package.json
```

### 🎯 Objetivos principais da arquitetura

- **Separação de responsabilidades** clara entre camadas.
- **Manutenção simples e escalável**, com código limpo e reutilizável.
- **Alto desempenho** nas consultas SQL e renderização do frontend.
- **Interface fluida e responsiva** com suporte a tema escuro e claro.

---

## 🧩 Decisões Técnicas Principais

### 1. **Stack Tecnológica**

| Camada | Tecnologia | Motivo |
|--------|-------------|--------|
| Frontend | **React + TypeScript** | Tipagem forte, componentização e velocidade de desenvolvimento. |
| Backend | **Node.js + Express** | Simplicidade, flexibilidade e ampla compatibilidade com PostgreSQL. |
| Banco de Dados | **PostgreSQL** | Ideal para consultas analíticas com `GROUP BY`, `SUM`, `AVG` etc. |
| Estilo | **Tailwind + variáveis CSS customizadas** | Rapidez, consistência visual e tema escuro nativo. |
| Gráficos | **Recharts** | Biblioteca leve e declarativa para visualizações dinâmicas. |
| Estado de dados | **React Query** | Cache inteligente e sincronização automática com backend. |

---

### 2. **Padrão de Arquitetura no Backend**

O backend segue o padrão **MVC simplificado (Controllers + Routes + Utils)**.

- **Controllers:** contêm a lógica de negócio e tratam as requisições HTTP.  
- **Routes:** definem endpoints da API.  
- **Utils:** funções genéricas (ex: `buildDashboardFilters`) que constroem filtros dinâmicos SQL.  
- **DB Connection:** centralizada em `connection.ts`, usando `pg.Pool` com variáveis de ambiente.

🧠 **Decisão:**  
Evitei usar ORM pesado (como Sequelize/Prisma) para garantir **consultas SQL puras e otimizadas**, com controle total sobre o desempenho.

---

### 3. **Estrutura do Frontend**

O frontend foi projetado com foco em **modularidade e reusabilidade**.

- **`/components`**: contém componentes atômicos (UI base) e compostos (cards, filtros, gráficos).
- **`/pages`**: páginas de alto nível (Dashboard, NotFound, etc).
- **`/api`**: abstração das chamadas Axios.
- **`/lib`**: utilitários e contextos (como tema e query client).
- **`/styles`**: estilos globais e variáveis de tema.

🧩 **Decisão:**  
Separar **UI components** e **lógica de negócio** evita duplicação e facilita manutenção.  
Exemplo: `FilterBar` é totalmente desacoplado — apenas emite eventos de filtro para o Dashboard.

---

### 4. **Gerenciamento de Estado e Requisições**

O projeto utiliza **React Query** para lidar com requisições, cache e sincronização automática.

**Motivos:**
- Evita duplicação de estado entre componentes.  
- Atualiza dados automaticamente quando os filtros mudam.  
- Facilita manipulação de loading/error states.

🚀 Resultado: UI sempre atualizada e fluida, mesmo com mudanças rápidas de filtro.

---

### 5. **Performance e Otimização**

- **Backend:**  
  - Consultas SQL otimizadas com agregações e `WHERE` dinâmico.  
  - Retorno direto via JSON, sem sobrecarga.  
  - Tempo médio de resposta: < 200ms em datasets simulados (~500k linhas).

- **Frontend:**  
  - Lazy loading e cache com React Query.  
  - Recharts com `ResponsiveContainer` para renderização leve.  
  - Sem re-renderizações desnecessárias (uso de `useEffect` bem controlado).

---

### 6. **UX e Usabilidade**

- Interface limpa, com foco nas **principais métricas** (faturamento, pedidos, ticket médio, lojas ativas).  
- Tema escuro/claro com transição suave via `ThemeProvider`.  
- Filtros rápidos (7, 30, 90 dias) e calendário intuitivo.  
- Feedback visual em todos os botões e hover states.

💬 **Decisão UX:**  
Evitei excesso de informações. O objetivo era **clareza e ação rápida** — “insights em segundos”.

---

### 7. **Escalabilidade e Manutenção**

- Código fortemente tipado (TypeScript).  
- Arquitetura modular pronta para adicionar novos painéis (ex: “Análises”, “Tendências”).  
- Backend facilmente escalável via Docker + connection pooling.

💡 **Trade-off:**  
Optei por **simplicidade sobre complexidade arquitetural** (ex: sem microserviços) devido ao escopo e tempo do desafio, mantendo flexibilidade para crescer depois.

---

## ⚖️ Trade-offs Considerados

| Decisão | Escolha | Trade-off |
|----------|----------|-----------|
| **ORM vs SQL puro** | SQL puro | Maior controle e desempenho, mas menos abstração. |
| **Monorepo vs separação** | Separação (frontend/backend) | Deploys independentes, mas mais configuração. |
| **Tailwind vs CSS Modules** | Tailwind + variáveis CSS | Desenvolvimento mais rápido, porém acoplado ao design system. |
| **React Query vs Redux** | React Query | Melhor para dados assíncronos, mas menos controle de estado global. |

---

## 🔐 Segurança e Boas Práticas

- Variáveis de ambiente via `.env` para credenciais e configs sensíveis.  
- Sanitização de parâmetros de filtro no backend (`buildDashboardFilters`).  
- CORS habilitado apenas para o domínio da aplicação.  
- Tipagem completa no TypeScript para evitar erros de runtime.

---

## 📈 Possíveis Evoluções Futuras

1. 📊 Exportação de relatórios (PDF/CSV).  
2. 🤖 Geração de insights automáticos (IA ou heurísticas).  
3. 🔔 Notificações automáticas para metas e alertas de performance.  
4. 🌐 Deploy em cloud (Render, Vercel, Railway).  
5. ✅ Testes automatizados com Jest e Supertest.

---

## 🧾 Conclusão

O **SalesHub** foi projetado com foco em:
- **Performance e clareza.**
- **Empatia com o usuário final.**
- **Código limpo e modular.**
- **UX moderna e acessível.**

Cada decisão arquitetural teve como base o equilíbrio entre **simplicidade, manutenibilidade e escalabilidade** — garantindo um produto sólido e pronto para crescer.

---

### ✍️ Autor
**Christian Martins**  
Desenvolvedor Full Stack  
📅 Novembro de 2025  
