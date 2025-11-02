import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfoliosApi, fundsApi } from '../../services/api';
import type { Portfolio, PortfolioValue, Fund, Transaction } from '../../types';
import TransactionForm from '../TransactionForm/TransactionForm';
import './PortfolioDetail.scss';

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [funds, setFunds] = useState<Record<string, Fund>>({});
  const [value, setValue] = useState<PortfolioValue | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  useEffect(() => {
    if (id) {
      loadPortfolio();
    }
  }, [id]);

  const loadPortfolio = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [portfolioData, valueData, transactionsData] = await Promise.all([
        portfoliosApi.getById(id),
        portfoliosApi.getValue(id),
        portfoliosApi.getHistory(id),
      ]);

      setPortfolio(portfolioData);
      setValue(valueData);
      setTransactions(transactionsData);

      // Load fund details for all holdings
      const fundIds = portfolioData.holdings.map((h) => h.fundId);
      const fundsPromises = fundIds.map(async (fundId) => {
        const fund = await fundsApi.getById(fundId);
        return { fundId, fund };
      });

      const fundsResults = await Promise.all(fundsPromises);
      const fundsMap: Record<string, Fund> = {};
      fundsResults.forEach(({ fundId, fund }) => {
        fundsMap[fundId] = fund;
      });
      setFunds(fundsMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionCreated = () => {
    setShowTransactionForm(false);
    loadPortfolio();
  };

  if (loading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  if (error || !portfolio) {
    return (
      <div className="error">
        {error || 'Portfolio not found'}
        <Link to="/portfolios" className="btn-secondary">
          Back to Portfolios
        </Link>
      </div>
    );
  }

  return (
    <div className="portfolio-detail">
      <div className="detail-header">
        <div>
          <Link to="/portfolios" className="back-link">← Back to Portfolios</Link>
          <h1>{portfolio.name}</h1>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowTransactionForm(!showTransactionForm)}
        >
          {showTransactionForm ? 'Cancel' : '+ New Transaction'}
        </button>
      </div>

      {showTransactionForm && id && (
        <TransactionForm
          portfolioId={id}
          onSuccess={handleTransactionCreated}
          onCancel={() => setShowTransactionForm(false)}
        />
      )}

      {value && (
        <div className="value-summary">
          <div className="value-card">
            <div className="value-label">Total Value</div>
            <div className="value-amount">${value.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="value-card">
            <div className="value-label">Invested</div>
            <div className="value-amount">${value.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className={`value-card ${value.returnAmount >= 0 ? 'positive' : 'negative'}`}>
            <div className="value-label">Return</div>
            <div className="value-amount">
              {value.returnAmount >= 0 ? '+' : ''}${value.returnAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="value-percentage">
                ({value.returnPercentage >= 0 ? '+' : ''}{value.returnPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="holdings-section">
        <h2>Holdings</h2>
        {portfolio.holdings.length === 0 ? (
          <div className="empty-state">
            <p>No holdings yet. Create a transaction to add funds to this portfolio.</p>
          </div>
        ) : (
          <div className="holdings-table">
            <table>
              <thead>
                <tr>
                  <th>Fund</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Avg. Price</th>
                  <th>Current Price</th>
                  <th>Value</th>
                  <th>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => {
                  const fund = funds[holding.fundId];
                  if (!fund) return null;

                  const currentValue = fund.price * holding.quantity;
                  const investedValue = holding.averagePurchasePrice * holding.quantity;
                  const gainLoss = currentValue - investedValue;
                  const gainLossPercent = ((fund.price - holding.averagePurchasePrice) / holding.averagePurchasePrice) * 100;

                  return (
                    <tr key={holding.fundId}>
                      <td>{fund.name}</td>
                      <td>{fund.symbol}</td>
                      <td>{holding.quantity}</td>
                      <td>${holding.averagePurchasePrice.toFixed(2)}</td>
                      <td>${fund.price.toFixed(2)}</td>
                      <td>${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className={gainLoss >= 0 ? 'positive' : 'negative'}>
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="transactions-section">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet.</p>
          </div>
        ) : (
          <div className="transactions-list">
            {transactions.map((txn) => (
              <div key={txn.id} className="transaction-item">
                <div className="transaction-type">
                  <span className={`type-badge ${txn.type.toLowerCase()}`}>{txn.type}</span>
                </div>
                <div className="transaction-details">
                  <div className="transaction-fund">
                    Fund ID: {txn.fundId}
                  </div>
                  <div className="transaction-meta">
                    {txn.quantity} shares @ ${txn.price.toFixed(2)}
                  </div>
                </div>
                <div className="transaction-date">
                  {new Date(txn.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDetail;

