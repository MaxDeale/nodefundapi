import { FundModel } from '../models/Fund';
import { Fund, FundCategory } from '../utils/types';

export class FundService {
  constructor(private fundModel: FundModel) {}

  async getAllFunds(category?: FundCategory): Promise<Fund[]> {
    if (category) {
      return await this.fundModel.getByCategory(category);
    }
    return await this.fundModel.getAll();
  }

  async getFundById(id: string): Promise<Fund | null> {
    const fund = await this.fundModel.getById(id);
    return fund || null;
  }

  async fundExists(id: string): Promise<boolean> {
    return await this.fundModel.exists(id);
  }
}

