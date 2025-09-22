import { useState, useCallback } from 'react';
import { FilterState } from '../types/api';
import { DEFAULT_FILTERS } from '../utils/constants';

export const useFilters = (initialFilters: FilterState = DEFAULT_FILTERS) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateLimit = useCallback((limit: number) => {
    setFilters({ limit });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setFilters_ = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return {
    filters,
    updateLimit,
    resetFilters,
    setFilters: setFilters_,
  };
};
