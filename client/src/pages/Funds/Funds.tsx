import { useEffect, useState } from 'react';
import { fundsApi } from '../../services/api';
import type { Fund, FundCategory } from '../../types';
import './Funds.scss';

const Funds = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FundCategory | 'all'>('all');

  const categories: (FundCategory | 'all')[] = [
    'all',
    'tech',
    'healthcare',
    'finance',
    'energy',
    'consumer',
    'industrial',
  ];

  useEffect(() => {
    loadFunds();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredFunds(funds);
    } else {
      setFilteredFunds(funds.filter((f) => f.category === selectedCategory));
    }
  }, [selectedCategory, funds]);

  const loadFunds = async () => {
    try {
      setLoading(true);
      const fundsData = await fundsApi.getAll();
      setFunds(fundsData);
      setFilteredFunds(fundsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load funds');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading funds...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="funds-page">
      <div className="page-header">
        <h1>Available Funds</h1>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="funds-grid">
        {filteredFunds.length === 0 ? (
          <div className="empty-state">
            <p>No funds found in this category.</p>
          </div>
        ) : (
          filteredFunds.map((fund) => (
            <div key={fund.id} className="fund-card">
              <div className="fund-header">
                <h3>{fund.name}</h3>
                <span className="fund-category">{fund.category}</span>
              </div>
              <div className="fund-symbol">{fund.symbol}</div>
              <div className="fund-price">${fund.price.toFixed(2)}</div>
              <div className="fund-currency">{fund.currency}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Funds;

