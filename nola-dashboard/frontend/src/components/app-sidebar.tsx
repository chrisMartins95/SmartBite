import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Store,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "./ui/sidebar.tsx";

const menuItems = [
  { title: "Painel", url: "/", icon: LayoutDashboard },
  { title: "Análises", url: "/analytics", icon: BarChart3 },
  { title: "Produtos", url: "/products", icon: ShoppingBag },
  { title: "Lojas", url: "/stores", icon: Store },
  { title: "Tendências", url: "/trends", icon: TrendingUp },
];

interface Props {
  open: boolean;
  onToggle: () => void;
}

export function AppSidebar({ open, onToggle }: Props) {
  const [location] = useLocation();

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-md border-r border-surface
          bg-surface text-foreground
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Cabeçalho */}
        <SidebarHeader className="p-4 border-b border-surface">
          <h1 className="text-lg font-bold tracking-wide text-primary">
            🍽️ NOLA INSIGHTS
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Melhorando sua vida
          </p>

          {/* Botão de fechar (mobile) */}
          <button
            onClick={onToggle}
            className="lg:hidden self-end mt-2 p-2 rounded-lg hover:bg-elevate-1 dark:hover:bg-elevate-2 transition"
            aria-label="Fechar menu"
          >
            ✖
          </button>
        </SidebarHeader>

        {/* Navegação */}
        <SidebarContent className="flex-1 overflow-y-auto p-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide px-2 mb-2">
            Navegação
          </div>

          {menuItems.map((m) => {
            const active = location === m.url;
            return (
              <Link
                key={m.url}
                href={m.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-elevate-1 dark:hover:bg-elevate-2 hover:text-primary"
                  }
                `}
              >
                <m.icon className="w-5 h-5" />
                <span>{m.title}</span>
              </Link>
            );
          })}
        </SidebarContent>

        {/* Rodapé */}
        <SidebarFooter className="p-4 border-t border-surface text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Configurações</span>
            <Settings className="w-4 h-4 opacity-70" />
          </div>
          <p className="text-xs mt-2 text-muted-foreground">
            50 lojas · Dados de 6 meses
          </p>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
