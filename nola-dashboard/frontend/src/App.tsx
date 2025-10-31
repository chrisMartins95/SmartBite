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
            <h1 className="text-2xl font-semibold">Products</h1>
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
            <h1 className="text-2xl font-semibold">Stores</h1>
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
            <h1 className="text-2xl font-semibold">Trends</h1>
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
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground mt-2">
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 controla o estado do sidebar
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              {/* Sidebar */}
              <AppSidebar
                open={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
              />

              {/* Main Content */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
                  <button
                    className="lg:hidden text-xl"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    ☰
                  </button>
                  <ThemeToggle />
                </header>

                <main className="flex-1 overflow-y-auto">
                  <Router />
                </main>
              </div>
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
