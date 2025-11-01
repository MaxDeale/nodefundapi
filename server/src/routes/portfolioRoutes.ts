import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolioController';
import { validateId, validateCreatePortfolio } from '../middleware/validation';

export function createPortfolioRoutes(portfolioController: PortfolioController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/portfolios:
   *   post:
   *     summary: Create a new portfolio
   *     tags: [Portfolios]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePortfolioRequest'
   *     responses:
   *       201:
   *         description: Portfolio created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Portfolio'
   *       400:
   *         description: Invalid request body
   */
  router.post('/', validateCreatePortfolio, portfolioController.createPortfolio);

  /**
   * @swagger
   * /api/portfolios:
   *   get:
   *     summary: List all portfolios
   *     tags: [Portfolios]
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: string
   *         description: Filter portfolios by user ID
   *     responses:
   *       200:
   *         description: List of portfolios
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Portfolio'
   */
  router.get('/', portfolioController.getAllPortfolios);

  /**
   * @swagger
   * /api/portfolios/{id}:
   *   get:
   *     summary: Get portfolio details by ID
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Portfolio details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Portfolio'
   *       404:
   *         description: Portfolio not found
   */
  router.get('/:id', validateId, portfolioController.getPortfolioById);

  /**
   * @swagger
   * /api/portfolios/{id}/value:
   *   get:
   *     summary: Get total portfolio value and returns
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Portfolio value information
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PortfolioValue'
   *       404:
   *         description: Portfolio not found
   */
  router.get('/:id/value', validateId, portfolioController.getPortfolioValue);

  /**
   * @swagger
   * /api/portfolios/{id}/returns:
   *   get:
   *     summary: Get portfolio return percentage and amount
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Portfolio returns
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 returnPercentage:
   *                   type: number
   *                 returnAmount:
   *                   type: number
   *       404:
   *         description: Portfolio not found
   */
  router.get('/:id/returns', validateId, portfolioController.getPortfolioReturns);

  /**
   * @swagger
   * /api/portfolios/{id}/history:
   *   get:
   *     summary: Get transaction history for a portfolio
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of transactions (sorted by date, newest first)
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Transaction'
   */
  router.get('/:id/history', validateId, portfolioController.getPortfolioHistory);

  /**
   * @swagger
   * /api/portfolios/{id}/top-holdings:
   *   get:
   *     summary: Get top holdings by current value
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 5
   *         description: Maximum number of holdings to return
   *     responses:
   *       200:
   *         description: Top holdings sorted by value
   *       404:
   *         description: Portfolio not found
   */
  router.get('/:id/top-holdings', validateId, portfolioController.getTopHoldings);

  /**
   * @swagger
   * /api/portfolios/{id}/performance:
   *   get:
   *     summary: Get portfolio performance breakdown
   *     tags: [Portfolios]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Performance metrics
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 daily:
   *                   type: number
   *                   description: Daily return percentage
   *                 weekly:
   *                   type: number
   *                   description: Weekly return percentage
   *                 monthly:
   *                   type: number
   *                   description: Monthly return percentage
   *       404:
   *         description: Portfolio not found
   */
  router.get('/:id/performance', validateId, portfolioController.getPortfolioPerformance);

  return router;
}

