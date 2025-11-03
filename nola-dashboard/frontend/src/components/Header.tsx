/* ============================================================
🧱 COMPONENTE: Header
===============================================================
Cabeçalho principal do dashboard — normalmente usado para 
exibir o nome da aplicação, logotipo ou atalhos de navegação.

💡 Neste caso, ele mostra o título "🍔 Nola Dashboard".
=========================================================== */
export const Header = () => {
  return (
    // 🧭 Tag semântica <header> para representar o topo do site
    <header className="site-header">
      {/* 🏷️ Título principal do dashboard */}
      <h1>🍔 Nola Dashboard</h1>
    </header>
  );
};
