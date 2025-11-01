import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { validateCreateTransaction } from '../middleware/validation';

export function createTransactionRoutes(transactionController: TransactionController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/transactions:
   *   post:
   *     summary: Create a buy or sell transaction
   *     tags: [Transactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTransactionRequest'
   *     responses:
   *       201:
   *         description: Transaction created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   *       400:
   *         description: Invalid request or validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *     examples:
   *       buy:
   *         value:
   *           portfolioId: "portfolio-1"
   *           fundId: "fund-1"
   *           type: "BUY"
   *           quantity: 10
   *       sell:
   *         value:
   *           portfolioId: "portfolio-1"
   *           fundId: "fund-1"
   *           type: "SELL"
   *           quantity: 5
   */
  router.post('/', validateCreateTransaction, transactionController.createTransaction);

  /**
   * @swagger
   * /api/transactions/portfolio/{portfolioId}:
   *   get:
   *     summary: Get all transactions for a portfolio
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: portfolioId
   *         required: true
   *         schema:
   *           type: string
   *         description: Portfolio ID
   *     responses:
   *       200:
   *         description: List of transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Transaction'
   */
  router.get('/portfolio/:portfolioId', transactionController.getTransactionsByPortfolio);

  /**
   * @swagger
   * /api/transactions:
   *   get:
   *     summary: Get all transactions (Not Implemented)
   *     tags: [Transactions]
   *     responses:
   *       501:
   *         description: Not implemented - requires authentication
   */
  router.get('/', transactionController.getAllTransactions);

  return router;
}

