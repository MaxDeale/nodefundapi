import { Portfolio, Holding } from '../utils/types';

export class PortfolioModel {
  private portfolios: Portfolio[] = [];

  getAll(): Portfolio[] {
    return this.portfolios;
  }

  getById(id: string): Portfolio | undefined {
    return this.portfolios.find(p => p.id === id);
  }

  getByUserId(userId: string): Portfolio[] {
    return this.portfolios.filter(p => p.userId === userId);
  }

  create(portfolio: Portfolio): Portfolio {
    this.portfolios.push(portfolio);
    return portfolio;
  }

  update(id: string, updates: Partial<Portfolio>): Portfolio | null {
    const portfolio = this.portfolios.find(p => p.id === id);
    if (portfolio) {
      Object.assign(portfolio, updates);
      return portfolio;
    }
    return null;
  }

  updateHoldings(id: string, holdings: Holding[]): Portfolio | null {
    const portfolio = this.portfolios.find(p => p.id === id);
    if (portfolio) {
      portfolio.holdings = holdings;
      return portfolio;
    }
    return null;
  }

  exists(id: string): boolean {
    return this.portfolios.some(p => p.id === id);
  }
}

