// Constants for the AI Detection Dashboard

export const REFRESH_INTERVAL = 60000; // 60 seconds

export const DEFAULT_FILTERS = {
  modality: 'all' as const,
  minAttempts: 1,
  limit: 50,
};

export const FILTER_OPTIONS = {
  modality: [
    { value: 'all', label: 'All Modalities' },
    { value: 'image', label: 'Image Only' },
    { value: 'video', label: 'Video Only' },
  ],
  minAttempts: [
    { value: 1, label: '1+ Attempts' },
    { value: 2, label: '2+ Attempts' },
    { value: 3, label: '3+ Attempts' },
    { value: 5, label: '5+ Attempts' },
  ],
  limit: [
    { value: 10, label: 'Top 10' },
    { value: 25, label: 'Top 25' },
    { value: 50, label: 'Top 50' },
    { value: 100, label: 'Top 100' },
  ],
};


export const LEADERBOARD_CONFIG = {
  maxEntries: 100,
  minScore: 0,
  maxScore: 1,
  defaultPageSize: 50,
};

export const MOCK_DATA_ENABLED = false;

// Minimal mock data for development
export const MOCK_DISCRIMINATORS = [
  {
    discriminator_id: 24,
    ss58_address: '5GLCEdFEzFcH2vJjNPiUbHjbzGNrJF8qHkwPGHFQzGqLkMpQ',
    combined_score: 0.855,
    image_score: 0.898,
    video_score: 0.812,
    image_rank: 1,
    video_rank: 1,
    latest_run_date: '2025-09-15T14:00:00Z',
    total_runs: 25,
  },
  {
    discriminator_id: 22,
    ss58_address: '5FTdEMs7Ros3qHkwPGHFQzGqLkMpQvJjNPiUbHjbzGNrJF8q',
    combined_score: 0.817,
    image_score: 0.856,
    video_score: 0.778,
    image_rank: 2,
    video_rank: 2,
    latest_run_date: '2025-09-15T13:30:00Z',
    total_runs: 22,
  },
  {
    discriminator_id: 18,
    ss58_address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    combined_score: 0.789,
    image_score: 0.823,
    video_score: 0.755,
    image_rank: 3,
    video_rank: 3,
    latest_run_date: '2025-09-15T12:45:00Z',
    total_runs: 18,
  },
  {
    discriminator_id: 31,
    ss58_address: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
    combined_score: 0.756,
    image_score: 0.789,
    video_score: 0.723,
    image_rank: 4,
    video_rank: 4,
    latest_run_date: '2025-09-15T11:20:00Z',
    total_runs: 16,
  },
  {
    discriminator_id: 15,
    ss58_address: '5Df6eXCcBYjFL4Wc9wVxPVp7B2zGqLkMpQvJjNPiUbHjbzGN',
    combined_score: 0.734,
    image_score: 0.767,
    video_score: 0.701,
    image_rank: 5,
    video_rank: 5,
    latest_run_date: '2025-09-15T10:15:00Z',
    total_runs: 14,
  },
];

export const MOCK_GENERATORS = [
  {
    ss58_address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    avg_fool_rate: 0.723,
    total_attempts: 45,
    best_fool_rate: 0.92,
    worst_fool_rate: 0.34,
    success_rate: 0.78,
    total_fooled_count: 325,
    total_not_fooled_count: 92,
    modalities: ['image', 'video'],
    latest_attempt: '2025-09-15T16:30:00Z',
    rank: 1,
  },
  {
    ss58_address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
    avg_fool_rate: 0.689,
    total_attempts: 38,
    best_fool_rate: 0.87,
    worst_fool_rate: 0.28,
    success_rate: 0.71,
    total_fooled_count: 262,
    total_not_fooled_count: 108,
    modalities: ['image', 'video'],
    latest_attempt: '2025-09-15T15:45:00Z',
    rank: 2,
  },
  {
    ss58_address: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc',
    avg_fool_rate: 0.654,
    total_attempts: 32,
    best_fool_rate: 0.83,
    worst_fool_rate: 0.22,
    success_rate: 0.68,
    total_fooled_count: 209,
    total_not_fooled_count: 98,
    modalities: ['image'],
    latest_attempt: '2025-09-15T14:20:00Z',
    rank: 3,
  },
  {
    ss58_address: '5Df6eXCcBYjFL4Wc9wVxPVp7B2zGqLkMpQvJjNPiUbHjbzGN',
    avg_fool_rate: 0.621,
    total_attempts: 29,
    best_fool_rate: 0.79,
    worst_fool_rate: 0.19,
    success_rate: 0.65,
    total_fooled_count: 180,
    total_not_fooled_count: 97,
    modalities: ['video'],
    latest_attempt: '2025-09-15T13:15:00Z',
    rank: 4,
  },
  {
    ss58_address: '5FLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFcHpG9w8E',
    avg_fool_rate: 0.598,
    total_attempts: 26,
    best_fool_rate: 0.76,
    worst_fool_rate: 0.15,
    success_rate: 0.62,
    total_fooled_count: 155,
    total_not_fooled_count: 95,
    modalities: ['image', 'video'],
    latest_attempt: '2025-09-15T12:30:00Z',
    rank: 5,
  },
];

export const MOCK_STATS = {
  total_discriminators: 35,
  confirmed_discriminators: 25,
  total_models: 60,
  image_models: 35,
  video_models: 25,
  recent_entrance_runs: 18,
  recent_benchmark_runs: 12,
  recent_generator_results: 425,
};
