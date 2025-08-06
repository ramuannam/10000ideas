import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Idea, FilterOptions, FilterData } from './types/index';
import { ideaService } from './services/api';
import IdeaCard from './components/IdeaCard';
import IdeaDetailPage from './components/IdeaDetailPage';
import AuthModal from './components/AuthModal';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import SubmitIdeaPage from './pages/SubmitIdeaPage';
import AllIdeasPage from './pages/AllIdeasPage';
import AboutUsPage from './pages/AboutUsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UploadHistoryPage from './pages/UploadHistoryPage';
import GovernmentGrantsPage from './pages/GovernmentGrantsPage';
import UserDashboard from './pages/UserDashboard';
import { MAIN_CATEGORIES } from './constants/categories';
import { HARDCODED_IDEAS } from './constants/allIdeas';
import IdeaCardGrid from './components/AllIdeas/IdeaCardGrid';
import { authService } from './services/authService';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { 
  FaLightbulb, 
  FaSpinner, 
  FaChevronLeft, 
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
  FaRocket,
  FaLaptopCode,
  FaChevronUp,
  FaChevronDown,
  FaUser
} from 'react-icons/fa';
import {
  IoWomanOutline,
  IoRestaurantOutline
} from 'react-icons/io5';
import { 
  GiDress,
  GiFarmTractor
} from 'react-icons/gi';
import { 
  MdEngineering
} from 'react-icons/md';

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
  const [activeTab, setActiveTab] = useState('Home');
  const { isUserSignedIn, openAuthModal, isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode } = useAuth();
  const navigate = useNavigate();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Authentication state is now handled by AuthProvider
      // You can also fetch user data here if needed
    }
  }, []);

  // Auth functions - now using context
  const handleAuthSuccess = (userData: any) => {
    console.log('User authenticated:', userData);
  };

  const handleSignOut = () => {
    authService.logout();
    navigate('/');
  };

  useEffect(() => {
    loadFilterData();
    loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Featured ideas handlers
  const handleFeaturedIdeaClick = (ideaId: string) => {
    // Navigate to All Ideas page and potentially filter by the idea
    setActiveTab('All Ideas');
    navigate('/all-ideas');
  };

  const handleToggleFavorite = (ideaId: string) => {
    // Toggle favorite functionality - for now just log
    console.log('Toggle favorite for idea:', ideaId);
  };

  const filteredIdeas = ideas;

  // Icon mapping for categories
  const iconMap = {
    IoWomanOutline,
    FaRocket, 
    FaLaptopCode,
    MdEngineering,
    GiFarmTractor,
    IoRestaurantOutline,
    GiDress
  };

  // Featured ideas data - simple ideas that match the original Idea interface
  const featuredIdeas: Idea[] = [
    {
      id: 1,
      title: 'Smart Vertical Farming for Urban Areas',
      description: 'Automated vertical farming system using IoT sensors and AI for optimal crop management in limited urban spaces.',
      category: 'Agriculture',
      sector: 'Agriculture',
      investmentNeeded: 4000000,
      expertiseNeeded: 'Moderate',
      specialAdvantages: ['Rural entrepreneurs can leverage traditional farming knowledge'],
      difficultyLevel: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['New Tech']
    },
    {
      id: 2,
      title: 'AI-Powered Personal Finance Assistant',
      description: 'Intelligent personal finance app that uses AI to provide personalized budgeting, investment advice, and financial planning.',
      category: 'Technology',
      sector: 'Technology',
      investmentNeeded: 16000000,
      expertiseNeeded: 'Challenging',
      specialAdvantages: ['Accessible to lower middle class with micro-investment features'],
      difficultyLevel: 'Challenging',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Unicorn Ideas']
    },
    {
      id: 3,
      title: 'Women-Only Co-working Spaces',
      description: 'Safe, supportive co-working spaces designed specifically for women entrepreneurs and professionals.',
      category: 'For Women',
      sector: 'Service',
      investmentNeeded: 2500000,
      expertiseNeeded: 'Moderate',
      specialAdvantages: ['Single mothers get childcare support and flexible hours'],
      difficultyLevel: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Women Focused']
    },
    {
      id: 4,
      title: 'Sustainable Fashion Brand',
      description: 'Ethical fashion brand using organic materials and traditional Indian craftsmanship techniques.',
      category: 'Fashion',
      sector: 'Fashion',
      investmentNeeded: 2000000,
      expertiseNeeded: 'Moderate',
      specialAdvantages: ['Artisan communities get direct employment opportunities'],
      difficultyLevel: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Manufacturing']
    },
    {
      id: 5,
      title: 'Food Truck Network',
      description: 'Network of gourmet food trucks serving regional cuisines at corporate areas and events.',
      category: 'Food & Beverage',
      sector: 'Food',
      investmentNeeded: 800000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Local chefs can showcase regional specialties'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    },
    {
      id: 6,
      title: 'Mobile Repair & Electronics Service',
      description: 'Door-to-door mobile and electronics repair service targeting middle-class households and small businesses.',
      category: 'Professional Services',
      sector: 'Service',
      investmentNeeded: 400000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Specially abled individuals can work from home doing remote diagnostics'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    },
    {
      id: 7,
      title: 'Eco-Tourism Adventure Packages',
      description: 'Sustainable tourism packages focusing on local culture, wildlife, and environmental conservation.',
      category: 'Travel & Tourism',
      sector: 'Tourism',
      investmentNeeded: 1200000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Rural communities benefit from tourism revenue'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    },
    {
      id: 8,
      title: 'Telemedicine Platform for Rural Areas',
      description: 'Digital healthcare platform connecting rural patients with specialists through video consultations and health monitoring.',
      category: 'Technology',
      sector: 'Healthcare',
      investmentNeeded: 3000000,
      expertiseNeeded: 'Challenging',
      specialAdvantages: ['Government healthcare initiatives provide support and funding'],
      difficultyLevel: 'Challenging',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Rural Focused']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Discover 10,000+ Business Ideas
              </h1>
              <p className="text-xl mb-8">
                Find the perfect business opportunity that matches your skills and investment capacity
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => openAuthModal('signup')}
                  className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Get Started
                </button>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-8">
              {MAIN_CATEGORIES.map((category, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer group">
                  <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    {React.createElement(iconMap[category.icon as keyof typeof iconMap], { className: "text-blue-900 text-4xl" })}
                  </div>
                  <span className="text-sm text-gray-700 text-center">{category.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Your Idea Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Find Your Idea</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const container = document.getElementById('find-ideas-scroll');
                    container?.scrollBy({ left: -320, behavior: 'smooth' });
                  }}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    const container = document.getElementById('find-ideas-scroll');
                    container?.scrollBy({ left: 320, behavior: 'smooth' });
                  }}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>
            <div 
              id="find-ideas-scroll"
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {[
                {
                  title: "For Talkative Women",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "5AM Business Ideas", 
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "High Profit Business Ideas",
                  image: "https://images.unsplash.com/photo-1594736797933-d0ddb447d46e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3", 
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "20 Ideas for Lazy",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "For Senior Citizens",
                  image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "For Students",
                  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                },
                {
                  title: "For Stay-at-Home Moms",
                  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                  bgColor: "bg-yellow-400"
                }
              ].map((idea, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-80 cursor-pointer group"
                  style={{ scrollSnapAlign: 'start' }}
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                >
                  <div className={`${idea.bgColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={idea.image} 
                        alt={idea.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3";
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900 text-lg">{idea.title}</h3>
                    </div>
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
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      const container = document.getElementById('featured-ideas-scroll');
                      container?.scrollBy({ left: -320, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => {
                      const container = document.getElementById('featured-ideas-scroll');
                      container?.scrollBy({ left: 320, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                  className="text-blue-900 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            
            <div 
              id="featured-ideas-scroll"
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {featuredIdeas.map((idea) => (
                <div 
                  key={idea.id} 
                  className="flex-shrink-0 w-80"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <IdeaCard
                    idea={idea}
                    onClick={handleIdeaClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                Stay Ahead with Fresh Ideas! 💡
              </h2>
              <p className="text-lg text-blue-100">
                Get the latest business ideas and startup tips delivered to your inbox
              </p>
            </div>

            {/* Centered Newsletter Form */}
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 max-w-sm w-full">
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Join 10,000+ Entrepreneurs</h3>
                  <p className="text-base text-blue-100">Weekly ideas that grow your business</p>
                </div>
                
                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm text-base"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FaEnvelope className="text-blue-200 text-base" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-4 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
                  >
                    Subscribe Now 🚀
                  </button>
                </form>
                
                <p className="text-blue-200 text-sm mt-3 text-center">
                  ✨ No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

const IdeaDetailPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };

  return <IdeaDetailPage onBack={handleBack} />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/all-ideas" element={<AllIdeasPage />} />
            <Route path="/submit-idea" element={<SubmitIdeaPage />} />
            <Route path="/government-grants" element={<GovernmentGrantsPage />} />
            <Route path="/idea/:id" element={<IdeaDetailPageWrapper />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/upload-history" element={<UploadHistoryPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 