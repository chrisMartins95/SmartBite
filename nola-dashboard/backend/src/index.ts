import express from 'express';
import cors from 'cors';
import { router as salesRoutes } from './routes/salesRoutes.js';
import { router as dashboardRoutes } from './routes/dashboardRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', salesRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
