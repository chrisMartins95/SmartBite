/* ============================================================
🎨 FUNÇÃO UTILITÁRIA: cn()
===============================================================
Concatena múltiplas classes CSS em uma única string, 
ignorando valores falsos (false, null, undefined).

💡 Usada para aplicar classes condicionalmente em JSX sem
precisar escrever muitos operadores ternários.

Exemplo:
---------------------------------------------------------------
cn("btn", isActive && "btn-active", isLarge && "btn-lg")
→ "btn btn-active btn-lg" (ignora falsos)
=========================================================== */
export function cn(...args: Array<string | false | null | undefined>) {
  // 🧹 Filtra apenas valores verdadeiros e junta com espaço
  return args.filter(Boolean).join(' ');
}
