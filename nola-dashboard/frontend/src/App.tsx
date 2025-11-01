import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ThemeToggle } from "./components/theme-toggle.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/not-found.tsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route
        path="/analytics"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Custom analytics builder coming soon...
            </p>
          </div>
        )}
      />
      <Route
        path="/products"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Product performance analysis coming soon...
            </p>
          </div>
        )}
      />
      <Route
        path="/stores"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Stores</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Store comparison coming soon...
            </p>
          </div>
        )}
      />
      <Route
        path="/trends"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Trends</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Trend analysis coming soon...
            </p>
          </div>
        )}
      />
      <Route
        path="/settings"
        component={() => (
          <div className="p-8">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Settings coming soon...
            </p>
          </div>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <div
            style={style as React.CSSProperties}
            className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          >
            {/* Sidebar */}
            <AppSidebar
              open={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Conteúdo principal */}
            <div
              className={`flex flex-col flex-1 transition-all duration-300 ${
                sidebarOpen ? "lg:ml-64" : "lg:ml-0"
              }`}
            >
              {/* Header */}
              <header className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300 shadow-sm">
                {/* Botão toggle sidebar */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9 transition"
                  aria-label="Alternar menu lateral"
                >
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

                {/* Toggle de tema */}
                <ThemeToggle />
              </header>

              {/* Conteúdo principal da página */}
              <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <Router />
              </main>
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
