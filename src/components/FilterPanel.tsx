import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState } from '../types/api';
import { FILTER_OPTIONS } from '../utils/constants';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleLimitChange = (limit: number) => {
    onFilterChange({ limit });
  };

  return (
    <div className="filter-panel">
      <div className="filter-container">
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
