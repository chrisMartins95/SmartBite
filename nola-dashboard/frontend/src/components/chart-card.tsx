// 📦 Importa React (necessário para componentes funcionais)
import React from 'react';

// 🧱 Importa componentes estruturais reutilizáveis do sistema de UI
import { Card, CardHeader, CardContent } from './ui/card.tsx';

/* ============================================================
📊 INTERFACE: ChartCardProps
===============================================================
Define as propriedades esperadas pelo componente:
- title: título do gráfico ou seção
- children: conteúdo renderizado dentro (geralmente um gráfico)
=========================================================== */
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

/* ============================================================
📈 COMPONENTE: ChartCard
===============================================================
Componente container usado para exibir gráficos e visualizações 
dentro de um card estilizado.

💡 Reutiliza os componentes de layout `Card`, `CardHeader` e 
`CardContent` para manter a consistência visual no painel.
=========================================================== */
export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card>
      {/* ============================================================
      🏷️ CABEÇALHO DO CARD
      ============================================================ */}
      <CardHeader className="flex items-center justify-between p-4">
        <h3
          className="text-lg font-normal"
          style={{ color: 'hsl(var(--foreground))' }} // 🎨 Usa cor dinâmica do tema
        >
          {title} {/* 📘 Exibe o título do gráfico */}
        </h3>
      </CardHeader>

      {/* ============================================================
      📊 CONTEÚDO PRINCIPAL (gráfico ou dados)
      ============================================================ */}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
