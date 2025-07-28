import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { Idea, FilterOptions, FilterData } from './types/index.ts';
import { ideaService } from './services/api.ts';
import IdeaCard from './components/IdeaCard.tsx';
import FilterSection from './components/FilterSection.tsx';
import IdeaDetail from './components/IdeaDetail.tsx';
import AuthModal from './components/AuthModal.tsx';
import { 
  FaLightbulb, 
  FaSearch, 
  FaSpinner, 
  FaUser, 
  FaShoppingCart, 
  FaChevronLeft, 
  FaChevronRight,
  FaBullhorn,
  FaCreditCard,
  FaEye,
  FaUsers,
  FaFemale,
  FaRocket,
  FaLaptopCode,
  FaCogs,
  FaSeedling,
  FaUtensils,
  FaTshirt
} from 'react-icons/fa';
import { 
  GiFlowerPot,
  GiCook,
  GiDress,
  GiFarmTractor
} from 'react-icons/gi';
import { 
  MdEngineering,
  MdComputer,
  MdRestaurant
} from 'react-icons/md';
import { 
  IoWomanOutline,
  IoRestaurantOutline
} from 'react-icons/io5';

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
  const [activeTab, setActiveTab] = useState('Home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const navigate = useNavigate();

  // Auth functions
  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setIsUserSignedIn(false);
    // Add sign out logic here
  };

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

  const categories = [
    { icon: IoWomanOutline, title: "For women", color: "bg-pink-100" },
    { icon: FaRocket, title: "Startup Ideas", color: "bg-blue-100" },
    { icon: FaLaptopCode, title: "Technology", color: "bg-green-100" },
    { icon: MdEngineering, title: "Manufacturing", color: "bg-orange-100" },
    { icon: GiFarmTractor, title: "Agriculture", color: "bg-yellow-100" },
    { icon: IoRestaurantOutline, title: "Food and Beverage", color: "bg-red-100" },
    { icon: GiDress, title: "Fashion", color: "bg-purple-100" }
  ];

  const featuredIdeas = [
    { title: "For Talkative Women", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300", investment: "₹50K" },
    { title: "5 AM Business Ideas", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300", investment: "₹1L" },
    { title: "High Profit Business Ideas", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300", investment: "₹2L" },
    { title: "20 Ideas for Lazy", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300", investment: "₹25K" },
    { title: "For Senior Citizens", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", investment: "₹75K" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-blue-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-semibold">Over 50% Off on your First Order</span>
            <button className="bg-yellow-400 text-blue-900 px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-500 transition-colors">
              Buy Report Now
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-blue-800 text-white border border-blue-700 rounded px-2 py-1 text-sm cursor-pointer">
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
              <option value="zh">🇨🇳 Chinese</option>
              <option value="hi">🇮🇳 Hindi</option>
              <option value="ar">🇸🇦 Arabic</option>
              <option value="pt">🇧🇷 Portuguese</option>
              <option value="ru">🇷🇺 Russian</option>
              <option value="ja">🇯🇵 Japanese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center text-2xl font-bold text-blue-900">
                <FaLightbulb className="text-yellow-500 mr-2" />
                10000IDEAS
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Categories', 'Blog', 'Fundraising', 'Advisory', 'Submit an Idea', 'About us'].map((tab) => (
                <a
                  key={tab}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                  className={`transition-colors duration-200 pb-1 ${
                    activeTab === tab
                      ? 'text-blue-900 border-b-2 border-yellow-400'
                      : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  {tab}
                </a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Auth Button */}
              {!isUserSignedIn ? (
                <button 
                  onClick={() => openAuthModal('signin')}
                  className="px-4 py-2 bg-yellow-400 text-blue-900 hover:bg-yellow-500 rounded-full transition-colors font-medium text-sm"
                >
                  Sign In / Sign Up
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <FaUser className="text-gray-600" />
                  <span className="text-gray-700">Welcome!</span>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group">
                <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <category.icon className="text-blue-900 text-4xl" />
                </div>
                <span className="text-sm text-gray-700 text-center">{category.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section - Clean and Simple */}
              <section className="bg-yellow-300 py-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="flex items-center justify-center">
              {/* Center - Text and Buttons */}
              <div className="text-center">
                {/* Main Text with Correct Layout */}
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
                  <div className="text-center">Business ideas</div>
                  <div className="text-center" style={{marginLeft: '-140px'}}>at your</div>
                  <div className="text-center italic" style={{fontFamily: 'Georgia, serif'}}>fingertips.</div>
                </h1>

                {/* CTA Buttons */}
                <div className="flex justify-center space-x-4 mb-4">
                  <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors">
                    View All
                  </button>
                  <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors">
                    By categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Find Your Idea Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Find Your Idea</h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {featuredIdeas.map((idea, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                    50% Off
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-600">{idea.investment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Ideas</h2>
            <a href="#" className="text-blue-900 font-semibold hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredIdeas.slice(0, 8).map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onClick={handleIdeaClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
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
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
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