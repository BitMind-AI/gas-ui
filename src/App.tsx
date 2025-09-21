import React, { useState } from 'react';
import Navigation, { PageType } from './components/Navigation';
import LeaderboardPage from './components/LeaderboardPage';
import IncentivePage from './components/IncentivePage';
import PayoutsPage from './components/PayoutsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('leaderboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'incentive':
        return <IncentivePage />;
      case 'payouts':
        return <PayoutsPage />;
      default:
        return <LeaderboardPage />;
    }
  };

  return (
    <div className="app-container">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      {renderCurrentPage()}
      
      {/* Footer */}
      <footer className="footer">
        <p>
          Powered by{' '}
          <a
            href="https://gas.bitmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Bitmind AI Detection API
          </a>
        </p>
        <p className="footer-subtitle">
          Real-time leaderboards update every 60 seconds
        </p>
      </footer>
    </div>
  );
}

export default App;