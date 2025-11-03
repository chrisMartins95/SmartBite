import express from 'express';
import cors from 'cors';

import { router as salesRoutes } from './routes/salesRoutes';
import { router as dashboardRoutes } from './routes/dashboardRoutes';
import { router as exploreRoutes } from './routes/exploreRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', salesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/explore', exploreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
