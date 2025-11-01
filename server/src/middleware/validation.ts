import { Request, Response, NextFunction } from 'express';

export const validateCreatePortfolio = (req: Request, res: Response, next: NextFunction) => {
  const { userId, name } = req.body;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId is required and must be a string' });
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }

  next();
};

export const validateCreateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { portfolioId, fundId, type, quantity, price } = req.body;

  if (!portfolioId || typeof portfolioId !== 'string') {
    return res.status(400).json({ error: 'portfolioId is required and must be a string' });
  }

  if (!fundId || typeof fundId !== 'string') {
    return res.status(400).json({ error: 'fundId is required and must be a string' });
  }

  if (!type || (type !== 'BUY' && type !== 'SELL')) {
    return res.status(400).json({ error: 'type is required and must be either BUY or SELL' });
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'quantity is required and must be a positive number' });
  }

  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({ error: 'price must be a positive number if provided' });
  }

  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  next();
};

