import { useState } from "react";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import type { DateRange } from "react-day-picker";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined };
  channel: string;
  store: string;
  quickFilter: string;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [channel, setChannel] = useState<string>("all");
  const [store, setStore] = useState<string>("all");
  const [quickFilter, setQuickFilter] = useState<string>("30");

  const handleQuickFilter = (days: string) => {
    setQuickFilter(days);

    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - parseInt(days));

    const nextRange: DateRange = { from, to };
    setDateRange(nextRange);

    onFilterChange?.({
      dateRange: { from: nextRange.from, to: nextRange.to },
      channel,
      store,
      quickFilter: days,
    });
  };

  const handleReset = () => {
    setDateRange(undefined);
    setChannel("all");
    setStore("all");
    setQuickFilter("30");

    onFilterChange?.({
      dateRange: { from: undefined, to: undefined },
      channel: "all",
      store: "all",
      quickFilter: "30",
    });
  };

  return (
    <div
      className="
        flex flex-wrap items-center gap-4 p-4
        bg-muted
        border-b border-border
        shadow-none rounded-none
      "
      data-testid="top-bar"
    >
      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilter === "7" ? "default" : "outline"}
          size="sm"
          className={cn(
            "text-sm font-medium",
            quickFilter !== "7" && "border-[hsl(var(--muted-foreground))]"
          )}
          onClick={() => handleQuickFilter("7")}
        >
          Últimos 7 Dias
        </Button>

        <Button
          variant={quickFilter === "30" ? "default" : "outline"}
          size="sm"
          className={cn(
            "text-sm font-medium",
            quickFilter !== "30" && "border-[hsl(var(--muted-foreground))]"
          )}
          onClick={() => handleQuickFilter("30")}
        >
          Últimos 30 Dias
        </Button>

        <Button
          variant={quickFilter === "90" ? "default" : "outline"}
          size="sm"
          className={cn(
            "text-sm font-medium",
            quickFilter !== "90" && "border-[hsl(var(--muted-foreground))]"
          )}
          onClick={() => handleQuickFilter("90")}
        >
          Últimos 90 Dias
        </Button>
      </div>

      {/* Divisor vertical mais visível */}
      <div className="h-8 w-px bg-foreground/20"></div>

      {/* Calendário */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal text-sm border-[hsl(var(--muted-foreground))]",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                  {format(dateRange.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Selecionar intervalo</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          {/* ✅ WRAPPER PARA ISOLAR O CALENDÁRIO */}
          <div className="rdp-wrapper">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range);
                onFilterChange?.({
                  dateRange: { from: range?.from, to: range?.to },
                  channel,
                  store,
                  quickFilter,
                });
              }}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Select Canal */}
      <Select
        value={channel}
        onValueChange={(value) => {
          setChannel(value);
          onFilterChange?.({
            dateRange: { from: dateRange?.from, to: dateRange?.to },
            channel: value,
            store,
            quickFilter,
          });
        }}
      >
        <SelectTrigger className="w-36 sm:w-40 text-sm border-[hsl(var(--muted-foreground))]">
          <SelectValue placeholder="Canal" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos os Canais</SelectItem>
          <SelectItem value="presencial">Presencial</SelectItem>
          <SelectItem value="ifood">iFood</SelectItem>
          <SelectItem value="rappi">Rappi</SelectItem>
          <SelectItem value="app">App Próprio</SelectItem>
        </SelectContent>
      </Select>

      {/* Select Loja */}
      <Select
        value={store}
        onValueChange={(value) => {
          setStore(value);
          onFilterChange?.({
            dateRange: { from: dateRange?.from, to: dateRange?.to },
            channel,
            store: value,
            quickFilter,
          });
        }}
      >
        <SelectTrigger className="w-36 sm:w-40 text-sm border-[hsl(var(--muted-foreground))]">
          <SelectValue placeholder="Loja" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas as Lojas</SelectItem>
          <SelectItem value="store-1">Loja 01</SelectItem>
          <SelectItem value="store-2">Loja 02</SelectItem>
          <SelectItem value="store-3">Loja 03</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        className="text-sm font-medium"
        onClick={handleReset}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Resetar
      </Button>
    </div>
  );
}
