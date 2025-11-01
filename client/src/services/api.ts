import axios from 'axios';
import type {
  Fund,
  Portfolio,
  Transaction,
  PortfolioValue,
  PortfolioPerformance,
  PriceHistory,
  CreatePortfolioRequest,
  CreateTransactionRequest,
  FundCategory,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funds API
export const fundsApi = {
  getAll: async (category?: FundCategory): Promise<Fund[]> => {
    const params = category ? { category } : {};
    const response = await apiClient.get<Fund[]>('/funds', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Fund> => {
    const response = await apiClient.get<Fund>(`/funds/${id}`);
    return response.data;
  },

  getPriceHistory: async (id: string, days: number = 30): Promise<PriceHistory[]> => {
    const response = await apiClient.get<PriceHistory[]>(`/funds/${id}/price-history`, {
      params: { days },
    });
    return response.data;
  },
};

// Portfolios API
export const portfoliosApi = {
  getAll: async (userId?: string): Promise<Portfolio[]> => {
    const params = userId ? { userId } : {};
    const response = await apiClient.get<Portfolio[]>('/portfolios', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Portfolio> => {
    const response = await apiClient.get<Portfolio>(`/portfolios/${id}`);
    return response.data;
  },

  create: async (data: CreatePortfolioRequest): Promise<Portfolio> => {
    const response = await apiClient.post<Portfolio>('/portfolios', data);
    return response.data;
  },

  getValue: async (id: string): Promise<PortfolioValue> => {
    const response = await apiClient.get<PortfolioValue>(`/portfolios/${id}/value`);
    return response.data;
  },

  getReturns: async (id: string): Promise<{ returnPercentage: number; returnAmount: number }> => {
    const response = await apiClient.get<{ returnPercentage: number; returnAmount: number }>(
      `/portfolios/${id}/returns`
    );
    return response.data;
  },

  getHistory: async (id: string): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>(`/portfolios/${id}/history`);
    return response.data;
  },

  getTopHoldings: async (id: string, limit: number = 5) => {
    const response = await apiClient.get(`/portfolios/${id}/top-holdings`, {
      params: { limit },
    });
    return response.data;
  },

  getPerformance: async (id: string): Promise<PortfolioPerformance> => {
    const response = await apiClient.get<PortfolioPerformance>(`/portfolios/${id}/performance`);
    return response.data;
  },
};

// Transactions API
export const transactionsApi = {
  create: async (data: CreateTransactionRequest): Promise<Transaction> => {
    try {
      const response = await apiClient.post<Transaction>('/transactions', data);
      return response.data;
    } catch (error: any) {
      // Extract error message from API response
      const errorMessage = error?.response?.data?.error || error?.message || 'Failed to create transaction';
      throw new Error(errorMessage);
    }
  },

  getByPortfolio: async (portfolioId: string): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>(`/transactions/portfolio/${portfolioId}`);
    return response.data;
  },
};

export default apiClient;

