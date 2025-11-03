// 📦 Importa hooks do React e componentes reutilizáveis da interface
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

// 🔗 Funções que buscam dados de canais e lojas no backend
import { getChannels, getStores } from "../api/dashboardMetaService";

/* ============================================================
📅 FUNÇÃO AUXILIAR: getDefaultRange
===============================================================
Define o intervalo de datas padrão (últimos 30 dias)
para inicializar o filtro.
=========================================================== */
const getDefaultRange = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 30);
  return { from, to };
};

/* ============================================================
🧩 INTERFACES DE TIPAGEM
===============================================================
FilterState — Estrutura do estado completo dos filtros
FilterBarProps — Props do componente (callback onFilterChange)
=========================================================== */
interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined };
  channel: number | "all";
  store: number | "all";
  quickFilter: string;
}

/* ============================================================
🧭 COMPONENTE: FilterBar
===============================================================
Barra de filtros usada no dashboard para selecionar:
- Intervalo de datas (manual ou rápido)
- Canal de venda
- Loja
- Reset dos filtros
=========================================================== */
export function FilterBar({ onFilterChange }: FilterBarProps) {
  // 🗓️ Estado do intervalo de datas
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultRange());

  // 🧩 Filtros ativos
  const [channel, setChannel] = useState<number | "all">("all");
  const [store, setStore] = useState<number | "all">("all");
  const [quickFilter, setQuickFilter] = useState<string>("30");

  // 📋 Dados carregados do backend
  const [channelList, setChannelList] = useState<any[]>([]);
  const [storeList, setStoreList] = useState<any[]>([]);

  /* ============================================================
  🔄 EFEITO: Carrega canais e lojas ao montar o componente
  ============================================================ */
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

  /* ============================================================
  📡 EMISSOR DE MUDANÇAS
  ============================================================
  Sempre que o usuário altera um filtro, essa função dispara
  o callback `onFilterChange` com o estado atualizado.
  ============================================================ */
  const emitChange = (override = {}) => {
    onFilterChange?.({
      dateRange: {
        from: dateRange?.from,
        to: dateRange?.to,
      },
      channel,
      store,
      quickFilter,
      ...override, // 🔁 Sobrescreve o que for alterado
    });
  };

  /* ============================================================
  ⚡ FILTROS RÁPIDOS (últimos 7, 30 ou 90 dias)
  ============================================================ */
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

  /* ============================================================
  ♻️ RESET DE FILTROS
  ============================================================
  Restaura todos os valores para o estado inicial (últimos 30 dias)
  ============================================================ */
  const handleReset = () => {
    const resetRange = getDefaultRange();

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

  /* ============================================================
  🧱 INTERFACE VISUAL
  ============================================================ */
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted border-b border-border">
      {/* ============================================================
      ⚡ FILTROS RÁPIDOS DE PERÍODO
      ============================================================ */}
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

      {/* 📏 Divisor visual */}
      <div className="h-8 w-px bg-foreground/20" />

      {/* ============================================================
      📅 SELETOR DE INTERVALO (CALENDÁRIO)
      ============================================================ */}
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
              if (!range) return;
              setDateRange(range);
              if (!range?.from || !range?.to) return;

              emitChange({
                dateRange: { from: range.from, to: range.to },
              });
            }}
          />
        </PopoverContent>
      </Popover>

      {/* ============================================================
      🏪 SELETOR DE CANAL
      ============================================================ */}
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

      {/* ============================================================
      🏬 SELETOR DE LOJA
      ============================================================ */}
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

      {/* ============================================================
      🔄 BOTÃO RESETAR FILTROS
      ============================================================ */}
      <Button variant="ghost" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Resetar
      </Button>
    </div>
  );
}
