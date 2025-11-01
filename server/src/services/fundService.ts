import { FundModel } from '../models/Fund';
import { Fund, FundCategory } from '../utils/types';

export class FundService {
  constructor(private fundModel: FundModel) {}

  getAllFunds(category?: FundCategory): Fund[] {
    if (category) {
      return this.fundModel.getByCategory(category);
    }
    return this.fundModel.getAll();
  }

  getFundById(id: string): Fund | null {
    const fund = this.fundModel.getById(id);
    return fund || null;
  }

  fundExists(id: string): boolean {
    return this.fundModel.exists(id);
  }
}

