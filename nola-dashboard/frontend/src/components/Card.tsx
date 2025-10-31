import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  variant?: "default" | "large";
}

export const Card: React.FC<CardProps> = ({
  title,
  value,
  variant = "default",
}) => {
  // 🎨 Definindo estilos base + variação grande
  const baseStyle =
    "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]";
  const largeText =
    "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100";
  const defaultText =
    "text-xl font-semibold text-gray-900 dark:text-gray-100";

  return (
    <div className={`${baseStyle} ${variant === "large" ? "min-h-[150px]" : "min-h-[120px]"}`}>
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">
          {title}
        </span>
        <span className={variant === "large" ? largeText : defaultText}>
          {value}
        </span>
      </div>
    </div>
  );
};
