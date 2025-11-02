import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.holding.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.fund.deleteMany();

  // Create funds
  const funds = await Promise.all([
    prisma.fund.create({
      data: {
        id: 'fund-1',
        name: 'Tech Growth ETF',
        symbol: 'TECH',
        price: 150.50,
        currency: 'USD',
        category: 'tech',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-2',
        name: 'Healthcare Innovation',
        symbol: 'HEALTH',
        price: 85.25,
        currency: 'USD',
        category: 'healthcare',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-3',
        name: 'Financial Services Fund',
        symbol: 'FIN',
        price: 120.75,
        currency: 'USD',
        category: 'finance',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-4',
        name: 'Clean Energy Fund',
        symbol: 'ENERGY',
        price: 65.30,
        currency: 'USD',
        category: 'energy',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-5',
        name: 'Consumer Staples ETF',
        symbol: 'CONSUMER',
        price: 95.80,
        currency: 'USD',
        category: 'consumer',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-6',
        name: 'Industrial Leaders',
        symbol: 'INDUST',
        price: 110.40,
        currency: 'USD',
        category: 'industrial',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-7',
        name: 'AI & Robotics Fund',
        symbol: 'AIROBO',
        price: 200.00,
        currency: 'USD',
        category: 'tech',
      },
    }),
    prisma.fund.create({
      data: {
        id: 'fund-8',
        name: 'Biotech Breakthrough',
        symbol: 'BIOTECH',
        price: 75.60,
        currency: 'USD',
        category: 'healthcare',
      },
    }),
  ]);

  console.log(`✅ Created ${funds.length} funds`);

  // Create portfolios with holdings
  const portfolio1 = await prisma.portfolio.create({
    data: {
      id: 'portfolio-1',
      userId: 'user-1',
      name: 'My Retirement Portfolio',
      holdings: {
        create: [
          {
            fundId: 'fund-1',
            quantity: 10,
            averagePurchasePrice: 145.00,
          },
          {
            fundId: 'fund-3',
            quantity: 5,
            averagePurchasePrice: 115.00,
          },
        ],
      },
      transactions: {
        create: [
          {
            fundId: 'fund-1',
            type: 'BUY',
            quantity: 10,
            price: 145.00,
            timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          {
            fundId: 'fund-3',
            type: 'BUY',
            quantity: 5,
            price: 115.00,
            timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  const portfolio2 = await prisma.portfolio.create({
    data: {
      id: 'portfolio-2',
      userId: 'user-1',
      name: 'Aggressive Growth',
      holdings: {
        create: [
          {
            fundId: 'fund-7',
            quantity: 3,
            averagePurchasePrice: 190.00,
          },
          {
            fundId: 'fund-1',
            quantity: 15,
            averagePurchasePrice: 148.00,
          },
        ],
      },
      transactions: {
        create: [
          {
            fundId: 'fund-7',
            type: 'BUY',
            quantity: 3,
            price: 190.00,
            timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          },
          {
            fundId: 'fund-1',
            type: 'BUY',
            quantity: 15,
            price: 148.00,
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  console.log(`✅ Created 2 portfolios with holdings and transactions`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

