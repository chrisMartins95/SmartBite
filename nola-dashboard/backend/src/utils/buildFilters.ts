/* ============================================================
🧩 UTILITÁRIO: buildDashboardFilters
===============================================================
Função usada para montar dinamicamente a cláusula WHERE e os 
parâmetros ($1, $2, etc.) das consultas SQL do dashboard.

➡️ Ela permite aplicar filtros de:
   - 🗓️ Período (data inicial e final)
   - 🌐 Canal
   - 🏬 Loja

💡 Benefício: evita SQL Injection e facilita o reuso da lógica 
em diferentes endpoints do backend.
=========================================================== */

export function buildDashboardFilters(query: any) {
  // 📥 Extrai os filtros enviados pela query string
  const { start, end, channel, store } = query;

  // 🧱 Arrays auxiliares: um para condições e outro para valores
  const where: string[] = []; // Armazena condições SQL (ex: "s.channel_id = $3")
  const params: any[] = [];   // Armazena os valores que substituem os placeholders

  /* ===========================================================
  ✅ 1. FILTRO DE DATA (start e end)
  ===========================================================
  - Só aplica o filtro se *ambas* as datas existirem.
  - Usa BETWEEN com placeholders ($1 e $2).
  - Garante que só os registros dentro do intervalo sejam buscados.
  */
  if (start && end) {
    params.push(start); // $1 — Data inicial
    params.push(end);   // $2 — Data final
    where.push(`s.created_at BETWEEN $${params.length - 1} AND $${params.length}`);
  }

  /* ===========================================================
  ✅ 2. FILTRO DE CANAL
  ===========================================================
  - Só filtra se o canal for diferente de "all".
  - Converte o valor recebido em número (segurança extra).
  */
  if (channel && channel !== "all") {
    params.push(Number(channel)); // Próximo índice dinâmico ($3, $4...)
    where.push(`s.channel_id = $${params.length}`);
  }

  /* ===========================================================
  ✅ 3. FILTRO DE LOJA
  ===========================================================
  - Só aplica se uma loja específica for selecionada.
  - Ignora se for "all" (ou seja, todas as lojas).
  */
  if (store && store !== "all") {
    params.push(Number(store)); // Próximo índice dinâmico
    where.push(`s.store_id = $${params.length}`);
  }

  /* ===========================================================
  🧮 4. MONTA A CLÁUSULA FINAL
  ===========================================================
  - Junta as condições com "AND" se houver mais de uma.
  - Se não houver filtros, retorna uma string vazia (sem WHERE).
  */
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  // 📤 Retorna o WHERE completo e os valores correspondentes
  return { whereClause, params };
}
