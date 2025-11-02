import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";
import { ptBR } from "date-fns/locale";   // ✅ ADICIONADO

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}     // ✅ CALENDÁRIO EM PORTUGUÊS
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rdp-wrapper", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-2",
        weekdays: "grid grid-cols-7 text-center",
        week: "grid grid-cols-7",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal mx-auto"
        ),
        day_selected: "bg-primary text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        ...classNames,
      }}
      components={{
        Chevron: (props) =>
          props.orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...props} />
          ) : (
            <ChevronRight className="h-4 w-4" {...props} />
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
