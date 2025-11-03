// 📦 Importa React para criar o componente funcional
import React from "react";

/* ============================================================
🧩 INTERFACE: CardProps
===============================================================
Define as propriedades aceitas pelo componente:
- title: texto de título do card
- value: valor principal exibido (pode ser string ou número)
- variant: controla o tamanho do card ("default" ou "large")
=========================================================== */
interface CardProps {
  title: string;
  value: string | number;
  variant?: "default" | "large";
}

/* ============================================================
📊 COMPONENTE: Card
===============================================================
Exibe um bloco visual com título e valor — usado em dashboards
para mostrar métricas como receita, pedidos, etc.

💡 Suporta duas variações de tamanho (default e large).
=========================================================== */
export const Card: React.FC<CardProps> = ({
  title,
  value,
  variant = "default", // 🎛️ Valor padrão se não for especificado
}) => {
  /* ============================================================
  🎨 DEFINIÇÃO DE ESTILOS
  ============================================================
  Usa classes do Tailwind (ou equivalente) para manter
  o estilo consistente com o restante do sistema.
  */
  const baseStyle =
    "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]";
  
  const largeText =
    "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"; // 🔠 Tamanho grande
  
  const defaultText =
    "text-xl font-semibold text-gray-900 dark:text-gray-100"; // 🔡 Padrão

  /* ============================================================
  🧱 ESTRUTURA VISUAL DO CARD
  ============================================================ */
  return (
    <div
      className={`${baseStyle} ${
        variant === "large" ? "min-h-[150px]" : "min-h-[120px]"
      }`}
    >
      {/* 🏷️ Cabeçalho do card */}
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
          {title} {/* 📘 Título do card */}
        </span>

        {/* 💰 Valor ou métrica principal */}
        <span className={variant === "large" ? largeText : defaultText}>
          {value}
        </span>
      </div>
    </div>
  );
};
