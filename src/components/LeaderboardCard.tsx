import React from 'react';
import { Clock, Trophy, Zap, Target } from 'lucide-react';
import { DiscriminatorEntry, GeneratorEntry, LeaderboardType } from '../types/api';
import {
  formatPercentage,
  formatScore,
  formatRelativeTime,
  truncateAddress,
  getRankEmoji,
  getProgressWidth,
  getPerformanceColor,
} from '../utils/formatting';

interface LeaderboardCardProps {
  type: LeaderboardType;
  data: DiscriminatorEntry[] | GeneratorEntry[];
  loading: boolean;
  title: string;
  icon: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  type,
  data,
  loading,
  title,
  icon,
}) => {
  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">{icon}</span>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderDiscriminatorEntry = (entry: DiscriminatorEntry, index: number) => {
    const rank = index + 1;
    const combinedScore = entry.combined_score;
    
    return (
      <div
        key={entry.discriminator_id}
        className="leaderboard-entry leaderboard-discriminator animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getRankEmoji(rank)}</span>
              <div>
                <div className="font-semibold text-white">
                  Discriminator #{entry.discriminator_id}
                </div>
                <div className="text-sm text-gray-400">
                  {truncateAddress(entry.ss58_address)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-lg font-bold ${getPerformanceColor(combinedScore, 'discriminator')}`}>
              {formatScore(combinedScore)}
            </div>
            <div className="text-xs text-gray-400">Combined Score</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Image</span>
              <span className="text-xs font-medium">{formatScore(entry.image_score)}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill progress-discriminator"
                style={{ width: `${getProgressWidth(entry.image_score)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Video</span>
              <span className="text-xs font-medium">{formatScore(entry.video_score)}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill progress-discriminator"
                style={{ width: `${getProgressWidth(entry.video_score)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3" />
              <span>{entry.total_runs} runs</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(entry.latest_run_date)}</span>
            </div>
          </div>
          <div className="text-xs">
            Rank: I#{entry.image_rank} V#{entry.video_rank}
          </div>
        </div>
      </div>
    );
  };

  const renderGeneratorEntry = (entry: GeneratorEntry, index: number) => {
    const rank = index + 1;
    const foolRate = entry.avg_fool_rate;
    
    return (
      <div
        key={entry.ss58_address}
        className="leaderboard-entry leaderboard-generator animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getRankEmoji(rank)}</span>
              <div>
                <div className="font-semibold text-white">
                  Generator #{rank}
                </div>
                <div className="text-sm text-gray-400">
                  {truncateAddress(entry.ss58_address)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-lg font-bold ${getPerformanceColor(foolRate, 'generator')}`}>
              {formatPercentage(foolRate)}
            </div>
            <div className="text-xs text-gray-400">Avg Fool Rate</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Success Rate</span>
            <span className="text-xs font-medium">{formatPercentage(foolRate)}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill progress-generator"
              style={{ width: `${getProgressWidth(foolRate)}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-400">Best/Worst</div>
            <div className="font-medium">
              {formatPercentage(entry.best_fool_rate)} / {formatPercentage(entry.worst_fool_rate)}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Success Rate</div>
            <div className="font-medium">{formatPercentage(entry.success_rate)}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>{entry.total_attempts} attempts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(entry.latest_attempt)}</span>
            </div>
          </div>
          <div className="flex space-x-1">
            {entry.modalities.map((modality) => (
              <span
                key={modality}
                className="px-2 py-1 bg-gray-700 rounded text-xs"
              >
                {modality}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <h2 className={`text-xl font-bold ${type === 'discriminator' ? 'gradient-text' : 'gradient-text-generator'}`}>
            {title}
          </h2>
        </div>
        <div className="text-sm text-gray-400">
          {data.length} entries
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No entries found</p>
          </div>
        ) : (
          data.map((entry, index) =>
            type === 'discriminator'
              ? renderDiscriminatorEntry(entry as DiscriminatorEntry, index)
              : renderGeneratorEntry(entry as GeneratorEntry, index)
          )
        )}
      </div>
    </div>
  );
};

export default LeaderboardCard;
