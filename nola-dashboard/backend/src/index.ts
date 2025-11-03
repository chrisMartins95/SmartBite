// 📦 Importa o framework Express (para criar o servidor HTTP)
import express from 'express';

// 🔄 Importa o middleware CORS (permite requisições de outros domínios)
import cors from 'cors';

/* ============================================================
🧭 IMPORTAÇÃO DAS ROTAS PRINCIPAIS
===============================================================
Cada conjunto de rotas está separado em um módulo próprio:
- salesRoutes: controla as rotas de vendas e produtos 🏆
- dashboardRoutes: rotas de métricas e gráficos 📊
- metaRoutes: dados auxiliares (lojas e canais) 🏬🌐
=========================================================== */
import { router as salesRoutes } from './routes/salesRoutes';
import { router as dashboardRoutes } from './routes/dashboardRoutes';
import { router as metaRoutes } from './routes/metaRoutes';

/* ============================================================
🚀 CONFIGURAÇÃO DO SERVIDOR EXPRESS
=========================================================== */
const app = express();

// 🔓 Ativa o CORS (permite comunicação com o frontend)
app.use(cors());

// 🧩 Permite o recebimento de JSON no corpo das requisições
app.use(express.json());

/* ============================================================
📡 DEFINIÇÃO DAS ROTAS PRINCIPAIS DA API
=========================================================== */
// 🏆 Rotas relacionadas a vendas e produtos
app.use('/api', salesRoutes);

// 📊 Rotas do dashboard (métricas, gráficos e relatórios)
app.use('/api/dashboard', dashboardRoutes);

// 🏬 Rotas auxiliares (lojas, canais, metadados)
app.use('/api/meta', metaRoutes);

/* ============================================================
⚙️ CONFIGURAÇÃO DA PORTA E INICIALIZAÇÃO DO SERVIDOR
=========================================================== */
const PORT = process.env.PORT || 5000;

// 🟢 Inicia o servidor e exibe mensagem no console
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
