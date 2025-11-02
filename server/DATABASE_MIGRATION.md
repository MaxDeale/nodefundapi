# Database Migration Guide - In-Memory to SQLite/PostgreSQL

## ✅ What's Been Done

1. **Prisma Schema Created** - `prisma/schema.prisma` with all models
2. **Prisma Client Setup** - `src/lib/prisma.ts` singleton
3. **Models Updated** - All models now use Prisma (async methods)
4. **Seed Script** - `prisma/seed.ts` for initial data

## ⚠️ What Needs Updating

All services and controllers need to be updated to handle async operations since Prisma is async.

### Services That Need Updates:
- ✅ `fundService.ts` - Already updated
- ⚠️ `portfolioService.ts` - Needs async updates
- ⚠️ `transactionService.ts` - Needs async updates

### Controllers That Need Updates:
- ⚠️ All controllers need `async` keywords and `await` calls

## Quick Setup Steps

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create .env file
```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

### 3. Generate Prisma Client & Run Migrations
```bash
npm run db:generate
npm run db:migrate
```

### 4. Seed Database
```bash
npm run db:seed
```

### 5. Start Server
```bash
npm run dev
```

## Manual Updates Needed

Since models are now async, update these files:

### `portfolioService.ts`
Change all method calls to:
```typescript
// Before
const portfolio = this.portfolioModel.getById(id);

// After
const portfolio = await this.portfolioModel.getById(id);
```

And make methods `async`:
```typescript
// Before
getPortfolioById(id: string): Portfolio | null {

// After
async getPortfolioById(id: string): Promise<Portfolio | null> {
```

### `transactionService.ts`
Same pattern - add `async` and `await` to all model calls.

### All Controllers
Update route handlers to be async:
```typescript
// Before
getPortfolioById = (req: Request, res: Response) => {

// After
getPortfolioById = async (req: Request, res: Response) => {
```

## Testing

Once updated, test with:
1. `npm run db:studio` - Visual database browser
2. Check API endpoints work
3. Verify data persists across server restarts

## Switching to PostgreSQL

Just update `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

And `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/funds_db"
```

