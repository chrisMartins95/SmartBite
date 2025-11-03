// 📦 Importa componentes e ícones usados no card
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { TrendingUp, TrendingDown, Minus, DollarSign } from "lucide-react";
import { cn } from "../lib/utils";

/* ============================================================
📊 INTERFACE: MetricCardProps
===============================================================
Define as propriedades aceitas pelo componente:
- title: título da métrica
- value: valor exibido (string ou número)
- trend: objeto com percentual e direção da tendência (↑ ↓ =)
- icon: ícone opcional à direita do título
- className: classes CSS adicionais para customização
=========================================================== */
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

/* ============================================================
📈 COMPONENTE: MetricCard
===============================================================
Exibe uma métrica com título, valor, ícone e variação percentual.
Ideal para KPIs (indicadores) como receita, pedidos e crescimento.
=========================================================== */
export function MetricCard({
  title,
  value,
  trend,
  icon,
  className,
}: MetricCardProps) {
  /* ============================================================
  🔼 Função auxiliar: ícone da tendência
  ============================================================
  Retorna o ícone correspondente ao sentido da variação (↑ ↓ =)
  ============================================================ */
  const getTrendIcon = () => {
    if (!trend) return null;

    if (trend.direction === "up")
      return <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />;

    if (trend.direction === "down")
      return <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />;

    return <Minus className="h-4 w-4 text-gray-400 dark:text-gray-500" />;
  };

  /* ============================================================
  🎨 Função auxiliar: cor da tendência
  ============================================================
  Retorna a classe de cor conforme a direção (verde, vermelho, cinza)
  ============================================================ */
  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.direction === "up") return "text-green-500 dark:text-green-400";
    if (trend.direction === "down") return "text-red-500 dark:text-red-400";
    return "text-gray-400 dark:text-gray-500";
  };

  /* ============================================================
  🧱 ESTRUTURA VISUAL DO CARD
  ============================================================ */
  return (
    <Card
      className={cn(
        "hover-elevate relative rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
        className // 🎨 Permite personalizar via props
      )}
      data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, "-")}`} // 🧪 Identificador de teste automatizado
      style={{
        borderRadius: "var(--radius)",
        boxShadow: "var(--card-shadow)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        color: "hsl(var(--foreground))",
      }}
    >
      {/* ============================================================
      💰 ÍCONE PRINCIPAL (canto superior direito)
      ============================================================ */}
      <div
        className="absolute top-4 right-4"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {/* Se não houver ícone nas props, mostra o padrão 💵 */}
        {icon || <DollarSign className="h-5 w-5" />}
      </div>

      {/* ============================================================
      🏷️ TÍTULO DA MÉTRICA
      ============================================================ */}
      <CardHeader className="p-6 pb-2">
        <p
          className="text-sm font-medium uppercase tracking-wide"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {title}
        </p>
      </CardHeader>

      {/* ============================================================
      💡 VALOR PRINCIPAL E TENDÊNCIA
      ============================================================ */}
      <CardContent className="p-6 pt-0">
        <div
          className="text-2xl font-bold leading-tight"
          data-testid={`text-metric-value-${title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          style={{
            wordBreak: "keep-all", // Evita quebra de número
            whiteSpace: "nowrap",  // Mantém valor em linha única
          }}
        >
          {value}
        </div>

        {/* ============================================================
        📈 VARIAÇÃO PERCENTUAL (opcional)
        ============================================================ */}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {getTrendIcon()}
            <span
              className={cn("text-xs font-medium", getTrendColor())}
              data-testid="text-trend"
            >
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span
              className="text-xs"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              vs last period {/* 🔁 Comparativo com o período anterior */}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
