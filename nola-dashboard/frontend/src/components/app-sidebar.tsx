// 🎨 Ícones importados da biblioteca lucide-react
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Store,
  TrendingUp,
  Settings,
} from "lucide-react";

// 🧭 useLocation e Link — navegação leve via Wouter (React Router simplificado)
import { useLocation, Link } from "wouter";

// 🧱 Componentes estruturais reutilizáveis da Sidebar
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "./ui/sidebar.tsx";

/* ============================================================
📋 MENU DE NAVEGAÇÃO — Itens principais da sidebar
===============================================================
Cada item contém:
- title: Nome do menu
- url: Caminho da rota
- icon: Ícone exibido ao lado do título
=========================================================== */
const menuItems = [
  { title: "Painel", url: "/", icon: LayoutDashboard },
  { title: "Análises", url: "/analytics", icon: BarChart3 },
  { title: "Produtos", url: "/products", icon: ShoppingBag },
  { title: "Lojas", url: "/stores", icon: Store },
  { title: "Tendências", url: "/trends", icon: TrendingUp },
];

/* ============================================================
⚙️ Tipagem das props do componente
=========================================================== */
interface Props {
  open: boolean;      // Indica se a sidebar está aberta (modo mobile)
  onToggle: () => void; // Função para abrir/fechar a sidebar
}

/* ============================================================
🧭 COMPONENTE: AppSidebar
===============================================================
Sidebar principal do sistema. Contém:
- Cabeçalho (logo e botão de fechar)
- Navegação com links
- Rodapé com informações extras
=========================================================== */
export function AppSidebar({ open, onToggle }: Props) {
  const [location] = useLocation(); // 📍 Obtém a rota atual

  return (
    <>
      {/* ============================================================
      🌑 OVERLAY (modo mobile)
      ============================================================
      Exibe um fundo escuro semi-transparente quando o menu está aberto
      no celular. Fecha a sidebar ao clicar fora.
      */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* ============================================================
      📦 SIDEBAR PRINCIPAL
      ============================================================ */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-md border-r border-surface
          bg-surface text-foreground
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* ============================================================
        🧱 CABEÇALHO
        ============================================================ */}
        <SidebarHeader className="p-4 border-b border-surface">
          <h1 className="text-lg font-bold tracking-wide text-primary">
            📦 SalesHub
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Seu centro unificado de insights
          </p>

          {/* 🔘 Botão de fechar (somente no mobile) */}
          <button
            onClick={onToggle}
            className="lg:hidden self-end mt-2 p-2 rounded-lg hover:bg-elevate-1 dark:hover:bg-elevate-2 transition"
            aria-label="Fechar menu"
          >
            ✖
          </button>
        </SidebarHeader>

        {/* ============================================================
        🧭 NAVEGAÇÃO (lista de links)
        ============================================================ */}
        <SidebarContent className="flex-1 overflow-y-auto p-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wide px-2 mb-2">
            Navegação
          </div>

          {/* 🔗 Mapeia e renderiza cada item do menu */}
          {menuItems.map((m) => {
            const active = location === m.url; // Verifica se o item está ativo
            return (
              <Link
                key={m.url}
                href={m.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    active
                      ? "bg-primary text-primary-foreground" // Ativo: destaque
                      : "text-foreground hover:bg-elevate-1 dark:hover:bg-elevate-2 hover:text-primary" // Inativo: hover suave
                  }
                `}
              >
                <m.icon className="w-5 h-5" /> {/* 🖼 Ícone do menu */}
                <span>{m.title}</span> {/* 🏷️ Título do menu */}
              </Link>
            );
          })}
        </SidebarContent>

        {/* ============================================================
        ⚙️ RODAPÉ DA SIDEBAR
        ============================================================ */}
        <SidebarFooter className="p-4 border-t border-surface text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Configurações</span>
            <Settings className="w-4 h-4 opacity-70" /> {/* ⚙️ Ícone de settings */}
          </div>
          <p className="text-xs mt-2 text-muted-foreground">
            50 lojas · Dados de 6 meses {/* 📊 Informações do sistema */}
          </p>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
