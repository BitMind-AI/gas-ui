import React, { memo } from 'react';
import { Clock, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { GeneratorEntry } from '../types/api';
import {
  formatPercentage,
  formatRelativeTime,
  truncateAddress,
  getRankEmoji,
  getPerformanceColor,
} from '../utils/formatting';

interface GeneratorTableProps {
  data: GeneratorEntry[];
  loading: boolean;
}

const GeneratorTable: React.FC<GeneratorTableProps> = memo(({ data, loading }) => {
  if (loading) {
    return (
      <div className="table-container">
        <div className="table-loading">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="table-row-skeleton">
              <div className="skeleton skeleton-cell"></div>
              <div className="skeleton skeleton-cell"></div>
              <div className="skeleton skeleton-cell"></div>
              <div className="skeleton skeleton-cell"></div>
              <div className="skeleton skeleton-cell"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-empty">
        <div className="empty-icon">🎯</div>
        <h3>No Generators Found</h3>
        <p>No generator data available with the current filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="table-header">Rank</th>
              <th className="table-header">Generator</th>
              <th className="table-header">Avg Fool Rate</th>
              <th className="table-header">Best/Worst</th>
              <th className="table-header">Success Rate</th>
              <th className="table-header">Attempts</th>
              <th className="table-header">Modalities</th>
              <th className="table-header">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const rank = index + 1;
              const foolRate = entry.avg_fool_rate;
              
              return (
                <tr key={entry.ss58_address} className="table-row">
                  <td className="table-cell rank-cell">
                    <div className="rank-display">
                      <span className="rank-emoji">{getRankEmoji(rank)}</span>
                      <span className="rank-number">#{rank}</span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="generator-info">
                      <div className="generator-id">
                        Generator #{rank}
                      </div>
                      <div className="generator-address">
                        {truncateAddress(entry.ss58_address)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="score-display">
                      <span className={`score-value ${getPerformanceColor(foolRate, 'generator')}`}>
                        {formatPercentage(foolRate)}
                      </span>
                      <div className="score-bar">
                        <div 
                          className="score-fill score-fill-generator"
                          style={{ width: `${foolRate * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="best-worst-display">
                      <div className="best-score">
                        <TrendingUp className="trend-icon trend-up" />
                        <span className="text-green-400">{formatPercentage(entry.best_fool_rate)}</span>
                      </div>
                      <div className="worst-score">
                        <TrendingDown className="trend-icon trend-down" />
                        <span className="text-red-400">{formatPercentage(entry.worst_fool_rate)}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="success-display">
                      <span className={`score-value ${getPerformanceColor(entry.success_rate, 'generator')}`}>
                        {formatPercentage(entry.success_rate)}
                      </span>
                      <div className="success-stats">
                        <span className="success-count">{entry.total_fooled_count}W</span>
                        <span className="fail-count">{entry.total_not_fooled_count}L</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="attempts-display">
                      <Target className="attempts-icon" />
                      <span>{entry.total_attempts}</span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="modalities-display">
                      {entry.modalities.map((modality) => (
                        <span key={modality} className="modality-badge">
                          {modality}
                        </span>
                      ))}
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="time-display">
                      <Clock className="time-icon" />
                      <span>{formatRelativeTime(entry.latest_attempt)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

GeneratorTable.displayName = 'GeneratorTable';

export default GeneratorTable;
