import React, { useState, useEffect } from 'react';
import { FaTh, FaList } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import AuthModal from '../components/AuthModal';
import AdvancedFilter from '../components/AllIdeas/AdvancedFilter';
import IdeaCardGrid from '../components/AllIdeas/IdeaCardGrid';
import { useAllIdeas } from '../hooks/useAllIdeas';
import { useAuth } from '../contexts/AuthContext';

const AllIdeasPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Ideas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode } = useAuth();
  const location = useLocation();

  // Handle selected category from navigation
  useEffect(() => {
    if (location.state?.selectedCategory) {
      const selectedCategory = location.state.selectedCategory;
      // Apply the category filter
      handleFilterChange({ ...filters, category: selectedCategory });
    }
  }, [location.state]);

  const {
    filteredIdeas,
    filters,
    filterData,
    handleFilterChange,
    applyFilters,
    clearAllFilters,
    toggleFavorite,
    handleCardClick,
    totalIdeas,
    filteredCount,
    loading,
    error
  } = useAllIdeas();

  const handleAuthSuccess = (userData: any) => {
    console.log('User authenticated:', userData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Ideas</h1>
              <p className="text-gray-600">
                Discover innovative business ideas from various industries and sectors
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaTh className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaList className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Total Ideas</h3>
            <p className="text-2xl font-bold text-blue-600">{totalIdeas}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Filtered Results</h3>
            <p className="text-2xl font-bold text-green-600">{filteredCount}</p>
          </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Categories</h3>
              <p className="text-2xl font-bold text-purple-600">{filterData.categories.length}</p>
            </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading ideas...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="w-80 flex-shrink-0">
            <AdvancedFilter
              filters={filters}
              filterData={filterData}
              onFilterChange={handleFilterChange}
              onApplyFilters={applyFilters}
              onClearAll={clearAllFilters}
              totalIdeas={totalIdeas}
              filteredIdeas={filteredCount}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredCount} Ideas Found
                </h2>
                {filters.searchTerm && (
                  <span className="text-gray-600">
                    for "{filters.searchTerm}"
                  </span>
                )}
              </div>
              
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="relevance">Sort by Relevance</option>
                <option value="newest">Newest First</option>
                <option value="investment-low">Investment: Low to High</option>
                <option value="investment-high">Investment: High to Low</option>
                <option value="market-score">Market Score</option>
                <option value="difficulty">Difficulty Level</option>
              </select>
            </div>

            {/* Ideas Grid */}
            {filteredIdeas.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl text-gray-300 mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No ideas found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredIdeas.map((idea) => (
                  <IdeaCardGrid
                    key={idea.id}
                    idea={idea}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            )}

            {/* Load More Button (for future pagination) */}
            {filteredIdeas.length > 0 && filteredIdeas.length >= 6 && (
              <div className="text-center mt-12">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors">
                  Load More Ideas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
};

export default AllIdeasPage; 