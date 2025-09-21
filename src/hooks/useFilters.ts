import { useState, useCallback } from 'react';
import { FilterState, Modality } from '../types/api';
import { DEFAULT_FILTERS } from '../utils/constants';

export const useFilters = (initialFilters: FilterState = DEFAULT_FILTERS) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateModality = useCallback((modality: Modality) => {
    updateFilter('modality', modality);
  }, [updateFilter]);

  const updateMinAttempts = useCallback((minAttempts: number) => {
    updateFilter('minAttempts', minAttempts);
  }, [updateFilter]);

  const updateLimit = useCallback((limit: number) => {
    updateFilter('limit', limit);
  }, [updateFilter]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setFilters_ = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return {
    filters,
    updateFilter,
    updateModality,
    updateMinAttempts,
    updateLimit,
    resetFilters,
    setFilters: setFilters_,
  };
};
