import { prisma } from '../lib/prisma';
import { Transaction } from '../utils/types';

export class TransactionModel {
  async getAll(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      orderBy: { timestamp: 'desc' },
    });
    return transactions.map(this.mapToTransaction);
  }

  async getById(id: string): Promise<Transaction | undefined> {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    return transaction ? this.mapToTransaction(transaction) : undefined;
  }

  async getByPortfolioId(portfolioId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { portfolioId },
      orderBy: { timestamp: 'desc' },
    });
    return transactions.map(this.mapToTransaction);
  }

  async getByFundId(fundId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { fundId },
      orderBy: { timestamp: 'desc' },
    });
    return transactions.map(this.mapToTransaction);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const created = await prisma.transaction.create({
      data: {
        id: transaction.id,
        portfolioId: transaction.portfolioId,
        fundId: transaction.fundId,
        type: transaction.type,
        quantity: transaction.quantity,
        price: transaction.price,
        timestamp: new Date(transaction.timestamp),
      },
    });
    return this.mapToTransaction(created);
  }

  async getByPortfolioAndFund(portfolioId: string, fundId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        portfolioId,
        fundId,
      },
      orderBy: { timestamp: 'desc' },
    });
    return transactions.map(this.mapToTransaction);
  }

  private mapToTransaction(dbTransaction: any): Transaction {
    return {
      id: dbTransaction.id,
      portfolioId: dbTransaction.portfolioId,
      fundId: dbTransaction.fundId,
      type: dbTransaction.type as 'BUY' | 'SELL',
      quantity: dbTransaction.quantity,
      price: dbTransaction.price,
      timestamp: dbTransaction.timestamp.toISOString(),
    };
  }
}
