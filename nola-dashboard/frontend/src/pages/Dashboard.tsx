import { useEffect, useState } from 'react';
import api from '../api/api';
import { Card } from '../components/Card';
import { ChartBar } from '../components/ChartBar';
import { ChartLine } from '../components/ChartLine';
import { Topbar } from '../components/Topbar';

// ✅ Função para formatar valores em reais
function currency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Tipagens
interface MetricData {
  total_revenue: number;
  total_sales: number;
  avg_ticket: number;
}

interface TimeSeriesItem {
  day: string;
  sales_count: number;
  revenue: number;
}

interface ChannelData {
  channel: string;
  sales_count: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [timeseries, setTimeseries] = useState<TimeSeriesItem[]>([]);
  const [byChannel, setByChannel] = useState<ChannelData[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Carrega dados
  useEffect(() => {
    async function fetchData() {
      try {
        const [metricsRes, timeseriesRes, channelRes] = await Promise.all([
          api.get('/metrics'),
          api.get('/timeseries'),
          api.get('/by-channel'),
        ]);
        setMetrics(metricsRes.data);
        setTimeseries(timeseriesRes.data);
        setByChannel(channelRes.data);
      } catch (error) {
        console.error('❌ Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* 🔝 Topbar */}
      <Topbar stores={[]} />

      {/* 📦 Conteúdo principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 📅 Filtros e período */}
        <section className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Data inicial:</label>
            <input
              type="date"
              className="border rounded-md p-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Data final:</label>
            <input
              type="date"
              className="border rounded-md p-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
            Filtrar
          </button>
        </section>

        {/* 🔄 Feedback de carregamento */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : (
          <>
            {/* 📊 Cards de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card
                variant="large"
                title="FATURAMENTO TOTAL"
                value={currency(metrics?.total_revenue || 0)}
              />
              <Card
                variant="large"
                title="TOTAL DE VENDAS"
                value={metrics?.total_sales || 0}
              />
              <Card
                variant="large"
                title="TICKET MÉDIO"
                value={currency(metrics?.avg_ticket || 0)}
              />
            </div>

            {/* 📈 Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Painel Faturamento */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Evolução do Faturamento
                </h3>
                <div className="flex-1">
                  <ChartLine
                    data={timeseries.map((t) => ({
                      day: t.day,
                      sales_count: t.sales_count,
                      revenue: t.revenue,
                    }))}
                  />
                </div>
              </div>

              {/* Painel Distribuição por Canal */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Distribuição por Canal
                </h3>
                <div className="flex-1">
                  <ChartBar
                    data={byChannel.map((c) => ({
                      produto: c.channel,
                      quantidade_vendida: c.sales_count,
                    }))}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
