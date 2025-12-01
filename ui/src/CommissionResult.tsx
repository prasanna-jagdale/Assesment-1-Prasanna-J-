import React from 'react';

interface CommissionResultProps {
    localSalesCount: number;
    foreignSalesCount: number;
    averageSaleAmount: number;
    avalphaCommission: {
        local: number;
        foreign: number;
        total: number;
    };
    competitorCommission: {
        local: number;
        foreign: number;
        total: number;
    };
}

const CommissionResult: React.FC<CommissionResultProps> = ({
    localSalesCount,
    foreignSalesCount,
    averageSaleAmount,
    avalphaCommission,
    competitorCommission,
}) => {
    return (
        <div className="commission-result">
            <h2>Commission Results</h2>
            <p>Local Sales Count: {localSalesCount}</p>
            <p>Foreign Sales Count: {foreignSalesCount}</p>
            <p>Average Sale Amount: £{averageSaleAmount.toFixed(2)}</p>
            <h3>Avalpha Commission</h3>
            <p>Local: £{avalphaCommission.local.toFixed(2)}</p>
            <p>Foreign: £{avalphaCommission.foreign.toFixed(2)}</p>
            <p>Total: £{avalphaCommission.total.toFixed(2)}</p>
            <h3>Competitor Commission</h3>
            <p>Local: £{competitorCommission.local.toFixed(2)}</p>
            <p>Foreign: £{competitorCommission.foreign.toFixed(2)}</p>
            <p>Total: £{competitorCommission.total.toFixed(2)}</p>
        </div>
    );
};

export default CommissionResult;