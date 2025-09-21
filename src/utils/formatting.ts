import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format a percentage value for display
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format a score value for display
 */
export const formatScore = (value: number, decimals: number = 3): string => {
  return value.toFixed(decimals);
};

/**
 * Format a date string to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy HH:mm');
  } catch (error) {
    return 'Unknown';
  }
};

/**
 * Truncate an address for display
 */
export const truncateAddress = (address: string, startChars: number = 6, endChars: number = 4): string => {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Get rank emoji based on position
 */
export const getRankEmoji = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `${rank}.`;
  }
};

/**
 * Get rank badge class based on position
 */
export const getRankBadgeClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'rank-gold';
    case 2:
      return 'rank-silver';
    case 3:
      return 'rank-bronze';
    default:
      return 'rank-default';
  }
};

/**
 * Format large numbers with K/M suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Get progress bar width percentage
 */
export const getProgressWidth = (value: number, max: number = 1): number => {
  return Math.min((value / max) * 100, 100);
};

/**
 * Get color class based on performance value
 */
export const getPerformanceColor = (value: number, type: 'discriminator' | 'generator'): string => {
  if (type === 'discriminator') {
    // Higher scores are better for discriminators
    if (value >= 0.8) return 'text-green-400';
    if (value >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  } else {
    // Higher fool rates are better for generators
    if (value >= 0.6) return 'text-green-400';
    if (value >= 0.4) return 'text-yellow-400';
    return 'text-red-400';
  }
};

/**
 * Get winner indicator for matchups
 */
export const getWinnerBadge = (winner: 'generator' | 'discriminator'): { emoji: string; text: string; class: string } => {
  if (winner === 'generator') {
    return {
      emoji: '🔥',
      text: 'GEN WINS',
      class: 'bg-gradient-to-r from-pink-500 to-red-500'
    };
  } else {
    return {
      emoji: '🛡️',
      text: 'DISC WINS',
      class: 'bg-gradient-to-r from-blue-500 to-purple-500'
    };
  }
};
