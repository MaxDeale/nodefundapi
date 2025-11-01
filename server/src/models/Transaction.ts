import { Transaction } from '../utils/types';

export class TransactionModel {
  private transactions: Transaction[] = [];

  getAll(): Transaction[] {
    return this.transactions;
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  getByPortfolioId(portfolioId: string): Transaction[] {
    return this.transactions
      .filter(t => t.portfolioId === portfolioId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getByFundId(fundId: string): Transaction[] {
    return this.transactions.filter(t => t.fundId === fundId);
  }

  create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }

  getByPortfolioAndFund(portfolioId: string, fundId: string): Transaction[] {
    return this.transactions.filter(
      t => t.portfolioId === portfolioId && t.fundId === fundId
    );
  }
}

