/* ============================================================
🚀 APP PRINCIPAL — SalesHub Dashboard
===============================================================
Integra:
✅ Gerenciamento de tema (ThemeProvider + Toggle)
✅ Sistema de rotas (Wouter)
✅ Sidebar responsiva
✅ React Query (cache de API)
✅ Tooltips e Toaster
✅ Layout base do dashboard
=========================================================== */

import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";

// 🧠 Configuração global de cache de API
import { queryClient } from "./lib/queryClient";

// 🔔 Toasts, tooltips e tema
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ThemeToggle } from "./components/theme-toggle.tsx";

// 🧭 Sidebar e páginas
import { AppSidebar } from "./components/app-sidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/not-found.tsx";

/* ============================================================
🧩 SISTEMA DE ROTAS
=========================================================== */
function Router() {
  return (
    <Switch>
      {/* Página principal */}
      <Route path="/" component={Dashboard} />

      {/* Páginas placeholder futuras */}
      <Route
        path="/analytics"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Custom analytics builder coming soon...
            </p>
          </div>
        )}
      />

      <Route
        path="/products"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-foreground">Products</h1>
            <p className="text-muted-foreground mt-2">
              Product performance analysis coming soon...
            </p>
          </div>
        )}
      />

      <Route
        path="/stores"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-foreground">Stores</h1>
            <p className="text-muted-foreground mt-2">
              Store comparison coming soon...
            </p>
          </div>
        )}
      />

      <Route
        path="/trends"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
            <p className="text-muted-foreground mt-2">
              Trend analysis coming soon...
            </p>
          </div>
        )}
      />

      <Route
        path="/settings"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Settings coming soon...
            </p>
          </div>
        )}
      />

      {/* Página 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

/* ============================================================
💻 COMPONENTE PRINCIPAL — App
=========================================================== */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔄 Controle da sidebar (mobile / desktop)

  // 🔧 Define largura fixa da sidebar como variável CSS
  const style = { "--sidebar-width": "16rem" };

  return (
    <QueryClientProvider client={queryClient}>
      {/* 🎨 Gerenciador de tema (dark/light) */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* 💬 Provider de tooltips */}
        <TooltipProvider>
          <div
            style={style as React.CSSProperties}
            className="flex h-screen w-full bg-background text-foreground transition-colors duration-300"
          >
            {/* 🧭 Sidebar */}
            <AppSidebar
              open={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* 🧱 Conteúdo principal */}
            <div
              className={`flex flex-col flex-1 transition-all duration-300 ${
                sidebarOpen ? "lg:ml-64" : "lg:ml-0"
              }`}
            >
              {/* ============================================================
              🧤 CABEÇALHO SUPERIOR
              ============================================================ */}
              <header className="flex items-center justify-between px-5 py-3 border-b border-surface bg-surface text-foreground shadow-sm transition-colors duration-300">
                {/* Botão de abrir/fechar menu lateral */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg text-foreground hover:bg-elevate-1 dark:hover:bg-elevate-2 h-9 w-9 transition"
                  aria-label="Alternar menu lateral"
                >
                  {/* Ícone (lucide-react) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-panel-left"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 3v18"></path>
                  </svg>
                </button>

                {/* 🌗 Alternador de tema */}
                <ThemeToggle />
              </header>

              {/* ============================================================
              🧩 CONTEÚDO DAS PÁGINAS
              ============================================================ */}
              <main className="flex-1 overflow-y-auto bg-background text-foreground transition-colors duration-300 p-4">
                <Router />
              </main>
            </div>
          </div>

          {/* 🔔 Sistema de toasts */}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
