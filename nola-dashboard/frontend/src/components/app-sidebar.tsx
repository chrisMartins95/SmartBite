import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Store,
  TrendingUp,
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
      {/* 🔲 Overlay escuro no mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      />

      {/* 🧭 Sidebar principal */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-gray-100 w-64 border-r border-gray-800
        transition-transform duration-300 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        {/* Cabeçalho */}
        <SidebarHeader className="p-4 border-b border-gray-800 flex flex-col items-start justify-between">
          <h1 className="text-lg font-bold tracking-wide">🍽️ NOLA INSIGHTS</h1>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mt-1">
            Melhorando sua vida
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden self-end mt-2 p-2 rounded hover:bg-gray-800 transition"
            aria-label="Fechar menu"
          >
            ✖
          </button>
        </SidebarHeader>

        {/* Itens de navegação */}
        <SidebarContent className="flex-1 overflow-y-auto">
          <nav className="p-3 space-y-2">
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide px-2 mt-2 mb-1">
              Navigation
            </div>

            {menuItems.map((m) => {
              const active = location === m.url;
              return (
                <a
                  key={m.url}
                  href={m.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-gray-800 text-blue-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                  <span>{m.title}</span>
                </a>
              );
            })}
          </nav>
        </SidebarContent>

        {/* Rodapé */}
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide px-2 mt-2 mb-1">
          System
        </div>
        <SidebarFooter className="p-4 border-t border-gray-800 text-sm text-gray-400 text-center">
          ⚙️ Configurações
          <p className="text-xs text-gray-500 mt-2">
            50 Stores · 6 Months Data
          </p>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
