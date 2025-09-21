import React from 'react';

export type TabType = 'discriminators' | 'generators';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  discriminatorCount: number;
  generatorCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  discriminatorCount,
  generatorCount,
}) => {
  return (
    <div className="tab-navigation">
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'discriminators' ? 'tab-active tab-discriminator' : 'tab-inactive'}`}
          onClick={() => onTabChange('discriminators')}
        >
          <span className="tab-label">Discriminators</span>
          <span className="tab-count">{discriminatorCount}</span>
        </button>
        
        <button
          className={`tab-button ${activeTab === 'generators' ? 'tab-active tab-generator' : 'tab-inactive'}`}
          onClick={() => onTabChange('generators')}
        >
          <span className="tab-label">Generators</span>
          <span className="tab-count">{generatorCount}</span>
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
