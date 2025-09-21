import React from 'react';

const IncentivePage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">💰 Incentive Mechanism</span>
        </h1>
        <p className="page-subtitle">
          Understanding BitMind GAS reward distribution and incentive structure
        </p>
      </div>

      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">🚧</div>
          <h2 className="coming-soon-title">Coming Soon</h2>
          <p className="coming-soon-description">
            We're working on a comprehensive guide to the BitMind GAS incentive mechanism. 
            This page will include detailed explanations of:
          </p>
          <ul className="coming-soon-features">
            <li>Reward calculation methodology</li>
            <li>Performance-based incentive structure</li>
            <li>Staking and validation rewards</li>
            <li>Network participation incentives</li>
            <li>Interactive diagrams and examples</li>
          </ul>
          <div className="coming-soon-footer">
            <p>Stay tuned for updates!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentivePage;
