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

  async createPortfolio(userId: string, name: string): Promise<Portfolio> {
    const portfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      userId,
      name,
      holdings: [],
      createdAt: new Date().toISOString(),
    };
    
    return await this.portfolioModel.create(portfolio);
  }

  async getPortfolioById(id: string): Promise<Portfolio | null> {
    const portfolio = await this.portfolioModel.getById(id);
    return portfolio || null;
  }

  async getAllPortfolios(userId?: string): Promise<Portfolio[]> {
    if (userId) {
      return await this.portfolioModel.getByUserId(userId);
    }
    return await this.portfolioModel.getAll();
  }

  async getPortfolioValue(id: string): Promise<PortfolioValue | null> {
    const portfolio = await this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const funds = await this.fundModel.getAll();
    return this.calculationService.calculatePortfolioValue(portfolio, funds);
  }

  async getPortfolioReturns(id: string): Promise<{ returnPercentage: number; returnAmount: number } | null> {
    const value = await this.getPortfolioValue(id);
    if (!value) return null;

    return {
      returnPercentage: value.returnPercentage,
      returnAmount: value.returnAmount,
    };
  }

  async getPortfolioHistory(id: string): Promise<any[]> {
    return await this.transactionModel.getByPortfolioId(id);
  }

  async getTopHoldings(id: string, limit: number = 5) {
    const portfolio = await this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const funds = await this.fundModel.getAll();
    return this.calculationService.getTopHoldings(portfolio, funds, limit);
  }

  async getPortfolioPerformance(id: string): Promise<PortfolioPerformance | null> {
    const portfolio = await this.portfolioModel.getById(id);
    if (!portfolio) return null;

    const transactions = await this.transactionModel.getByPortfolioId(id);
    const funds = await this.fundModel.getAll();
    
    return this.calculationService.calculatePerformance(portfolio, transactions, funds);
  }

  async portfolioExists(id: string): Promise<boolean> {
    return await this.portfolioModel.exists(id);
  }

  async getHoldingsByFund(portfolioId: string, fundId: string): Promise<Holding | null> {
    const portfolio = await this.portfolioModel.getById(portfolioId);
    if (!portfolio) return null;

    const holding = portfolio.holdings.find(h => h.fundId === fundId);
    return holding || null;
  }

  async updateHoldings(portfolioId: string, holdings: Holding[]): Promise<Portfolio | null> {
    return await this.portfolioModel.updateHoldings(portfolioId, holdings);
  }
}
