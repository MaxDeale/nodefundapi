# Funds API - Investment Dashboard

A RESTful API for managing investment portfolios, funds, and transactions. Built with TypeScript, Express, and Node.js for practicing fintech backend development and technical assessments.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The API will be available at `http://localhost:3000`

4. **Access Swagger UI** (Interactive API Testing):
   - Open `http://localhost:3000/api-docs` in your browser
   - This provides a beautiful, interactive interface to test all endpoints
   - No need for Postman or cURL - test directly from your browser!

## 📚 API Documentation & Testing

### Swagger UI (Interactive Testing)
Visit **`http://localhost:3000/api-docs`** for a complete interactive API documentation and testing interface. You can:
- See all available endpoints
- View request/response schemas
- Test endpoints directly in the browser
- See example requests and responses

### API Endpoints

### Health Check
- `GET /health` - Server health status

### Funds
- `GET /api/funds` - List all funds (optional: `?category=tech`)
- `GET /api/funds/:id` - Get fund details
- `GET /api/funds/:id/price-history` - Get price history (optional: `?days=30`)

### Portfolios
- `POST /api/portfolios` - Create a new portfolio
  ```json
  {
    "userId": "user-1",
    "name": "My Portfolio"
  }
  ```
- `GET /api/portfolios` - List all portfolios (optional: `?userId=user-1`)
- `GET /api/portfolios/:id` - Get portfolio details
- `GET /api/portfolios/:id/value` - Get total portfolio value
- `GET /api/portfolios/:id/returns` - Get portfolio return percentage
- `GET /api/portfolios/:id/history` - Get transaction history
- `GET /api/portfolios/:id/top-holdings` - Get top holdings (optional: `?limit=5`)
- `GET /api/portfolios/:id/performance` - Get daily/weekly/monthly performance

### Transactions
- `POST /api/transactions` - Create a buy/sell transaction
  ```json
  {
    "portfolioId": "portfolio-1",
    "fundId": "fund-1",
    "type": "BUY",
    "quantity": 10,
    "price": 150.50
  }
  ```
- `GET /api/transactions/portfolio/:portfolioId` - Get all transactions for a portfolio

## 🎯 Technical Assessment Tasks

Use these tasks to practice for fintech coding interviews. Complete them in order and test your solutions thoroughly.

### Phase 1: Basic CRUD (30-45 minutes)

#### Task 1: List All Funds
**Endpoint**: `GET /api/funds`  
**Goal**: Return all available funds  
**Test**: Verify all 8 initial funds are returned

#### Task 2: Create Portfolio
**Endpoint**: `POST /api/portfolios`  
**Goal**: Create a new portfolio for a user  
**Test**: Create portfolio, then GET it by ID to verify

#### Task 3: Get Portfolio Details
**Endpoint**: `GET /api/portfolios/:id`  
**Goal**: Return portfolio with all holdings  
**Test**: Use existing `portfolio-1` or create new one

#### Task 4: Create Transaction
**Endpoint**: `POST /api/transactions`  
**Goal**: Record a BUY or SELL transaction  
**Test**: 
- Buy 5 shares of `fund-1` in `portfolio-1`
- Verify holdings updated correctly

### Phase 2: Business Logic (45-60 minutes)

#### Task 5: Calculate Portfolio Value
**Endpoint**: `GET /api/portfolios/:id/value`  
**Goal**: Calculate total current value  
**Formula**: Sum of (current_price × quantity) for all holdings  
**Test**: 
- Check `portfolio-1` value
- Manually verify: `(150.50 × 10) + (120.75 × 5) = 2,103.75`

#### Task 6: Calculate Returns
**Endpoint**: `GET /api/portfolios/:id/returns`  
**Goal**: Calculate return percentage  
**Formula**: `((current_value - invested_value) / invested_value) × 100`  
**Test**: Verify returns are calculated correctly

#### Task 7: Transaction Validation
**Goal**: Add validation to transaction creation  
**Requirements**:
- Can't sell more shares than owned
- Quantity must be positive
- Price must match current fund price (within 1% tolerance)
**Test**: 
- Try selling 100 shares when you only own 10
- Try negative quantity
- Try price 10% different from current

### Phase 3: Aggregations & Queries (30-45 minutes)

