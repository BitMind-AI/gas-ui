import React from 'react';
import { Shield, Target, Activity, TrendingUp } from 'lucide-react';
import { SystemStats } from '../types/api';
import { formatNumber } from '../utils/formatting';

interface StatsOverviewProps {
  stats: SystemStats | null;
  lastUpdated: Date | null;
  loading: boolean;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, lastUpdated, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stats-card animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      icon: Shield,
      value: stats.confirmed_discriminators,
      total: stats.total_discriminators,
      label: 'Active Discriminators',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Target,
      value: stats.recent_generator_results,
      label: 'Generator Attempts',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: Activity,
      value: stats.recent_benchmark_runs,
      label: 'Recent Benchmarks',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: TrendingUp,
      value: stats.total_models,
      label: 'Total Models',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-1">
          <span className="gradient-text">🏆 BitMind Leaderboard</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Real-time leaderboards for discriminators vs generators
        </p>
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Stats Grid - Horizontal Layout */}
      <div className="stats-horizontal-container">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="stats-card-horizontal animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="stats-content">
                <div className={`stats-value-horizontal ${stat.color}`}>
                  {formatNumber(stat.value)}
                  {stat.total && (
                    <span className="text-gray-500 text-sm">
                      /{formatNumber(stat.total)}
                    </span>
                  )}
                </div>
                <div className="stats-label-horizontal">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StatsOverview;
