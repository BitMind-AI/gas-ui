import React from 'react';

export type PageType = 'leaderboard' | 'incentive' | 'payouts';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <button
          className={`nav-button ${currentPage === 'leaderboard' ? 'active' : ''}`}
          onClick={() => onPageChange('leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className={`nav-button ${currentPage === 'incentive' ? 'active' : ''}`}
          onClick={() => onPageChange('incentive')}
        >
          Incentive
        </button>
        <button
          className={`nav-button ${currentPage === 'payouts' ? 'active' : ''}`}
          onClick={() => onPageChange('payouts')}
        >
          Payouts
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
