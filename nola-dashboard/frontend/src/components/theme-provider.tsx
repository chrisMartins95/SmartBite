// 📦 Importa React e hooks essenciais
import React, { createContext, useContext, useEffect, useState } from 'react';

/* ============================================================
🎨 TIPAGEM: Theme
===============================================================
Define os temas suportados pela aplicação.
=========================================================== */
type Theme = 'light' | 'dark';

/* ============================================================
🧩 CONTEXTO: ThemeContext
===============================================================
Cria um contexto global para armazenar o tema atual e a função
de atualização (`setTheme`).

💡 O valor padrão é `undefined` para garantir que o hook 
`useTheme()` só funcione dentro do provider.
=========================================================== */
const ThemeContext = createContext<
  { theme: Theme; setTheme: (t: Theme) => void } | undefined
>(undefined);

/* ============================================================
🌗 COMPONENTE: ThemeProvider
===============================================================
Gerencia o tema global (claro/escuro) e o salva no localStorage.

💡 Ao alterar o tema:
  - Atualiza a classe no elemento `<html>`
  - Persiste a preferência do usuário
=========================================================== */
export function ThemeProvider({
  children,                  // 👶 Componentes filhos que terão acesso ao tema
  defaultTheme = 'dark' as Theme, // 🌙 Tema padrão inicial
}: any) {
  // 🎛️ Estado do tema (inicializa com o valor salvo no localStorage)
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || defaultTheme
  );

  /* ============================================================
  🎨 EFEITO: Atualiza DOM e salva no localStorage
  ============================================================
  Executa toda vez que `theme` muda.
  - Remove classes antigas (light/dark)
  - Adiciona a nova classe
  - Salva a preferência no localStorage
  ============================================================ */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark'); // ❌ Remove classes antigas
    root.classList.add(theme);              // ✅ Adiciona a classe atual
    localStorage.setItem('theme', theme);   // 💾 Persiste o tema
  }, [theme]);

  /* ============================================================
  🧱 RENDERIZAÇÃO DO PROVIDER
  ============================================================
  Fornece o valor do contexto (`theme` e `setTheme`) 
  para todos os componentes filhos.
  ============================================================ */
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ============================================================
🪄 HOOK: useTheme()
===============================================================
Facilita o acesso ao contexto do tema.

💡 Exemplo de uso:
  const { theme, setTheme } = useTheme();
=========================================================== */
export function useTheme() {
  const ctx = useContext(ThemeContext);

  // 🚫 Garante que o hook só seja usado dentro do provider
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');

  return ctx;
}
