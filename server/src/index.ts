import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { FundModel } from './models/Fund';
import { PortfolioModel } from './models/Portfolio';
import { TransactionModel } from './models/Transaction';
import { FundService } from './services/fundService';
import { PortfolioService } from './services/portfolioService';
import { TransactionService } from './services/transactionService';
import { FundController } from './controllers/fundController';
import { PortfolioController } from './controllers/portfolioController';
import { TransactionController } from './controllers/transactionController';
import { createFundRoutes } from './routes/fundRoutes';
import { createPortfolioRoutes } from './routes/portfolioRoutes';
import { createTransactionRoutes } from './routes/transactionRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { initialFunds, initialPortfolios, initialTransactions } from './data/mockData';
import { swaggerSpec } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Funds API Documentation',
}));

// Initialize models with mock data
const fundModel = new FundModel();
const portfolioModel = new PortfolioModel();
const transactionModel = new TransactionModel();

// Seed initial data
initialFunds.forEach(fund => fundModel.create(fund));
initialPortfolios.forEach(portfolio => portfolioModel.create(portfolio));
initialTransactions.forEach(txn => transactionModel.create(txn));

// Initialize services
const fundService = new FundService(fundModel);
const portfolioService = new PortfolioService(portfolioModel, transactionModel, fundModel);
const transactionService = new TransactionService(
  transactionModel,
  portfolioModel,
  fundModel,
  portfolioService
);

// Initialize controllers
const fundController = new FundController(fundService);
const portfolioController = new PortfolioController(portfolioService);
const transactionController = new TransactionController(transactionService);

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Funds API - Investment Dashboard',
    version: '1.0.0',
    description: 'RESTful API for managing investment portfolios, funds, and transactions',
    endpoints: {
      funds: {
        base: '/api/funds',
        routes: [
          'GET /api/funds - List all funds (?category=tech for filtering)',
          'GET /api/funds/:id - Get fund details',
          'GET /api/funds/:id/price-history - Get price history (?days=30)'
        ]
      },
      portfolios: {
        base: '/api/portfolios',
        routes: [
          'POST /api/portfolios - Create a new portfolio',
          'GET /api/portfolios - List all portfolios (?userId=user-1)',
          'GET /api/portfolios/:id - Get portfolio details',
          'GET /api/portfolios/:id/value - Get total portfolio value',
          'GET /api/portfolios/:id/returns - Get portfolio return percentage',
          'GET /api/portfolios/:id/history - Get transaction history',
          'GET /api/portfolios/:id/top-holdings - Get top holdings (?limit=5)',
          'GET /api/portfolios/:id/performance - Get performance breakdown'
        ]
      },
      transactions: {
        base: '/api/transactions',
        routes: [
          'POST /api/transactions - Create a buy/sell transaction',
          'GET /api/transactions/portfolio/:portfolioId - Get transactions for portfolio'
        ]
      },
      health: {
        base: '/health',
        route: 'GET /health - Server health check'
      }
    }
  });
});

// Routes
app.use('/api/funds', createFundRoutes(fundController));
app.use('/api/portfolios', createPortfolioRoutes(portfolioController));
app.use('/api/transactions', createTransactionRoutes(transactionController));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Funds API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 API base: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});

