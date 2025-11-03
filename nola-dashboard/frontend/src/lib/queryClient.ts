// 📦 Importa o gerenciador principal de cache e requisições do React Query
import { QueryClient } from '@tanstack/react-query';

/* ============================================================
🔁 INSTÂNCIA GLOBAL: queryClient
===============================================================
O `QueryClient` é o núcleo do React Query — ele controla:

- ⚡ Cache de requisições (evita refetchs desnecessários)
- 🔄 Revalidação automática de dados
- 🚨 Tratamento de erros e estados de carregamento
- 🧩 Compartilhamento de dados entre componentes

💡 Esta instância é importada pelo `QueryClientProvider` 
no ponto principal da aplicação (geralmente em `main.tsx` ou `App.tsx`).
=========================================================== */
export const queryClient = new QueryClient();
