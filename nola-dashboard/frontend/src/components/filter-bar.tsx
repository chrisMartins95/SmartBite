import { useEffect, useState } from "react";
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

import { getChannels, getStores } from "../api/dashboardMetaService";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined };
  channel: number | "all";
  store: number | "all";
  quickFilter: string;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const [channel, setChannel] = useState<number | "all">("all");
  const [store, setStore] = useState<number | "all">("all");
  const [quickFilter, setQuickFilter] = useState<string>("30");

  const [channelList, setChannelList] = useState<any[]>([]);
  const [storeList, setStoreList] = useState<any[]>([]);

  useEffect(() => {
    async function loadMeta() {
      const [channels, stores] = await Promise.all([
        getChannels(),
        getStores(),
      ]);

      setChannelList(channels);
      setStoreList(stores);
    }
    loadMeta();
  }, []);

  const emitChange = (override = {}) => {
    onFilterChange?.({
      dateRange: {
        from: dateRange?.from,
        to: dateRange?.to,
      },
      channel,
      store,
      quickFilter,
      ...override,
    });
  };

  const handleQuickFilter = (days: string) => {
    setQuickFilter(days);

    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - parseInt(days));

    const nextRange: DateRange = { from, to };
    setDateRange(nextRange);

    emitChange({
      dateRange: nextRange,
      quickFilter: days,
    });
  };

  const handleReset = () => {
    const resetRange = { from: new Date(), to: new Date() };

    setDateRange(resetRange);
    setChannel("all");
    setStore("all");
    setQuickFilter("30");

    emitChange({
      dateRange: resetRange,
      channel: "all",
      store: "all",
      quickFilter: "30",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted border-b border-border">

      {/* ✅ Filtros rápidos */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilter === "7" ? "default" : "outline"}
          size="sm"
          onClick={() => handleQuickFilter("7")}
        >
          Últimos 7 dias
        </Button>

        <Button
          variant={quickFilter === "30" ? "default" : "outline"}
          size="sm"
          onClick={() => handleQuickFilter("30")}
        >
          Últimos 30 dias
        </Button>

        <Button
          variant={quickFilter === "90" ? "default" : "outline"}
          size="sm"
          onClick={() => handleQuickFilter("90")}
        >
          Últimos 90 dias
        </Button>
      </div>

      <div className="h-8 w-px bg-foreground/20" />

      {/* ✅ Botão do calendário arrumado */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-52 justify-start text-left font-normal text-sm flex items-center gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                  dateRange.to,
                  "dd/MM/yyyy"
                )}`
              : "Selecionar intervalo"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={dateRange}
            numberOfMonths={2}
            onSelect={(range) => {
              setDateRange(range);
              if (!range?.from || !range?.to) return;

              emitChange({
                dateRange: { from: range.from, to: range.to },
              });
            }}
          />
        </PopoverContent>
      </Popover>

      {/* ✅ CANAL — AGORA NÃO QUEBRA E NÃO ESTICA */}
      <div className="flex items-center gap-2 shrink-0">
        <Select
          value={channel === "all" ? "all" : String(channel)}
          onValueChange={(value) => {
            const v = value === "all" ? "all" : Number(value);
            setChannel(v);
            emitChange({ channel: v });
          }}
        >
          <SelectTrigger className="w-40 shrink-0">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            {channelList.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ✅ LOJA — TAMBÉM FIXADO */}
      <div className="flex items-center gap-2 shrink-0">
        <Select
          value={store === "all" ? "all" : String(store)}
          onValueChange={(value) => {
            const v = value === "all" ? "all" : Number(value);
            setStore(v);
            emitChange({ store: v });
          }}
        >
          <SelectTrigger className="w-40 shrink-0">
            <SelectValue placeholder="Loja" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Todas as lojas</SelectItem>
            {storeList.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Resetar
      </Button>
    </div>
  );
}
