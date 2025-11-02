import { TransactionModel } from '../models/Transaction';
import { PortfolioModel } from '../models/Portfolio';
import { FundModel } from '../models/Fund';
import { PortfolioService } from './portfolioService';
import { Transaction, TransactionType, Holding, Portfolio } from '../utils/types';

export class TransactionService {
  constructor(
    private transactionModel: TransactionModel,
    private portfolioModel: PortfolioModel,
    private fundModel: FundModel,
    private portfolioService: PortfolioService
  ) {}

  async createTransaction(
    portfolioId: string,
    fundId: string,
    type: TransactionType,
    quantity: number,
    price?: number
  ): Promise<Transaction | { error: string }> {
    // Validate portfolio exists
    const portfolio = await this.portfolioModel.getById(portfolioId);
    if (!portfolio) {
      return { error: 'Portfolio not found' };
    }

    // Validate fund exists
    const fund = await this.fundModel.getById(fundId);
    if (!fund) {
      return { error: 'Fund not found' };
    }

    // Use provided price or current fund price
    const transactionPrice = price || fund.price;

    // Validate price is within tolerance (1% of current price)
    const priceDifference = Math.abs(transactionPrice - fund.price) / fund.price;
    if (priceDifference > 0.01) {
      return { error: 'Price must be within 1% of current fund price' };
    }

    // Validate quantity
    if (quantity <= 0) {
      return { error: 'Quantity must be positive' };
    }

    // For SELL transactions, check if user has enough shares
    if (type === 'SELL') {
      const holding = await this.portfolioService.getHoldingsByFund(portfolioId, fundId);
      if (!holding || holding.quantity < quantity) {
        return { error: 'Insufficient holdings to sell' };
      }
    }

    // Create transaction
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      portfolioId,
      fundId,
      type,
      quantity,
      price: transactionPrice,
      timestamp: new Date().toISOString(),
    };

    // Update portfolio holdings
    await this.updatePortfolioHoldings(portfolio, fundId, type, quantity, transactionPrice);

    return await this.transactionModel.create(transaction);
  }

  private async updatePortfolioHoldings(
    portfolio: Portfolio,
    fundId: string,
    type: TransactionType,
    quantity: number,
    price: number
  ): Promise<void> {
    let holdings = [...portfolio.holdings];
    let holding = holdings.find(h => h.fundId === fundId);

    if (type === 'BUY') {
      if (holding) {
        // Update existing holding using weighted average
        const totalQuantity = holding.quantity + quantity;
        const totalValue = (holding.quantity * holding.averagePurchasePrice) + (quantity * price);
        holding.quantity = totalQuantity;
        holding.averagePurchasePrice = totalValue / totalQuantity;
      } else {
        // Create new holding
        holdings.push({
          fundId,
          quantity,
          averagePurchasePrice: price,
        });
      }
    } else if (type === 'SELL') {
      if (holding) {
        holding.quantity -= quantity;
        if (holding.quantity <= 0) {
          // Remove holding if quantity is zero
          holdings = holdings.filter(h => h.fundId !== fundId);
        }
      }
    }

    await this.portfolioService.updateHoldings(portfolio.id, holdings);
  }

  async getTransactionsByPortfolio(portfolioId: string): Promise<Transaction[]> {
    return await this.transactionModel.getByPortfolioId(portfolioId);
  }

  async getTransactionsByFund(fundId: string): Promise<Transaction[]> {
    return await this.transactionModel.getByFundId(fundId);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await this.transactionModel.getById(id);
    return transaction || null;
  }
}
