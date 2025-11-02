import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionService';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  createTransaction = async (req: Request, res: Response) => {
    try {
      const { portfolioId, fundId, type, quantity, price } = req.body;
      
      const result = await this.transactionService.createTransaction(
        portfolioId,
        fundId,
        type,
        quantity,
        price
      );

      if ('error' in result) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  };

  getTransactionsByPortfolio = async (req: Request, res: Response) => {
    try {
      const { portfolioId } = req.params;
      const transactions = await this.transactionService.getTransactionsByPortfolio(portfolioId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };

  getAllTransactions = (req: Request, res: Response) => {
    try {
      // This would typically require auth, but for practice we'll allow it
      res.status(501).json({ error: 'Not implemented - requires authentication' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };
}
