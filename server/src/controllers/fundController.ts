import { Request, Response } from 'express';
import { FundService } from '../services/fundService';
import { CalculationService } from '../services/calculationService';

export class FundController {
  private calculationService: CalculationService;

  constructor(private fundService: FundService) {
    this.calculationService = new CalculationService();
  }

  getAllFunds = (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const funds = this.fundService.getAllFunds(category as any);
      res.json(funds);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch funds' });
    }
  };

  getFundById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const fund = this.fundService.getFundById(id);

      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }

      res.json(fund);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fund' });
    }
  };

  getPriceHistory = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const days = parseInt(req.query.days as string) || 30;
      
      const fund = this.fundService.getFundById(id);
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }

      const history = this.calculationService.generatePriceHistory(fund, days);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price history' });
    }
  };
}

