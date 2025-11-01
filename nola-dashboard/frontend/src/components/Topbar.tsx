import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw } from "lucide-react";

interface Store {
  id: number;
  name: string;
}

interface Props {
  stores: Store[];
  onChange?: (filters: any) => void;
  onToggleSidebar?: () => void;
}

interface DateRange {
  from?: Date;
  to?: Date;
}

// Componente Button simples funcional
const Button: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
}> = ({ children, variant = "default", size = "md", onClick, className }) => {
  let base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors ";
  let variantClass = "";
  if (variant === "default") variantClass = "bg-accent text-accent-foreground hover:bg-accent-hover";
  else if (variant === "outline") variantClass = "border border-border text-foreground hover:bg-accent hover:text-accent-foreground";
  else if (variant === "ghost") variantClass = "bg-transparent text-foreground hover:bg-accent";

  let sizeClass = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-base";

  return (
    <button onClick={onClick} className={`${base} ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </button>
  );
};

// Topbar funcional
export const Topbar: React.FC<Props> = ({ stores, onToggleSidebar, onChange }) => {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [channel, setChannel] = useState<string>("all");
  const [store, setStore] = useState<string>("all");
  const [quickFilter, setQuickFilter] = useState<string>("30");

  const handleQuickFilter = (days: string) => {
    setQuickFilter(days);
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - parseInt(days));
    setDateRange({ from, to });
    onChange?.({ dateRange: { from, to }, channel, store, quickFilter: days });
  };

  const handleReset = () => {
    setDateRange({});
    setChannel("all");
    setStore("all");
    setQuickFilter("30");
    onChange?.({ dateRange: {}, channel: "all", store: "all", quickFilter: "30" });
  };

  return (
    <header className="w-full bg-card border-b border-border text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Toggle Sidebar */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <Button variant="outline" size="sm" onClick={onToggleSidebar}>
              ☰
            </Button>
          )}
          {/* <span className="text-lg font-semibold">Dashboard</span> */}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={quickFilter === "7" ? "default" : "outline"} size="sm" onClick={() => handleQuickFilter("7")}>
            Últimos 7 dias
          </Button>
          <Button variant={quickFilter === "30" ? "default" : "outline"} size="sm" onClick={() => handleQuickFilter("30")}>
            Últimos 30 dias
          </Button>
          <Button variant={quickFilter === "90" ? "default" : "outline"} size="sm" onClick={() => handleQuickFilter("90")}>
            Últimos 90 dias
          </Button>

          {/* Calendário simples */}
          <div className="relative">
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from
                ? dateRange.to
                  ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                  : format(dateRange.from, "LLL dd, y")
                : "Escolher período"}
            </Button>
          </div>

          {/* Select Canal */}
          <select
            value={channel}
            onChange={(e) => { setChannel(e.target.value); onChange?.({ dateRange, channel: e.target.value, store, quickFilter }); }}
            className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm"
          >
            <option value="all">Todos os Canais</option>
            <option value="presencial">Presencial</option>
            <option value="ifood">iFood</option>
            <option value="rappi">Rappi</option>
            <option value="app">Próprio App</option>
          </select>

          {/* Select Loja */}
          <select
            value={store}
            onChange={(e) => { setStore(e.target.value); onChange?.({ dateRange, channel, store: e.target.value, quickFilter }); }}
            className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm"
          >
            <option value="all">Todas as lojas</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id.toString()}>{s.name}</option>
            ))}
          </select>

          {/* Reset */}
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>
    </header>
  );
};
