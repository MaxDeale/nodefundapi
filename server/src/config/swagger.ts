import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Funds API - Investment Dashboard',
    version: '1.0.0',
    description: 'RESTful API for managing investment portfolios, funds, and transactions. Built for fintech technical assessment practice.',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Fund: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique fund identifier',
            example: 'fund-1',
          },
          name: {
            type: 'string',
            description: 'Fund name',
            example: 'Tech Growth ETF',
          },
          symbol: {
            type: 'string',
            description: 'Fund ticker symbol',
            example: 'TECH',
          },
          price: {
            type: 'number',
            description: 'Current price per share',
            example: 150.50,
          },
          currency: {
            type: 'string',
            description: 'Currency code',
            example: 'USD',
          },
          category: {
            type: 'string',
            enum: ['tech', 'healthcare', 'finance', 'energy', 'consumer', 'industrial'],
            description: 'Fund category',
            example: 'tech',
          },
        },
        required: ['id', 'name', 'symbol', 'price', 'currency', 'category'],
      },
      Portfolio: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'portfolio-1',
          },
          userId: {
            type: 'string',
            example: 'user-1',
          },
          name: {
            type: 'string',
            example: 'My Retirement Portfolio',
          },
          holdings: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Holding',
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-01-01T00:00:00.000Z',
          },
        },
        required: ['id', 'userId', 'name', 'holdings', 'createdAt'],
      },
      Holding: {
        type: 'object',
        properties: {
          fundId: {
            type: 'string',
            example: 'fund-1',
          },
          quantity: {
            type: 'number',
            example: 10,
          },
          averagePurchasePrice: {
            type: 'number',
            example: 145.00,
          },
        },
        required: ['fundId', 'quantity', 'averagePurchasePrice'],
      },
      Transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'txn-1',
          },
          portfolioId: {
            type: 'string',
            example: 'portfolio-1',
          },
          fundId: {
            type: 'string',
            example: 'fund-1',
          },
          type: {
            type: 'string',
            enum: ['BUY', 'SELL'],
            example: 'BUY',
          },
          quantity: {
            type: 'number',
            example: 10,
          },
          price: {
            type: 'number',
            example: 150.50,
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2024-01-01T00:00:00.000Z',
          },
        },
        required: ['id', 'portfolioId', 'fundId', 'type', 'quantity', 'price', 'timestamp'],
      },
      PortfolioValue: {
        type: 'object',
        properties: {
          totalValue: {
            type: 'number',
            description: 'Total current value of portfolio',
            example: 2103.75,
          },
          totalInvested: {
            type: 'number',
            description: 'Total amount invested',
            example: 1975.00,
          },
          returnAmount: {
            type: 'number',
            description: 'Absolute return amount',
            example: 128.75,
          },
          returnPercentage: {
            type: 'number',
            description: 'Return percentage',
            example: 6.52,
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Portfolio not found',
          },
          message: {
            type: 'string',
            example: 'Additional error details',
          },
        },
      },
      CreatePortfolioRequest: {
        type: 'object',
        required: ['userId', 'name'],
        properties: {
          userId: {
            type: 'string',
            example: 'user-1',
          },
          name: {
            type: 'string',
            example: 'My New Portfolio',
          },
        },
      },
      CreateTransactionRequest: {
        type: 'object',
        required: ['portfolioId', 'fundId', 'type', 'quantity'],
        properties: {
          portfolioId: {
            type: 'string',
            example: 'portfolio-1',
          },
          fundId: {
            type: 'string',
            example: 'fund-1',
          },
          type: {
            type: 'string',
            enum: ['BUY', 'SELL'],
            example: 'BUY',
          },
          quantity: {
            type: 'number',
            minimum: 0.01,
            example: 10,
          },
          price: {
            type: 'number',
            description: 'Optional: Transaction price (defaults to current fund price)',
            example: 150.50,
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Funds',
      description: 'Fund management endpoints',
    },
    {
      name: 'Portfolios',
      description: 'Portfolio management endpoints',
    },
    {
      name: 'Transactions',
      description: 'Transaction management endpoints',
    },
    {
      name: 'Health',
      description: 'Server health check',
    },
  ],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

