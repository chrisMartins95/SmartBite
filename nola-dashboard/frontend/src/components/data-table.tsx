// import React, { useState } from 'react'; // ⚠️ Import comentado — não necessário no React moderno

/* ============================================================
🧩 INTERFACE: Column<T>
===============================================================
Define o formato de uma coluna da tabela genérica.
Cada coluna contém:
- key: nome do campo (string ou keyof T)
- header: título exibido no cabeçalho da tabela
- render (opcional): função personalizada para renderizar o valor
=========================================================== */
export interface Column<T> {
  key: keyof T | string; // 🔑 Nome da propriedade do objeto (ou chave manual)
  header: string; // 🏷️ Título da coluna exibido no <th>
  render?: (item: T) => React.ReactNode; // 🎨 Função opcional para renderização customizada
}

/* ============================================================
📊 COMPONENTE: DataTable<T>
===============================================================
Componente de tabela genérica que pode renderizar qualquer tipo
de dado (T), com colunas configuráveis via props.

💡 Ideal para exibir listas de produtos, vendas, transações, etc.
=========================================================== */
export function DataTable<T>({
  data,     // 📦 Array de objetos genéricos (linhas da tabela)
  columns,  // 🧱 Configuração das colunas (headers e renderização)
}: {
  data: T[];
  columns: Column<T>[];
}) {
  return (
    // 🧱 Estrutura base da tabela com estilos visuais
    <table className="w-full bg-card border border-card-border rounded-md overflow-hidden">
      {/* ============================================================
      🏷️ CABEÇALHO (thead)
      ============================================================ */}
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={String(c.key)} // 🔑 Cada coluna tem uma key única
              className="p-3 text-left text-sm text-muted-foreground"
            >
              {c.header} {/* 📘 Título da coluna */}
            </th>
          ))}
        </tr>
      </thead>

      {/* ============================================================
      📋 CORPO DA TABELA (tbody)
      ============================================================ */}
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i} // 🧾 Key única para cada linha
            className={i % 2 ? 'bg-background' : ''} // 🎨 Linhas alternadas para melhor leitura
          >
            {/* ============================================================
            🔁 CELULAS DE CADA LINHA
            ============================================================ */}
            {columns.map((c) => (
              <td key={String(c.key)} className="p-3">
                {/* 🧩 Se a coluna tiver função de render, usa ela — senão, exibe valor direto */}
                {c.render ? c.render(row) : (row as any)[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
