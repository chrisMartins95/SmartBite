// 📦 Importa React (necessário para criar componentes funcionais)
import React from 'react';

/* ============================================================
🧩 COMPONENTE: Card
===============================================================
Componente container básico com bordas, fundo e sombra,
usado para agrupar conteúdo de forma organizada.

💡 É a base visual para painéis, caixas de informação,
ou qualquer bloco de conteúdo.
=========================================================== */
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,   // 🧱 Conteúdo interno do card
  className,  // 🎨 Classes adicionais (opcional)
  ...props    // ⚙️ Outras props HTML padrão (ex: onClick, id, etc.)
}) => (
  <div
    // 🎨 Estilos base + classes adicionais se existirem
    className={
      "rounded-xl border bg-card border-card-border text-card-foreground shadow-sm " +
      (className || '')
    }
    {...props} // 🔄 Repasse de outras props
  >
    {children}
  </div>
);

/* ============================================================
📌 COMPONENTE: CardHeader
===============================================================
Área superior do card (geralmente contém título e subtítulo).

💡 Pode ser usada para destacar o nome de uma seção, 
ou informações principais do conteúdo do card.
=========================================================== */
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"flex flex-col space-y-1.5 p-6 " + (className || '')} // 📐 Layout vertical e espaçamento
    {...props}
  >
    {children}
  </div>
);

/* ============================================================
🧾 COMPONENTE: CardContent
===============================================================
Região principal do card onde o conteúdo é exibido
(textos, gráficos, tabelas, inputs, etc.)
=========================================================== */
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={"p-4 " + (className || '')} // 🎨 Espaçamento interno padrão
    {...props}
  >
    {children}
  </div>
);

/* ============================================================
📤 Exportação Padrão
===============================================================
Permite importar o componente principal diretamente:
➡️ import Card from './Card'
=========================================================== */
export default Card;
