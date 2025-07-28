import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Idea, FilterOptions, FilterData } from './types';
import { ideaService } from './services/api.ts';
import IdeaCard from './components/IdeaCard.tsx';
import FilterSection from './components/FilterSection.tsx';
import IdeaDetail from './components/IdeaDetail.tsx';
import { FaLightbulb, FaSearch, FaSpinner } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({
    categories: [],
    sectors: [],
    difficultyLevels: [],
    locations: []
  });
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadFilterData();
    loadIdeas();
  }, []);

  useEffect(() => {
    loadIdeas();
  }, [filters]);

  const loadFilterData = async () => {
    try {
      const data = await ideaService.getFilterData();
      setFilterData(data);
    } catch (error) {
      console.error('Error loading filter data:', error);
    }
  };

  const loadIdeas = async () => {
    setLoading(true);
    try {
      let ideasData: Idea[];
      if (Object.keys(filters).length > 0) {
        ideasData = await ideaService.getIdeasWithFilters(filters);
      } else {
        ideasData = await ideaService.getAllIdeas();
      }
      setIdeas(ideasData);
    } catch (error) {
      console.error('Error loading ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIdeaClick = (idea: Idea) => {
    navigate(`/idea/${idea.id}`);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FaLightbulb className="text-primary-600 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">10000Ideas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <FilterSection
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterData={filterData}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {loading ? 'Loading ideas...' : `${filteredIdeas.length} ideas found`}
          </h2>
          {Object.keys(filters).length > 0 && (
            <button
              onClick={() => setFilters({})}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-4xl text-primary-600" />
          </div>
        )}

        {/* Ideas Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onClick={handleIdeaClick}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <FaLightbulb className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find more ideas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const IdeaDetailPage: React.FC = () => {
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const ideaId = location.pathname.split('/').pop();

  useEffect(() => {
    if (ideaId) {
      loadIdea(parseInt(ideaId));
    }
  }, [ideaId]);

  const loadIdea = async (id: number) => {
    setLoading(true);
    try {
      const ideaData = await ideaService.getIdeaById(id);
      setIdea(ideaData);
    } catch (error) {
      console.error('Error loading idea:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Idea not found</h2>
          <button
            onClick={handleBack}
            className="btn-primary"
          >
            Back to Ideas
          </button>
        </div>
      </div>
    );
  }

  return <IdeaDetail idea={idea} onBack={handleBack} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/idea/:id" element={<IdeaDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App; 