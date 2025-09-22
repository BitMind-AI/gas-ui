// API Response Types for Bitmind AI Detection Dashboard

export interface DiscriminatorEntry {
  discriminator_id: number;
  ss58_address: string;
  combined_score: number;
  image_score: number;
  video_score: number;
  image_rank: number;
  video_rank: number;
  latest_run_date: string;
  total_runs: number;
}

export interface GeneratorEntry {
  ss58_address: string;
  avg_fool_rate: number;
  total_attempts: number;
  best_fool_rate: number;
  worst_fool_rate: number;
  success_rate: number;
  total_fooled_count: number;
  total_not_fooled_count: number;
  modalities: string[];
  latest_attempt: string;
  rank: number;
}

export interface SystemStats {
  total_discriminators: number;
  confirmed_discriminators: number;
  total_models: number;
  image_models: number;
  video_models: number;
  recent_entrance_runs: number;
  recent_benchmark_runs: number;
  recent_generator_results: number;
}

export interface DiscriminatorDetailedStats {
  discriminator_id: number;
  ss58_address: string;
  status: string;
  overall_performance: {
    image: {
      latest_score: number;
      best_score: number;
      total_runs: number;
      latest_run_date: string;
    };
    video: {
      latest_score: number;
      best_score: number;
      total_runs: number;
      latest_run_date: string;
    };
  };
  detailed_runs: any[];
  aggregated_source_performance: {
    real: {
      total_correct: number;
      total_incorrect: number;
      overall_accuracy: number;
      datasets: string[];
      run_count: number;
    };
    synthetic: {
      total_correct: number;
      total_incorrect: number;
      overall_accuracy: number;
      datasets: string[];
      run_count: number;
    };
  };
}

// Filter and UI Types
export interface FilterState {
  limit: number;
}

export interface MatchupResult {
  generator: string;
  discriminator: string;
  foolRate: number;
  winner: 'generator' | 'discriminator';
  timestamp: string;
}

// API Error Type
export interface ApiError {
  message: string;
  status?: number;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Leaderboard Type Union
export type LeaderboardType = 'discriminator' | 'generator';

