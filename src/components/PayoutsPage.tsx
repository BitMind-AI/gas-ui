import React from 'react';

const PayoutsPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">💳 Historical Payouts</span>
        </h1>
        <p className="page-subtitle">
          Transparent tracking of all miner payments and rewards
        </p>
      </div>

      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">📊</div>
          <h2 className="coming-soon-title">Coming Soon</h2>
          <p className="coming-soon-description">
            We're building a comprehensive payout tracking system for complete transparency. 
            This page will feature:
          </p>
          <ul className="coming-soon-features">
            <li>Historical payment records for all miners</li>
            <li>Real-time payout status tracking</li>
            <li>Detailed reward breakdowns by category</li>
            <li>Searchable and filterable payout history</li>
            <li>Export functionality for accounting purposes</li>
            <li>Performance-based reward analytics</li>
          </ul>
          <div className="coming-soon-footer">
            <p>Ensuring full transparency in our reward distribution!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutsPage;
