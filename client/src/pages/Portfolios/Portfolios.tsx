import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfoliosApi } from '../../services/api';
import type { Portfolio, PortfolioValue } from '../../types';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import './Portfolios.scss';

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<Record<string, PortfolioValue>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const portfoliosData = await portfoliosApi.getAll('user-1');
      setPortfolios(portfoliosData);

      // Load values for each portfolio
      const valuesPromises = portfoliosData.map(async (portfolio) => {
        const value = await portfoliosApi.getValue(portfolio.id);
        return { portfolioId: portfolio.id, value };
      });

      const valuesResults = await Promise.all(valuesPromises);
      const valuesMap: Record<string, PortfolioValue> = {};
      valuesResults.forEach(({ portfolioId, value }) => {
        valuesMap[portfolioId] = value;
      });
      setPortfolioValues(valuesMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading portfolios...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="portfolios-page">
      <div className="page-header">
        <h1>My Portfolios</h1>
        <Link to="/portfolios/new" className="btn-primary">
          + New Portfolio
        </Link>
      </div>

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
  );
};

export default Portfolios;

