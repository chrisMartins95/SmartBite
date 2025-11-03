import api from './api';

export const getMetrics = async () => {
  const res = await api.get('/dashboard/metrics');
  return res.data;
};

export const getRevenueTrend = async () => {
  const res = await api.get('/dashboard/revenue-trend');
  return res.data;
};

export const getSalesByChannel = async () => {
  const res = await api.get('/dashboard/sales-by-channel');
  return res.data;
};

export const getTopProducts = async () => {
  const res = await api.get('/dashboard/top-products');
  return res.data;
};

export const getRecentTransactions = async () => {
  const res = await api.get('/dashboard/recent-transactions');
  return res.data;
};
