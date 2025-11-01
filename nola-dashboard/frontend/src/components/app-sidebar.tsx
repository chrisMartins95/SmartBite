import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Store,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "./ui/sidebar.tsx";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Stores", url: "/stores", icon: Store },
  { title: "Trends", url: "/trends", icon: TrendingUp },
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
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-md border-r border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Cabeçalho */}
        <SidebarHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-bold tracking-wide text-gray-900 dark:text-gray-100">
            🍽️ NOLA INSIGHTS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Melhorando sua vida
          </p>

          {/* Botão de fechar (mobile) */}
          <button
            onClick={onToggle}
            className="lg:hidden self-end mt-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Fechar menu"
          >
            ✖
          </button>
        </SidebarHeader>

        {/* Navegação */}
        <SidebarContent className="flex-1 overflow-y-auto p-3">
          <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wide px-2 mb-2">
            Navegação
          </div>

          {menuItems.map((m) => {
            const active = location === m.url;
            return (
              <a
                key={m.url}
                href={m.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    active
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  }
                `}
              >
                <m.icon className="w-5 h-5" />
                <span>{m.title}</span>
              </a>
            );
          })}
        </SidebarContent>

        {/* Rodapé */}
        <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>Configurações</span>
            <Settings className="w-4 h-4 opacity-70" />
          </div>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            50 lojas · Dados de 6 meses
          </p>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
