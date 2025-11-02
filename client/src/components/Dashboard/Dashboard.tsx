import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfoliosApi } from '../../services/api';
import type { Portfolio, PortfolioValue } from '../../types';
import PortfolioCard from '../PortfolioCard/PortfolioCard';
import './Dashboard.scss';

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<Record<string, PortfolioValue>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const portfoliosData = await portfoliosApi.getAll('user-1');
      setPortfolios(portfoliosData);

      // Load values for each portfolio
      const valuesPromises = portfoliosData.map(async (portfolio) => {
        const value = await portfoliosApi.getValue(portfolio.id);
        return { portfolioId: portfolio.id, value };
      });

      console.log("valuesPromises:", valuesPromises);

      const valuesResults = await Promise.all(valuesPromises);

      console.log("valuesResults", valuesResults);

      const valuesMap: Record<string, PortfolioValue> = {};
      valuesResults.forEach(({ portfolioId, value }) => {
        valuesMap[portfolioId] = value;
      });
      setPortfolioValues(valuesMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const totalValue = Object.values(portfolioValues).reduce(
    (sum, val) => sum + val.totalValue,
    0
  );
  const totalInvested = Object.values(portfolioValues).reduce(
    (sum, val) => sum + val.totalInvested,
    0
  );
  const totalReturn = totalValue - totalInvested;
  const totalReturnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <Link to="/portfolios/new" className="btn-primary">
          + New Portfolio
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">Total Portfolio Value</div>
          <div className="stat-value">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Invested</div>
          <div className="stat-value">${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className={`stat-card ${totalReturn >= 0 ? 'positive' : 'negative'}`}>
          <div className="stat-label">Total Return</div>
          <div className="stat-value">
            {totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="stat-percentage">
              ({totalReturnPercent >= 0 ? '+' : ''}{totalReturnPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-portfolios">
        <h2>Your Portfolios</h2>
        {portfolios.length === 0 ? (
          <div className="empty-state">
            <p>No portfolios yet. Create your first portfolio to get started!</p>
            <Link to="/portfolios/new" className="btn-primary">
              Create Portfolio
            </Link>
          </div>
        ) : (
          <div className="portfolios-grid">
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                value={portfolioValues[portfolio.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

