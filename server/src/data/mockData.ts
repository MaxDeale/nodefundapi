import { Fund, Portfolio, Transaction } from '../utils/types';

export const initialFunds: Fund[] = [
  { id: 'fund-1', name: 'Tech Growth ETF', symbol: 'TECH', price: 150.50, currency: 'USD', category: 'tech' },
  { id: 'fund-2', name: 'Healthcare Innovation', symbol: 'HEALTH', price: 85.25, currency: 'USD', category: 'healthcare' },
  { id: 'fund-3', name: 'Financial Services Fund', symbol: 'FIN', price: 120.75, currency: 'USD', category: 'finance' },
  { id: 'fund-4', name: 'Clean Energy Fund', symbol: 'ENERGY', price: 65.30, currency: 'USD', category: 'energy' },
  { id: 'fund-5', name: 'Consumer Staples ETF', symbol: 'CONSUMER', price: 95.80, currency: 'USD', category: 'consumer' },
  { id: 'fund-6', name: 'Industrial Leaders', symbol: 'INDUST', price: 110.40, currency: 'USD', category: 'industrial' },
  { id: 'fund-7', name: 'AI & Robotics Fund', symbol: 'AIROBO', price: 200.00, currency: 'USD', category: 'tech' },
  { id: 'fund-8', name: 'Biotech Breakthrough', symbol: 'BIOTECH', price: 75.60, currency: 'USD', category: 'healthcare' },
];

export const initialPortfolios: Portfolio[] = [
  {
    id: 'portfolio-1',
    userId: 'user-1',
    name: 'My Retirement Portfolio',
    holdings: [
      { fundId: 'fund-1', quantity: 10, averagePurchasePrice: 145.00 },
      { fundId: 'fund-3', quantity: 5, averagePurchasePrice: 115.00 },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'portfolio-2',
    userId: 'user-1',
    name: 'Aggressive Growth',
    holdings: [
      { fundId: 'fund-7', quantity: 3, averagePurchasePrice: 190.00 },
      { fundId: 'fund-1', quantity: 15, averagePurchasePrice: 148.00 },
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'txn-1',
    portfolioId: 'portfolio-1',
    fundId: 'fund-1',
    type: 'BUY',
    quantity: 10,
    price: 145.00,
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'txn-2',
    portfolioId: 'portfolio-1',
    fundId: 'fund-3',
    type: 'BUY',
    quantity: 5,
    price: 115.00,
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'txn-3',
    portfolioId: 'portfolio-2',
    fundId: 'fund-7',
    type: 'BUY',
    quantity: 3,
    price: 190.00,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'txn-4',
    portfolioId: 'portfolio-2',
    fundId: 'fund-1',
    type: 'BUY',
    quantity: 15,
    price: 148.00,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

