export function buildDashboardFilters(query: any) {
  const { start, end, channel, store } = query;

  const where: string[] = [];
  const params: any[] = [];

  // ✅ 1. DATA — só filtra se ambas existirem
  if (start && end) {
    params.push(start); // $1
    params.push(end);   // $2
    where.push(`s.created_at BETWEEN $${params.length - 1} AND $${params.length}`);
  }

  // ✅ 2. CANAL
  if (channel && channel !== "all") {
    params.push(Number(channel)); // sempre no próximo index
    where.push(`s.channel_id = $${params.length}`);
  }

  // ✅ 3. LOJA
  if (store && store !== "all") {
    params.push(Number(store)); // sempre no próximo index
    where.push(`s.store_id = $${params.length}`);
  }

  // ✅ monta WHERE final
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  return { whereClause, params };
}
