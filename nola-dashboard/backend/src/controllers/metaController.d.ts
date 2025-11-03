// 📦 Importando os tipos Request e Response do Express
import type { Request, Response } from 'express';

/* 
=====================================================
🧠 Controlador Meta — Declarações de funções disponíveis
=====================================================
Essas funções são responsáveis por retornar informações 
auxiliares do sistema, como lista de lojas e canais de venda.
*/

// 🏬 Retorna todas as lojas cadastradas (para filtros ou selects)
export declare const getStores: (req: Request, res: Response) => Promise<void>;

// 🌐 Retorna todos os canais de venda disponíveis (ex: online, físico, etc)
export declare const getChannels: (req: Request, res: Response) => Promise<void>;

// 🗺️ Mapa de origem do TypeScript para debugging
//# sourceMappingURL=metaController.d.ts.map
