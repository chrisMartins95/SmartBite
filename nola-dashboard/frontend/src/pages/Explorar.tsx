
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { ChartBar } from '../components/ChartBar';
import { ChartLine } from '../components/ChartLine';
import { Card } from '../components/Card';
import { Topbar } from '../components/Topbar';

interface Store {
  id: number;
  name: string;
}

interface Channel {
  id: number;
  name: string;
}

const currency = (v: number | string) => {
  const n = typeof v === 'string' ? parseFloat(v) : v;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(n || 0);
};

export default function Explorar() {
  const [stores, setStores] = useState<Store[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [filters, setFilters] = useState({
    dataInicio: '',
    dataFim: '',
    loja: '',
    canal: ''
  });

  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [byChannel, setByChannel] = useState<any[]>([]);
  const [byStore, setByStore] = useState<any[]>([]);
  const [timeseries, setTimeseries] = useState<any[]>([]);

  // 🔄 Carregar dados iniciais (lojas, canais)
  useEffect(() => {
    api.get('/stores').then(r => setStores(r.data)).catch(() => setStores([]));
    api.get('/channels').then(r => setChannels(r.data)).catch(() => setChannels([]));
    fetchData();
  }, []);

  // 📥 Buscar dados filtrados
  const fetchData = async () => {
    try {
      setLoading(true);
      const params: any = {};

      if (filters.dataInicio) params.dataInicio = filters.dataInicio;
      if (filters.dataFim) params.dataFim = filters.dataFim;
      if (filters.loja) params.loja = filters.loja;
      if (filters.canal) params.canal = filters.canal;

      const res = await api.get('/explorar', { params });

      setMetrics(res.data.metrics || null);
      setTopProducts(res.data.top_products || []);
      setByChannel(res.data.sales_by_channel || []);
      setByStore(res.data.sales_by_store || []);
      setTimeseries(res.data.sales_timeseries || []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🕒 Auto-fetch com debounce quando filtros mudam
  useEffect(() => {
    const t = setTimeout(() => {
      fetchData();
    }, 600);
    return () => clearTimeout(t);
  }, [filters]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Topbar stores={stores} />
      <div className="page-container">
        <h1>Explorar Dados</h1>

        {/* 🔍 Filtros */}
        <section className="filters">
          <div className="filter-field">
            <label>Data Início</label>
            <input type="date" name="dataInicio" value={filters.dataInicio} onChange={onChange} />
          </div>
          <div className="filter-field">
            <label>Data Fim</label>
            <input type="date" name="dataFim" value={filters.dataFim} onChange={onChange} />
          </div>
          <div className="filter-field">
            <label>Loja</label>
            <select name="loja" value={filters.loja} onChange={onChange}>
              <option value="">Todas</option>
              {stores.length === 0 && <option disabled>Carregando...</option>}
              {stores.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label>Canal</label>
            <select name="canal" value={filters.canal} onChange={onChange}>
              <option value="">Todos</option>
              {channels.length === 0 && <option disabled>Carregando...</option>}
              {channels.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field" style={{ alignSelf: 'end' }}>
            <button className="apply-button" onClick={fetchData} disabled={loading}>
              {loading ? 'Carregando...' : 'Aplicar filtros'}
            </button>
          </div>
        </section>

        {/* 📊 Métricas principais */}
        {metrics && (
          <div className="metrics">
            <Card title="Vendas" value={metrics.total_sales} />
            <Card title="Receita" value={currency(metrics.total_revenue)} />
            <Card title="Ticket Médio" value={currency(metrics.avg_ticket)} />
          </div>
        )}

        {/* 🏆 Top produtos */}
        <h2>Top Produtos</h2>
        <div className="chart-section">
          <ChartBar
            data={topProducts.map(p => ({
              produto: p.produto,
              quantidade_vendida: p.quantidade_vendida
            }))}
          />
        </div>

        {/* 📈 Evolução das vendas */}
        <h2>Vendas ao longo do tempo</h2>
        <div className="chart-section">
          <ChartLine
            data={timeseries.map((t: any) => ({
              day: t.day,
              sales_count: t.sales_count,
              revenue: t.revenue
            }))}
          />
        </div>

        {/* 🧾 Tabelas */}
        <div className="tables-row">
          <div>
            <h3>Vendas por Canal</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Canal</th>
                    <th>Vendas</th>
                    <th>Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {byChannel.map((r, i) => (
                    <tr key={i}>
                      <td>{r.channel}</td>
                      <td>{r.sales_count}</td>
                      <td>{currency(r.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3>Top Lojas</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Loja</th>
                    <th>Vendas</th>
                    <th>Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {byStore.map((r, i) => (
                    <tr key={i}>
                      <td>{r.store}</td>
                      <td>{r.sales_count}</td>
                      <td>{currency(r.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
