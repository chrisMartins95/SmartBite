import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";

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
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between items-center mb-2",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h‑7 w‑7 bg‑transparent p‑0 opacity‑50 hover:opacity‑100"
        ),
        nav_button_previous: "absolute left‑1",
        nav_button_next: "absolute right‑1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted‑foreground rounded‑md w‑9 font‑normal text‑[0.8rem]",
        row: "flex w‑full mt‑2",
        cell: "h‑9 w‑9 text‑center text‑sm p‑0 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h‑9 w‑9 p‑0 font‑normal"
        ),
        day_selected: "bg‑primary text‑primary‑foreground",
        day_today: "bg‑accent text‑accent‑foreground",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          return props.orientation === "left" ? (
            <ChevronLeft className="h‑4 w‑4" {...props} />
          ) : (
            <ChevronRight className="h‑4 w‑4" {...props} />
          );
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
