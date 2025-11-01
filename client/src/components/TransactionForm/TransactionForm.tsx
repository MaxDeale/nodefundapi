import { useState, useEffect } from 'react';
import { transactionsApi, fundsApi } from '../../services/api';
import type { Fund, TransactionType } from '../../types';
import './TransactionForm.scss';

interface TransactionFormProps {
  portfolioId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const TransactionForm = ({ portfolioId, onSuccess, onCancel }: TransactionFormProps) => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fundId: '',
    type: 'BUY' as TransactionType,
    quantity: '',
    price: '',
  });

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = async () => {
    try {
      const fundsData = await fundsApi.getAll();
      setFunds(fundsData);
    } catch (err) {
      setError('Failed to load funds');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const selectedFund = funds.find((f) => f.id === formData.fundId);
      if (!selectedFund) {
        throw new Error('Please select a fund');
      }

      // Client-side validation for price
      if (formData.price) {
        const enteredPrice = parseFloat(formData.price);
        const priceDifference = Math.abs(enteredPrice - selectedFund.price) / selectedFund.price;
        
        if (priceDifference > 0.01) {
          throw new Error(
            `Price must be within 1% of current price ($${selectedFund.price.toFixed(2)}). ` +
            `Your price of $${enteredPrice.toFixed(2)} is ${(priceDifference * 100).toFixed(2)}% different.`
          );
        }
      }

      await transactionsApi.create({
        portfolioId,
        fundId: formData.fundId,
        type: formData.type,
        quantity: parseFloat(formData.quantity),
        price: formData.price ? parseFloat(formData.price) : undefined,
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedFund = funds.find((f) => f.id === formData.fundId);
  const currentPrice = selectedFund?.price || 0;

  if (loading) {
    return <div className="loading">Loading funds...</div>;
  }

  return (
    <div className="transaction-form-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h3>New Transaction</h3>

        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fundId">Fund</label>
          <select
            id="fundId"
            name="fundId"
            value={formData.fundId}
            onChange={handleChange}
            required
          >
            <option value="">Select a fund</option>
            {funds.map((fund) => (
              <option key={fund.id} value={fund.id}>
                {fund.name} ({fund.symbol}) - ${fund.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {selectedFund && (
          <div className="fund-info">
            <span>Current Price: ${currentPrice.toFixed(2)}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (Optional - defaults to current price)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder={currentPrice.toFixed(2)}
          />
          {formData.price && selectedFund && (
            <div className="price-validation">
              {(() => {
                const enteredPrice = parseFloat(formData.price);
                const priceDifference = Math.abs(enteredPrice - selectedFund.price) / selectedFund.price;
                const isValid = priceDifference <= 0.01;
                
                return (
                  <span className={isValid ? 'price-valid' : 'price-invalid'}>
                    {isValid 
                      ? `✓ Price is within acceptable range (${(priceDifference * 100).toFixed(2)}% difference)`
                      : `⚠ Price is ${(priceDifference * 100).toFixed(2)}% different from current price. Must be within 1%.`
                    }
                  </span>
                );
              })()}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Create Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;

