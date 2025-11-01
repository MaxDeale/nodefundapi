export type TransactionType = 'BUY' | 'SELL';

export type FundCategory = 'tech' | 'healthcare' | 'finance' | 'energy' | 'consumer' | 'industrial';

export interface Fund {
  id: string;
  name: string;
  symbol: string;
  price: number;
  currency: string;
  category: FundCategory;
}

export interface Holding {
  fundId: string;
  quantity: number;
  averagePurchasePrice: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  holdings: Holding[];
  createdAt: string;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  fundId: string;
  type: TransactionType;
  quantity: number;
  price: number;
  timestamp: string;
}

export interface PortfolioValue {
  totalValue: number;
  totalInvested: number;
  returnAmount: number;
  returnPercentage: number;
}

export interface PortfolioPerformance {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface PriceHistory {
  date: string;
  price: number;
}

