import { Router } from 'express';
import { FundController } from '../controllers/fundController';
import { validateId } from '../middleware/validation';

export function createFundRoutes(fundController: FundController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/funds:
   *   get:
   *     summary: List all available funds
   *     tags: [Funds]
   *     parameters:
   *       - in: query
   *         name: category
   *         schema:
   *           type: string
   *           enum: [tech, healthcare, finance, energy, consumer, industrial]
   *         description: Filter funds by category
   *     responses:
   *       200:
   *         description: List of all funds
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Fund'
   */
  router.get('/', fundController.getAllFunds);

  /**
   * @swagger
   * /api/funds/{id}:
   *   get:
   *     summary: Get fund details by ID
   *     tags: [Funds]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Fund ID
   *     responses:
   *       200:
   *         description: Fund details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Fund'
   *       404:
   *         description: Fund not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/:id', validateId, fundController.getFundById);

  /**
   * @swagger
   * /api/funds/{id}/price-history:
   *   get:
   *     summary: Get price history for a fund
   *     tags: [Funds]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Fund ID
   *       - in: query
   *         name: days
   *         schema:
   *           type: integer
   *           default: 30
   *         description: Number of days of history to retrieve
   *     responses:
   *       200:
   *         description: Price history data
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   date:
   *                     type: string
   *                     format: date
   *                   price:
   *                     type: number
   *       404:
   *         description: Fund not found
   */
  router.get('/:id/price-history', validateId, fundController.getPriceHistory);

  return router;
}

