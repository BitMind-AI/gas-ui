import React, { useState } from 'react';
import StatsOverview from './StatsOverview';
import FilterPanel from './FilterPanel';
import TabNavigation, { TabType } from './TabNavigation';
import DiscriminatorTable from './DiscriminatorTable';
import GeneratorTable from './GeneratorTable';
import MatchupCard from './MatchupCard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useFilters } from '../hooks/useFilters';

const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('discriminators');
  const { filters, setFilters } = useFilters();
  const {
    discriminators,
    generators,
    stats,
    loadingState,
    error,
    lastUpdated,
  } = useLeaderboard(filters);

  const isLoading = loadingState === 'loading';
  const hasError = loadingState === 'error';

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  if (hasError && error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Error Loading Data</h2>
          <p>{error.message || 'Failed to load data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <StatsOverview 
        stats={stats} 
        lastUpdated={lastUpdated}
        loading={isLoading}
      />
      
      <FilterPanel 
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        discriminatorCount={discriminators.length}
        generatorCount={generators.length}
      />
      
      <div className="leaderboard-content">
        {activeTab === 'discriminators' ? (
          <DiscriminatorTable 
            data={discriminators} 
            loading={isLoading}
          />
        ) : (
          <GeneratorTable 
            data={generators} 
            loading={isLoading}
          />
        )}
      </div>
      
      <MatchupCard 
        matchups={[]} 
        loading={isLoading}
      />
    </div>
  );
};

export default LeaderboardPage;
