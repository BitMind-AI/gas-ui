import React, { memo } from 'react';
import { Clock, Trophy } from 'lucide-react';
import { DiscriminatorEntry } from '../types/api';
import {
  formatScore,
  formatRelativeTime,
  truncateAddress,
  getRankEmoji,
  getPerformanceColor,
  formatModelEvaluations,
} from '../utils/formatting';

interface DiscriminatorTableProps {
  data: DiscriminatorEntry[];
  loading: boolean;
}

const DiscriminatorTable: React.FC<DiscriminatorTableProps> = memo(({ data, loading }) => {
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
        <div className="empty-icon">🛡️</div>
        <h3>No Discriminators Found</h3>
        <p>No discriminator data available with the current filters.</p>
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
              <th className="table-header">Discriminator</th>
              <th className="table-header">Combined Score</th>
              <th className="table-header">Image Score</th>
              <th className="table-header">Video Score</th>
              <th className="table-header">Evaluations</th>
              <th className="table-header">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => {
              const rank = index + 1;
              const combinedScore = entry.combined_score;
              
              return (
                <tr key={entry.discriminator_id} className="table-row">
                  <td className="table-cell rank-cell">
                    <div className="rank-display">
                      <span className="rank-emoji">{getRankEmoji(rank)}</span>
                      <span className="rank-number">#{rank}</span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="discriminator-info">
                      <div className="discriminator-id">
                        Discriminator #{entry.discriminator_id}
                      </div>
                      <div className="discriminator-address">
                        {truncateAddress(entry.ss58_address)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="score-display">
                      <span className={`score-value ${getPerformanceColor(combinedScore, 'discriminator')}`}>
                        {formatScore(combinedScore)}
                      </span>
                      <div className="score-bar">
                        <div 
                          className="score-fill score-fill-discriminator"
                          style={{ width: `${combinedScore * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="score-display">
                      <span className={`score-value ${getPerformanceColor(entry.image_score, 'discriminator')}`}>
                        {formatScore(entry.image_score)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="score-display">
                      <span className={`score-value ${getPerformanceColor(entry.video_score, 'discriminator')}`}>
                        {formatScore(entry.video_score)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="runs-display">
                      <Trophy className="runs-icon" />
                      <span>{formatModelEvaluations(entry.total_runs)}</span>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="time-display">
                      <Clock className="time-icon" />
                      <span>{formatRelativeTime(entry.latest_run_date)}</span>
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

DiscriminatorTable.displayName = 'DiscriminatorTable';

export default DiscriminatorTable;
