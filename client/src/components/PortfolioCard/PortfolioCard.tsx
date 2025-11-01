import { Link } from 'react-router-dom';
import type { Portfolio, PortfolioValue } from '../../types';
import './PortfolioCard.scss';

interface PortfolioCardProps {
  portfolio: Portfolio;
  value?: PortfolioValue;
}

const PortfolioCard = ({ portfolio, value }: PortfolioCardProps) => {
  const returnPercentage = value?.returnPercentage || 0;
  const returnAmount = value?.returnAmount || 0;
  const isPositive = returnAmount >= 0;

  return (
    <Link to={`/portfolios/${portfolio.id}`} className="portfolio-card">
      <div className="portfolio-header">
        <h3>{portfolio.name}</h3>
        <span className="portfolio-count">{portfolio.holdings.length} holdings</span>
      </div>

      {value && (
        <div className="portfolio-value">
          <div className="value-row">
            <span className="value-label">Current Value</span>
            <span className="value-amount">${value.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="value-row">
            <span className="value-label">Invested</span>
            <span className="value-amount">${value.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className={`return-row ${isPositive ? 'positive' : 'negative'}`}>
            <span className="return-label">Return</span>
            <span className="return-amount">
              {isPositive ? '+' : ''}${returnAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="return-percentage">
                ({isPositive ? '+' : ''}{returnPercentage.toFixed(2)}%)
              </span>
            </span>
          </div>
        </div>
      )}

      <div className="portfolio-footer">
        <span className="view-details">View Details →</span>
      </div>
    </Link>
  );
};

export default PortfolioCard;

