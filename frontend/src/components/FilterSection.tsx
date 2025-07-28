import React, { useState, useEffect } from 'react';
import { FilterOptions, FilterData } from '../types';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface FilterSectionProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  filterData: FilterData;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFiltersChange, filterData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | undefined) => {
    const newFilters = { ...filters } as FilterOptions;
    if (value === '' || value === undefined) {
      delete newFilters[key];
    } else {
      (newFilters as any)[key] = value;
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FaFilter className="text-gray-500 mr-2" />
          <span className="font-medium text-gray-900">Filters</span>
          {hasActiveFilters && (
            <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {Object.keys(filters).length}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAllFilters();
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="mr-1" />
              Clear
            </button>
          )}
          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {filterData.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <select
              value={filters.sector || ''}
              onChange={(e) => handleFilterChange('sector', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Sectors</option>
              {filterData.sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={filters.difficultyLevel || ''}
              onChange={(e) => handleFilterChange('difficultyLevel', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Levels</option>
              {filterData.difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Locations</option>
              {filterData.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Investment Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Investment
            </label>
            <select
              value={filters.maxInvestment || ''}
              onChange={(e) => handleFilterChange('maxInvestment', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Any Amount</option>
              <option value="25000">Under ₹25K</option>
              <option value="50000">Under ₹50K</option>
              <option value="100000">Under ₹1L</option>
              <option value="500000">Under ₹5L</option>
              <option value="1000000">Under ₹10L</option>
              <option value="5000000">Under ₹50L</option>
            </select>
          </div>

          {/* Target Audience Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <select
              value={filters.targetAudience || ''}
              onChange={(e) => handleFilterChange('targetAudience', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Audiences</option>
              <option value="Women">Women</option>
              <option value="Rural">Rural</option>
              <option value="Specially Abled">Specially Abled</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Lower Middle Class">Lower Middle Class</option>
              <option value="Urban">Urban</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection; 