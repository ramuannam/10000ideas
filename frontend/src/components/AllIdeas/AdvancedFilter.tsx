import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { AdvancedFilterProps } from '../../types/allIdeas';

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  filters,
  filterData,
  onFilterChange,
  onApplyFilters,
  onClearAll,
  totalIdeas,
  filteredIdeas
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  const handleInputChange = (field: keyof typeof filters, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value
    };

    // Clear subcategory when category changes
    if (field === 'category') {
      newFilters.subcategory = '';
    }

    onFilterChange(newFilters);
  };

  // Filter subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (!filters.category) {
      return [{ value: '', label: 'Select a category first' }];
    }

    const filteredSubs = filterData.subcategories.filter(sub => {
      // Check if subcategory starts with the selected category
      return sub.value.startsWith(filters.category + '-') || sub.value === '';
    });

    // If no category is selected, show instruction
    if (filteredSubs.length <= 1) {
      return [{ value: '', label: 'No subcategories available' }];
    }

    return filteredSubs;
  }, [filters.category, filterData.subcategories]);

  const getScoreColor = (scoreType: string) => {
    switch (scoreType) {
      case 'market': return 'text-blue-600';
      case 'painPoint': return 'text-red-600';
      case 'timing': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreIcon = (scoreType: string) => {
    switch (scoreType) {
      case 'market': return '🎯';
      case 'painPoint': return '⚡';
      case 'timing': return '⏰';
      default: return '📊';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Ideas</h2>
      
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'basic'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'advanced'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Advanced
        </button>
      </div>

      {activeTab === 'basic' && (
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search ideas..."
                value={filters.searchTerm}
                onChange={(e) => handleInputChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
              {filters.category && (
                <span className="text-xs text-gray-500 ml-1">
                  (for {filterData.categories.find(cat => cat.value === filters.category)?.label})
                </span>
              )}
            </label>
            <select
              value={filters.subcategory}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              disabled={!filters.category}
              className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !filters.category ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              {availableSubcategories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Investment Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Range
            </label>
            <select
              value={filters.investmentRange}
              onChange={(e) => handleInputChange('investmentRange', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.investmentRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Build Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Build Difficulty
            </label>
            <select
              value={filters.buildDifficulty}
              onChange={(e) => handleInputChange('buildDifficulty', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.buildDifficulties.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="space-y-6">
          {/* Market Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className={`${getScoreColor('market')} font-semibold`}>
                {getScoreIcon('market')} Market Score
              </span>
            </label>
            <select
              value={filters.marketScore}
              onChange={(e) => handleInputChange('marketScore', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.marketScoreOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pain Point Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className={`${getScoreColor('painPoint')} font-semibold`}>
                {getScoreIcon('painPoint')} Pain Point Score
              </span>
            </label>
            <select
              value={filters.painPointScore}
              onChange={(e) => handleInputChange('painPointScore', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.painPointScoreOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timing Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className={`${getScoreColor('timing')} font-semibold`}>
                {getScoreIcon('timing')} Timing Score
              </span>
            </label>
            <select
              value={filters.timingScore}
              onChange={(e) => handleInputChange('timingScore', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filterData.timingScoreOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Idea Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Idea Type
            </label>
            <select
              value={filters.ideaType}
              onChange={(e) => handleInputChange('ideaType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-2 border-gray-800 rounded-lg"
            >
              {filterData.ideaTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onApplyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <FaFilter className="text-sm" />
          <span>Apply Filters</span>
        </button>
        
        <button
          onClick={onClearAll}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Results Count */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredIdeas}</span> of{' '}
          <span className="font-semibold">{totalIdeas}</span> ideas
        </p>
      </div>
    </div>
  );
};

export default AdvancedFilter; 