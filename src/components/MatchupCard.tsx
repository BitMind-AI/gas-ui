import React from 'react';
import { Swords, Clock } from 'lucide-react';
import { MatchupResult } from '../types/api';
import { formatPercentage, formatRelativeTime, truncateAddress, getWinnerBadge } from '../utils/formatting';

interface MatchupCardProps {
  matchups: MatchupResult[];
  loading: boolean;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ matchups, loading }) => {
  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <Swords className="w-5 h-5 mr-2 text-gray-400" />
          <h3 className="text-lg font-semibold">⚔️ Recent Battles</h3>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Generate some mock matchup data for demonstration
  const mockMatchups: MatchupResult[] = [
    {
      generator: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      discriminator: 'Discriminator #24',
      foolRate: 0.567,
      winner: 'generator',
      timestamp: '2025-09-15T16:30:00Z',
    },
    {
      generator: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      discriminator: 'Discriminator #22',
      foolRate: 0.352,
      winner: 'discriminator',
      timestamp: '2025-09-15T15:45:00Z',
    },
    {
      generator: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      discriminator: 'Discriminator #18',
      foolRate: 0.723,
      winner: 'generator',
      timestamp: '2025-09-15T14:20:00Z',
    },
  ];

  const displayMatchups = matchups.length > 0 ? matchups : mockMatchups;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Swords className="w-5 h-5 mr-2 text-gray-400" />
          <h3 className="text-lg font-semibold">⚔️ Recent Battles</h3>
        </div>
        <div className="text-sm text-gray-400">
          {displayMatchups.length} battles
        </div>
      </div>

      <div className="space-y-3">
        {displayMatchups.map((matchup, index) => {
          const winnerBadge = getWinnerBadge(matchup.winner);
          
          return (
            <div
              key={index}
              className="matchup-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-sm">
                      <span className="text-pink-400">Gen:</span>{' '}
                      <span className="font-medium">{truncateAddress(matchup.generator)}</span>
                    </div>
                    <span className="text-gray-500">vs</span>
                    <div className="text-sm">
                      <span className="text-blue-400">Disc:</span>{' '}
                      <span className="font-medium">{matchup.discriminator}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span>Fool Rate: {formatPercentage(matchup.foolRate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(matchup.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <div className={`winner-badge ${matchup.winner === 'generator' ? 'winner-generator' : 'winner-discriminator'}`}>
                    <span className="mr-1">{winnerBadge.emoji}</span>
                    {winnerBadge.text}
                  </div>
                </div>
              </div>

              {/* Progress bar showing fool rate */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Attack Success</span>
                  <span className="text-xs font-medium">{formatPercentage(matchup.foolRate)}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${matchup.winner === 'generator' ? 'progress-generator' : 'progress-discriminator'}`}
                    style={{ width: `${matchup.foolRate * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {displayMatchups.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Swords className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No recent battles</p>
        </div>
      )}
    </div>
  );
};

export default MatchupCard;
