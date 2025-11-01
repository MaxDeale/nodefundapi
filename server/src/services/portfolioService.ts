import { PortfolioModel } from '../models/Portfolio';
import { TransactionModel } from '../models/Transaction';
import { FundModel } from '../models/Fund';
import { CalculationService } from './calculationService';
import { Portfolio, PortfolioValue, PortfolioPerformance, Holding } from '../utils/types';

export class PortfolioService {
  private calculationService: CalculationService;

  constructor(
    private portfolioModel: PortfolioModel,
    private transactionModel: TransactionModel,
    private fundModel: FundModel
  ) {
    this.calculationService = new CalculationService();
  }

  createPortfolio(userId: string, name: string): Portfolio {
    const portfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      userId,
      name,
      holdings: [],
      createdAt: new Date().toISOString(),
    };
    
    return this.portfolioModel.create(portfolio);
  }

  getPortfolioById(id: string): Portfolio | null {
    const portfolio = this.portfolioModel.getById(id);
    return portfolio || null;
  }

  getAllPortfolios(userId?: string): Portfolio[] {
    if (userId) {
      return this.portfolioModel.getByUserId(userId);
    }
    return this.portfolioModel.getAll();
  }

  getPortfolioValue(id: string): PortfolioValue | null {
    const portfolio = this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const funds = this.fundModel.getAll();
    return this.calculationService.calculatePortfolioValue(portfolio, funds);
  }

  getPortfolioReturns(id: string): { returnPercentage: number; returnAmount: number } | null {
    const value = this.getPortfolioValue(id);
    if (!value) return null;

    return {
      returnPercentage: value.returnPercentage,
      returnAmount: value.returnAmount,
    };
  }

  getPortfolioHistory(id: string): any[] {
    return this.transactionModel.getByPortfolioId(id);
  }

  getTopHoldings(id: string, limit: number = 5) {
    const portfolio = this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const funds = this.fundModel.getAll();
    return this.calculationService.getTopHoldings(portfolio, funds, limit);
  }

  getPortfolioPerformance(id: string): PortfolioPerformance | null {
    const portfolio = this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const transactions = this.transactionModel.getByPortfolioId(id);
    const funds = this.fundModel.getAll();
    
    return this.calculationService.calculatePerformance(portfolio, transactions, funds);
  }

  portfolioExists(id: string): boolean {
    return this.portfolioModel.exists(id);
  }

  getHoldingsByFund(portfolioId: string, fundId: string): Holding | null {
    const portfolio = this.portfolioModel.getById(portfolioId);
    if (!portfolio) return null;

    const holding = portfolio.holdings.find(h => h.fundId === fundId);
    return holding || null;
  }

  updateHoldings(portfolioId: string, holdings: Holding[]): Portfolio | null {
    return this.portfolioModel.updateHoldings(portfolioId, holdings);
  }
}

