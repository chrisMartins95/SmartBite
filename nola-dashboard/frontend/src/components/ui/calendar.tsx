// 📦 Ícones usados para navegação entre meses
import { ChevronLeft, ChevronRight } from "lucide-react";

// 📅 Componente base de calendário
import { DayPicker } from "react-day-picker";

// 🧩 Tipagem do DayPicker
import type { DayPickerProps } from "react-day-picker";

// 🌍 Importa o locale em português (pt-BR) para o calendário
import { ptBR } from "date-fns/locale"; // ✅ Adicionado

// 🧱 Função auxiliar para juntar classes CSS dinamicamente
import { cn } from "@/lib/utils";

// 🎨 Importa estilos reutilizáveis do botão (para estilizar os dias)
import { buttonVariants } from "@/components/ui/button";

/* ============================================================
📅 COMPONENTE: Calendar
===============================================================
Componente visual que encapsula o `react-day-picker` com:
- Idioma PT-BR 🇧🇷
- Estilos consistentes com o design system
- Suporte a props personalizadas
=========================================================== */

// 📘 Tipagem do componente baseada no próprio DayPicker
export type CalendarProps = DayPickerProps;

function Calendar({
  className,          // 🎨 Permite adicionar classes personalizadas
  classNames,         // 🎨 Sobrescreve classes internas do DayPicker
  showOutsideDays = true, // 📆 Exibe dias de meses anteriores/posteriores
  ...props            // ⚙️ Permite passar outras props nativas do DayPicker
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR} // 🌍 Define o idioma do calendário como português (Brasil)
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rdp-wrapper", className)} // 🧱 Classes principais do container
      classNames={{
        /* ============================================================
        🎨 CLASSES DE ESTILIZAÇÃO PERSONALIZADAS
        ============================================================ */
        months: "flex flex-col sm:flex-row gap-4", // 📅 Organização dos meses (responsiva)
        month: "space-y-2",                         // 📆 Espaçamento interno do mês
        weekdays: "grid grid-cols-7 text-center",   // 🗓️ Cabeçalho dos dias da semana
        week: "grid grid-cols-7",                   // 📅 Layout dos dias por semana

        // 🎨 Estilo base para cada dia do calendário (usa estilo de botão "ghost")
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal mx-auto"
        ),

        // 📌 Dia selecionado (ativo)
        day_selected: "bg-primary text-primary-foreground",

        // 📍 Dia atual (hoje)
        day_today: "bg-accent text-accent-foreground",

        // 🔧 Permite sobrescrever estilos vindos via props
        ...classNames,
      }}
      components={{
        /* ============================================================
        ⏪⏩ COMPONENTES CUSTOMIZADOS DE NAVEGAÇÃO
        ============================================================ */
        Chevron: (props) =>
          props.orientation === "left" ? (
            // ⬅️ Ícone de voltar mês
            <ChevronLeft className="h-4 w-4" {...props} />
          ) : (
            // ➡️ Ícone de avançar mês
            <ChevronRight className="h-4 w-4" {...props} />
          ),
      }}
      {...props} // 🔄 Repassa todas as demais props ao DayPicker
    />
  );
}

// 🏷️ Nome de exibição no DevTools
Calendar.displayName = "Calendar";

// 🧾 Exporta o componente
export { Calendar };
