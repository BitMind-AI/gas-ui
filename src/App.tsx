import React, { useState, lazy, Suspense } from 'react';
import Navigation, { PageType } from './components/Navigation';

// Lazy load pages for better performance
const LeaderboardPage = lazy(() => import('./components/LeaderboardPage'));
const IncentivePage = lazy(() => import('./components/IncentivePage'));
const PayoutsPage = lazy(() => import('./components/PayoutsPage'));

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
      <Suspense fallback={
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      }>
        {renderCurrentPage()}
      </Suspense>
      
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