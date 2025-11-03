/* ============================================================
🚫 COMPONENTE: NotFound
===============================================================
Página de fallback exibida quando o usuário acessa uma rota 
que não existe no aplicativo (erro 404).

💡 Ideal para ser usada com React Router ou Wouter, 
como rota coringa (`*`).
=========================================================== */
export default function NotFound() {
  return (
    // 🧱 Container principal com espaçamento interno
    <div className="p-8">
      {/* 🏷️ Mensagem de erro clara e visual */}
      <h1 className="text-2xl font-semibold">
        404 — Página não encontrada
      </h1>
    </div>
  );
}
