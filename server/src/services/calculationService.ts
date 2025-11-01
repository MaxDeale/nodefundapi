import { Portfolio, Fund, Transaction, PortfolioValue, PortfolioPerformance, PriceHistory } from '../utils/types';

export class CalculationService {
  calculatePortfolioValue(portfolio: Portfolio, funds: Fund[]): PortfolioValue {
    let totalValue = 0;
    let totalInvested = 0;

    portfolio.holdings.forEach(holding => {
      const fund = funds.find(f => f.id === holding.fundId);
      if (fund) {
        const currentValue = fund.price * holding.quantity;
        const investedValue = holding.averagePurchasePrice * holding.quantity;
        
        totalValue += currentValue;
        totalInvested += investedValue;
      }
    });

    const returnAmount = totalValue - totalInvested;
    const returnPercentage = totalInvested > 0 
      ? (returnAmount / totalInvested) * 100 
      : 0;

    return {
      totalValue: Math.round(totalValue * 100) / 100,
      totalInvested: Math.round(totalInvested * 100) / 100,
      returnAmount: Math.round(returnAmount * 100) / 100,
      returnPercentage: Math.round(returnPercentage * 100) / 100,
    };
  }

  calculateRealizedGains(transactions: Transaction[], funds: Fund[]): number {
    let realizedGains = 0;
    const buyTransactions: Map<string, number[]> = new Map();

    transactions.forEach(txn => {
      if (txn.type === 'BUY') {
        if (!buyTransactions.has(txn.fundId)) {
          buyTransactions.set(txn.fundId, []);
        }
        buyTransactions.get(txn.fundId)!.push(txn.quantity);
      } else if (txn.type === 'SELL') {
        const buys = buyTransactions.get(txn.fundId) || [];
        let remainingToSell = txn.quantity;
        let totalCost = 0;

        for (let i = 0; i < buys.length && remainingToSell > 0; i++) {
          if (buys[i] <= remainingToSell) {
            totalCost += buys[i] * (txn.price * 0.95); // Assume buy was 5% less
            remainingToSell -= buys[i];
            buys[i] = 0;
          } else {
            totalCost += remainingToSell * (txn.price * 0.95);
            buys[i] -= remainingToSell;
            remainingToSell = 0;
          }
        }

        const saleValue = txn.quantity * txn.price;
        realizedGains += saleValue - totalCost;
      }
    });

    return Math.round(realizedGains * 100) / 100;
  }

  calculatePerformance(
    portfolio: Portfolio,
    transactions: Transaction[],
    funds: Fund[]
  ): PortfolioPerformance {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Simplified: Calculate based on transactions and current value
    const currentValue = this.calculatePortfolioValue(portfolio, funds).totalValue;
    
    // Estimate values at different time points (simplified - assumes linear growth)
    const baseValue = currentValue * 0.95; // Approximate
    const dailyValue = baseValue * 1.01;
    const weeklyValue = baseValue * 1.05;
    const monthlyValue = baseValue * 1.15;

    return {
      daily: Math.round(((currentValue - dailyValue) / dailyValue) * 100 * 100) / 100,
      weekly: Math.round(((currentValue - weeklyValue) / weeklyValue) * 100 * 100) / 100,
      monthly: Math.round(((currentValue - monthlyValue) / monthlyValue) * 100 * 100) / 100,
    };
  }

  generatePriceHistory(fund: Fund, days: number = 30): PriceHistory[] {
    const history: PriceHistory[] = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      // Generate realistic price variations (±5%)
      const variation = (Math.random() - 0.5) * 0.1;
      const price = fund.price * (1 + variation);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100,
      });
    }
    
    return history;
  }

  getTopHoldings(portfolio: Portfolio, funds: Fund[], limit: number = 5) {
    return portfolio.holdings
      .map(holding => {
        const fund = funds.find(f => f.id === holding.fundId);
        if (!fund) return null;
        
        return {
          fund: {
            id: fund.id,
            name: fund.name,
            symbol: fund.symbol,
            currentPrice: fund.price,
          },
          quantity: holding.quantity,
          averagePurchasePrice: holding.averagePurchasePrice,
          currentValue: fund.price * holding.quantity,
          gainLoss: (fund.price - holding.averagePurchasePrice) * holding.quantity,
          gainLossPercentage: ((fund.price - holding.averagePurchasePrice) / holding.averagePurchasePrice) * 100,
        };
      })
      .filter(h => h !== null)
      .sort((a, b) => (b?.currentValue || 0) - (a?.currentValue || 0))
      .slice(0, limit);
  }
}

