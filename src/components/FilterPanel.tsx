import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState, Modality } from '../types/api';
import { FILTER_OPTIONS } from '../utils/constants';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleModalityChange = (modality: Modality) => {
    onFilterChange({ ...filters, modality });
  };

  const handleMinAttemptsChange = (minAttempts: number) => {
    onFilterChange({ ...filters, minAttempts });
  };

  const handleLimitChange = (limit: number) => {
    onFilterChange({ ...filters, limit });
  };

  return (
    <div className="filter-panel">
      <div className="filter-container">
        {/* Modality Filter */}
        <div className="filter-group">
          <label className="filter-label">Modality:</label>
          <div className="filter-select-wrapper">
            <select
              value={filters.modality}
              onChange={(e) => handleModalityChange(e.target.value as Modality)}
              className="filter-select"
            >
              {FILTER_OPTIONS.modality.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="filter-chevron" />
          </div>
        </div>

        {/* Min Attempts Filter */}
        <div className="filter-group">
          <label className="filter-label">Min Attempts:</label>
          <div className="filter-select-wrapper">
            <select
              value={filters.minAttempts}
              onChange={(e) => handleMinAttemptsChange(Number(e.target.value))}
              className="filter-select"
            >
              {FILTER_OPTIONS.minAttempts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="filter-chevron" />
          </div>
        </div>

        {/* Limit Filter */}
        <div className="filter-group">
          <label className="filter-label">Show:</label>
          <div className="filter-select-wrapper">
            <select
              value={filters.limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="filter-select"
            >
              {FILTER_OPTIONS.limit.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="filter-chevron" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
