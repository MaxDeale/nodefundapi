import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfoliosApi } from '../../services/api';
import './CreatePortfolio.scss';

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: 'user-1',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const portfolio = await portfoliosApi.create(formData);
      navigate(`/portfolios/${portfolio.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="create-portfolio">
      <div className="form-container">
        <h1>Create New Portfolio</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Portfolio Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Retirement Portfolio"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/portfolios')}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePortfolio;

