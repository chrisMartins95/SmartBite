import express from 'express';
import cors from 'cors';

// Rotas principais
import { router as salesRoutes } from './routes/salesRoutes';
import { router as dashboardRoutes } from './routes/dashboardRoutes';
import { router as metaRoutes } from './routes/metaRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Rotas da API
app.use('/api', salesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/meta', metaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
