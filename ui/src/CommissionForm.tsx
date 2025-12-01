import React, { useState } from 'react';
import { calculateCommission } from '../services/api';

const CommissionForm: React.FC = () => {
    const [localSalesCount, setLocalSalesCount] = useState<number>(0);
    const [foreignSalesCount, setForeignSalesCount] = useState<number>(0);
    const [averageSaleAmount, setAverageSaleAmount] = useState<number>(0);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (localSalesCount < 0 || foreignSalesCount < 0 || averageSaleAmount < 0) {
            setError('All values must be non-negative.');
            return;
        }

        try {
            const response = await calculateCommission(localSalesCount, foreignSalesCount, averageSaleAmount);
            setResult(response);
        } catch (err) {
            setError('An error occurred while calculating commissions.');
        }
    };

    return (
        <div>
            <h2>Commission Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Local Sales Count:
                        <input
                            type="number"
                            value={localSalesCount}
                            onChange={(e) => setLocalSalesCount(Number(e.target.value))}
                            min="0"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Foreign Sales Count:
                        <input
                            type="number"
                            value={foreignSalesCount}
                            onChange={(e) => setForeignSalesCount(Number(e.target.value))}
                            min="0"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Average Sale Amount (£):
                        <input
                            type="number"
                            value={averageSaleAmount}
                            onChange={(e) => setAverageSaleAmount(Number(e.target.value))}
                            min="0"
                        />
                    </label>
                </div>
                <button type="submit">Calculate</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <h3>Results:</h3>
                    <p>Local Commission: £{result.localCommission.toFixed(2)}</p>
                    <p>Foreign Commission: £{result.foreignCommission.toFixed(2)}</p>
                    <p>Total Commission: £{result.totalCommission.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default CommissionForm;