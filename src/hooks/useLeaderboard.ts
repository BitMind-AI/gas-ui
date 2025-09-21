import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api';
import {
  DiscriminatorEntry,
  GeneratorEntry,
  SystemStats,
  DiscriminatorDetailedStats,
  FilterState,
  LoadingState,
  ApiError
} from '../types/api';
import { DEFAULT_FILTERS, REFRESH_INTERVAL, MOCK_DATA_ENABLED, MOCK_DISCRIMINATORS, MOCK_GENERATORS, MOCK_STATS } from '../utils/constants';

export const useLeaderboard = (filters: FilterState = DEFAULT_FILTERS) => {
  const [discriminators, setDiscriminators] = useState<DiscriminatorEntry[]>([]);
  const [generators, setGenerators] = useState<GeneratorEntry[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      if (MOCK_DATA_ENABLED) {
        // Use mock data in development
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setDiscriminators(MOCK_DISCRIMINATORS);
        setGenerators(MOCK_GENERATORS);
        setStats(MOCK_STATS);
      } else {
        // Fetch real data in parallel
        const [discriminatorData, generatorData, statsData] = await Promise.all([
          apiClient.getFilteredDiscriminatorLeaderboard(filters),
          apiClient.getFilteredGeneratorLeaderboard(filters),
          apiClient.getSystemStats(),
        ]);

        setDiscriminators(discriminatorData);
        setGenerators(generatorData);
        setStats(statsData);
      }

      setLoadingState('success');
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError(err as ApiError);
      setLoadingState('error');
    }
  }, [filters]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingState !== 'loading') {
        fetchData();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchData, loadingState]);

  return {
    discriminators,
    generators,
    stats,
    loadingState,
    error,
    lastUpdated,
    refetch,
  };
};

export const useDiscriminatorDetails = (discriminatorId: number | null) => {
  const [details, setDetails] = useState<DiscriminatorDetailedStats | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!discriminatorId) return;

    setLoadingState('loading');
    setError(null);

    try {
      const data = await apiClient.getDiscriminatorDetails(discriminatorId);
      setDetails(data);
      setLoadingState('success');
    } catch (err) {
      console.error('Error fetching discriminator details:', err);
      setError(err as ApiError);
      setLoadingState('error');
    }
  }, [discriminatorId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    details,
    loadingState,
    error,
    refetch: fetchDetails,
  };
};