#### Task 8: Filter Funds by Category
**Endpoint**: `GET /api/funds?category=tech`  
**Goal**: Filter funds by category  
**Test**: 
- Filter by `tech` category
- Filter by `healthcare` category
- Should return only matching funds

#### Task 9: Portfolio Transaction History
**Endpoint**: `GET /api/portfolios/:id/history`  
**Goal**: Get all transactions sorted by date (newest first)  
**Test**: Verify transactions are in correct order

#### Task 10: Top Holdings
**Endpoint**: `GET /api/portfolios/:id/top-holdings?limit=5`  
**Goal**: Get top N holdings by current value  
**Test**: 
- Request top 3 holdings
- Verify sorted by value descending
- Check each includes: fund info, quantity, value, gain/loss

### Phase 4: Error Handling & Edge Cases (20-30 minutes)

#### Task 11: Error Handling
**Goal**: Add proper error responses  
**Test Cases**:
- GET fund with invalid ID → 404
- GET portfolio with invalid ID → 404
- Sell more shares than owned → 400 with clear message

#### Task 12: Input Validation
**Goal**: Validate all request inputs  
**Test Cases**:
- Missing required fields → 400
- Wrong data types → 400
- Empty strings → 400

#### Task 13: Concurrent Transactions
**Goal**: Prevent overselling (optional - advanced)  
**Challenge**: Handle race condition where user sells same shares twice  
**Hint**: Check holdings before and after transaction

### Phase 5: Advanced Features (45-60 minutes)

#### Task 14: Performance Breakdown
**Endpoint**: `GET /api/portfolios/:id/performance`  
**Goal**: Calculate daily/weekly/monthly performance  
**Test**: Verify percentage calculations are reasonable

#### Task 15: Price History
**Endpoint**: `GET /api/funds/:id/price-history?days=30`  
**Goal**: Generate mock price history  
**Test**: 
- Request 30 days of history
- Verify dates are sequential
- Check prices vary realistically

#### Task 16: Realized vs Unrealized Gains
**Goal**: Calculate both gain types  
**Definitions**:
- **Realized**: Profit/loss from completed SELL transactions
- **Unrealized**: Current value vs purchase price for remaining holdings  
**Challenge**: Extend `/api/portfolios/:id/value` to include breakdown

## 🧪 Testing Your Work

### Using cURL

```bash
# Get all funds
curl http://localhost:3000/api/funds

# Create portfolio
curl -X POST http://localhost:3000/api/portfolios \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-1","name":"Test Portfolio"}'

# Get portfolio value
curl http://localhost:3000/api/portfolios/portfolio-1/value

# Create transaction
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"portfolioId":"portfolio-1","fundId":"fund-1","type":"BUY","quantity":5}'
```

### Using Postman/Thunder Client
Import the endpoints above and test interactively.

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers
├── models/          # Data models (in-memory storage)
├── routes/          # Express route definitions
├── services/        # Business logic layer
├── middleware/      # Validation & error handling
├── utils/           # Types & helpers
├── data/            # Mock data initialization
└── index.ts         # Application entry point
```

## 🎓 Learning Objectives

By completing these tasks, you'll practice:
- ✅ RESTful API design
- ✅ TypeScript with Express
- ✅ Business logic implementation
- ✅ Data aggregation & calculations
- ✅ Error handling & validation
- ✅ Financial calculations (returns, gains)
- ✅ Working with complex data relationships
- ✅ Edge case handling

## 💡 Tips for Technical Assessments

1. **Start Simple**: Get basic CRUD working first
2. **Test Thoroughly**: Use edge cases (empty portfolios, zero quantities)
3. **Clean Code**: Write readable, maintainable code
4. **Error Messages**: Provide clear, helpful error messages
5. **Documentation**: Comment complex calculations
6. **Time Management**: Don't over-engineer early tasks

## 🔧 Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript (after build)

## 📝 Notes

- This uses in-memory storage (arrays). Data resets on server restart.
- In production, you'd use a database (PostgreSQL, MongoDB, etc.)
- Authentication is not implemented (for simplicity)
- Price validation has 1% tolerance for flexibility

## 🚦 Next Steps After Completing Tasks

1. Add unit tests using Jest
2. Add a database (PostgreSQL)
3. Implement authentication/authorization
4. Add rate limiting
5. Add request logging
6. Implement pagination for large datasets
7. Add GraphQL endpoint (optional)

Good luck with your practice! 🎯

