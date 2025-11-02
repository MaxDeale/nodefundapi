import { Request, Response } from 'express';
import { PortfolioService } from '../services/portfolioService';

export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  createPortfolio = async (req: Request, res: Response) => {
    try {
      const { userId, name } = req.body;
      const portfolio = await this.portfolioService.createPortfolio(userId, name);
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create portfolio' });
    }
  };

  getPortfolioById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const portfolio = await this.portfolioService.getPortfolioById(id);

      if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
  };

  getAllPortfolios = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const portfolios = await this.portfolioService.getAllPortfolios(userId);
      res.json(portfolios);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
  };

  getPortfolioValue = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const value = await this.portfolioService.getPortfolioValue(id);

      if (!value) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json(value);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate portfolio value' });
    }
  };

  getPortfolioReturns = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const returns = await this.portfolioService.getPortfolioReturns(id);

      if (!returns) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json(returns);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate portfolio returns' });
    }
  };

  getPortfolioHistory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const history = await this.portfolioService.getPortfolioHistory(id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio history' });
    }
  };

  getTopHoldings = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const limit = parseInt(req.query.limit as string) || 5;
      
      const holdings = await this.portfolioService.getTopHoldings(id, limit);

      if (!holdings) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json(holdings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top holdings' });
    }
  };

  getPortfolioPerformance = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const performance = await this.portfolioService.getPortfolioPerformance(id);

      if (!performance) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.json(performance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate portfolio performance' });
    }
  };
}
