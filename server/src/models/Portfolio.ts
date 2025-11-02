import { prisma } from '../lib/prisma';
import { Portfolio, Holding } from '../utils/types';

export class PortfolioModel {
  async getAll(): Promise<Portfolio[]> {
    const portfolios = await prisma.portfolio.findMany({
      include: { holdings: true },
      orderBy: { createdAt: 'desc' },
    });
    return portfolios.map(this.mapToPortfolio);
  }

  async getById(id: string): Promise<Portfolio | undefined> {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: { holdings: true },
    });
    return portfolio ? this.mapToPortfolio(portfolio) : undefined;
  }

  async getByUserId(userId: string): Promise<Portfolio[]> {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: { holdings: true },
      orderBy: { createdAt: 'desc' },
    });
    return portfolios.map(this.mapToPortfolio);
  }

  async create(portfolio: Portfolio): Promise<Portfolio> {
    const created = await prisma.portfolio.create({
      data: {
        id: portfolio.id,
        userId: portfolio.userId,
        name: portfolio.name,
        createdAt: new Date(portfolio.createdAt),
        holdings: {
          create: portfolio.holdings.map(h => ({
            fundId: h.fundId,
            quantity: h.quantity,
            averagePurchasePrice: h.averagePurchasePrice,
          })),
        },
      },
      include: { holdings: true },
    });
    return this.mapToPortfolio(created);
  }

  async update(id: string, updates: Partial<Portfolio>): Promise<Portfolio | null> {
    const data: any = {};
    if (updates.name) data.name = updates.name;
    if (updates.userId) data.userId = updates.userId;

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data,
      include: { holdings: true },
    });
    return portfolio ? this.mapToPortfolio(portfolio) : null;
  }

  async updateHoldings(id: string, holdings: Holding[]): Promise<Portfolio | null> {
    // Delete existing holdings
    await prisma.holding.deleteMany({
      where: { portfolioId: id },
    });

    // Create new holdings
    if (holdings.length > 0) {
      await prisma.holding.createMany({
        data: holdings.map(h => ({
          portfolioId: id,
          fundId: h.fundId,
          quantity: h.quantity,
          averagePurchasePrice: h.averagePurchasePrice,
        })),
      });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: { holdings: true },
    });
    return portfolio ? this.mapToPortfolio(portfolio) : null;
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.portfolio.count({
      where: { id },
    });
    return count > 0;
  }

  private mapToPortfolio(dbPortfolio: any): Portfolio {
    return {
      id: dbPortfolio.id,
      userId: dbPortfolio.userId,
      name: dbPortfolio.name,
      holdings: dbPortfolio.holdings.map((h: any) => ({
        fundId: h.fundId,
        quantity: h.quantity,
        averagePurchasePrice: h.averagePurchasePrice,
      })),
      createdAt: dbPortfolio.createdAt.toISOString(),
    };
  }
}
