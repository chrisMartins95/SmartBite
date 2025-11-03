// 📦 Importa o componente Toaster padrão do react-hot-toast
// (aqui renomeado para `_Toaster` apenas para evitar conflitos de nome)
import { Toaster as _Toaster } from 'react-hot-toast';

/* ============================================================
🔥 COMPONENTE: Toaster (Placeholder)
===============================================================
Este componente é um *placeholder* (componente vazio) criado para
manter compatibilidade com a estrutura padrão do projeto.

💡 Em projetos baseados em ShadCN ou Radix UI, o `Toaster` é usado
para gerenciar as notificações (toasts).  
No entanto, aqui o projeto utiliza um *sistema customizado*, então
esta função retorna `null` apenas como substituto.
=========================================================== */
export function Toaster() {
  return null; // 🚫 Não renderiza nada (placeholder)
}
