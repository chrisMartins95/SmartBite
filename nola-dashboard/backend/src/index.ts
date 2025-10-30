import express from 'express';
import cors from 'cors';
import { router as salesRoutes } from './routes/salesRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
