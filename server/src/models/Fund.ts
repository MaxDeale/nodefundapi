import { prisma } from '../lib/prisma';
import { Fund, FundCategory } from '../utils/types';

export class FundModel {
  async getAll(): Promise<Fund[]> {
    const funds = await prisma.fund.findMany({
      orderBy: { name: 'asc' },
    });
    return funds.map(this.mapToFund);
  }

  async getById(id: string): Promise<Fund | undefined> {
    const fund = await prisma.fund.findUnique({
      where: { id },
    });
    return fund ? this.mapToFund(fund) : undefined;
  }

  async getByCategory(category: FundCategory): Promise<Fund[]> {
    const funds = await prisma.fund.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
    return funds.map(this.mapToFund);
  }

  async create(fund: Fund): Promise<Fund> {
    const created = await prisma.fund.create({
      data: {
        id: fund.id,
        name: fund.name,
        symbol: fund.symbol,
        price: fund.price,
        currency: fund.currency,
        category: fund.category,
      },
    });
    return this.mapToFund(created);
  }

  async updatePrice(id: string, newPrice: number): Promise<Fund | null> {
    const fund = await prisma.fund.update({
      where: { id },
      data: { price: newPrice },
    });
    return fund ? this.mapToFund(fund) : null;
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.fund.count({
      where: { id },
    });
    return count > 0;
  }

  private mapToFund(dbFund: any): Fund {
    return {
      id: dbFund.id,
      name: dbFund.name,
      symbol: dbFund.symbol,
      price: dbFund.price,
      currency: dbFund.currency,
      category: dbFund.category as FundCategory,
    };
  }
}
