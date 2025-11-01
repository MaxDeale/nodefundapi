import { Fund, FundCategory } from '../utils/types';

export class FundModel {
  private funds: Fund[] = [];

  getAll(): Fund[] {
    return this.funds;
  }

  getById(id: string): Fund | undefined {
    return this.funds.find(f => f.id === id);
  }

  getByCategory(category: FundCategory): Fund[] {
    return this.funds.filter(f => f.category === category);
  }

  create(fund: Fund): Fund {
    this.funds.push(fund);
    return fund;
  }

  updatePrice(id: string, newPrice: number): Fund | null {
    const fund = this.funds.find(f => f.id === id);
    if (fund) {
      fund.price = newPrice;
      return fund;
    }
    return null;
  }

  exists(id: string): boolean {
    return this.funds.some(f => f.id === id);
  }
}

