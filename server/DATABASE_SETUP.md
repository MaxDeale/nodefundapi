# Database Setup Guide

This project uses **Prisma** with **SQLite** for easy setup (no database server needed).

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a `.env` file in the `server` directory:
```env
DATABASE_URL="file:./dev.db"
```

### 3. Generate Prisma Client & Create Database
```bash
npm run db:generate
npm run db:migrate
```

### 4. Seed Database (Optional)
```bash
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

## Database Commands

- `npm run db:migrate` - Create and run migrations
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio (visual database browser)
- `npm run db:seed` - Seed database with initial data

## Switching to PostgreSQL

If you want to use PostgreSQL instead of SQLite:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/funds_db?schema=public"
```

3. Install PostgreSQL and create database:
```bash
createdb funds_db
```

4. Run migrations:
```bash
npm run db:migrate
```

## Prisma Studio

View and edit your database visually:
```bash
npm run db:studio
```

Opens at `http://localhost:5555`

## File Structure

- `prisma/schema.prisma` - Database schema definition
- `prisma/dev.db` - SQLite database file (auto-created)
- `prisma/migrations/` - Migration history
- `src/lib/prisma.ts` - Prisma client singleton

## Next Steps

The models have been converted to use Prisma. Your existing API endpoints should work the same way, but now with persistent storage!

