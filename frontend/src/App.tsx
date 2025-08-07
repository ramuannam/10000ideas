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
  FaUser,
  FaNewspaper,
  FaBook,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
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
    try {
    setLoading(true);
      const ideasData = await ideaService.getIdeasWithFilters(filters);
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

  const handleFeaturedIdeaClick = (ideaId: string) => {
    navigate(`/idea/${ideaId}`);
  };

  const handleToggleFavorite = (ideaId: string) => {
    // Handle favorite toggle logic
    console.log('Toggle favorite for idea:', ideaId);
  };

  // Sample featured ideas for demonstration - matching Idea interface
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
       imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
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
      title: 'Eco-Friendly Cleaning Products',
      description: 'Natural cleaning products made from locally sourced ingredients, targeting health-conscious consumers.',
      category: 'Manufacturing',
      sector: 'Manufacturing',
      investmentNeeded: 1200000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Women entrepreneurs can start from home with minimal investment'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Manufacturing']
    },
    {
      id: 8,
      title: 'Online Tutoring Platform',
      description: 'Digital platform connecting students with qualified tutors for personalized learning experiences.',
      category: 'Education',
      sector: 'Service',
      investmentNeeded: 300000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Teachers can earn extra income from home'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    },
    {
      id: 9,
      title: 'Artisanal Coffee Roasting',
      description: 'Small-batch coffee roasting business focusing on premium quality and unique flavor profiles.',
      category: 'Food & Beverage',
      sector: 'Food',
      investmentNeeded: 1500000,
      expertiseNeeded: 'Moderate',
      specialAdvantages: ['Coffee farmers get better prices through direct sourcing'],
      difficultyLevel: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Food & Beverage']
    },
    {
      id: 10,
      title: 'Digital Marketing Agency',
      description: 'Full-service digital marketing agency specializing in social media, SEO, and content marketing.',
      category: 'Professional Services',
      sector: 'Service',
      investmentNeeded: 500000,
      expertiseNeeded: 'Moderate',
      specialAdvantages: ['Freelancers can collaborate remotely'],
      difficultyLevel: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    },
         {
       id: 11,
       title: 'Handmade Jewelry Business',
       description: 'Artisanal jewelry making using traditional techniques and modern designs for the fashion-conscious market.',
       category: 'Fashion',
       sector: 'Manufacturing',
       investmentNeeded: 600000,
       expertiseNeeded: 'Easy',
       specialAdvantages: ['Artisans preserve traditional craftsmanship'],
       difficultyLevel: 'Easy',
       imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
       isActive: true,
       targetAudience: ['Manufacturing']
     },
    {
      id: 12,
      title: 'Pet Care Services',
      description: 'Comprehensive pet care services including grooming, walking, and pet sitting for busy pet owners.',
      category: 'Professional Services',
      sector: 'Service',
      investmentNeeded: 300000,
      expertiseNeeded: 'Easy',
      specialAdvantages: ['Animal lovers can turn passion into business'],
      difficultyLevel: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop',
      isActive: true,
      targetAudience: ['Service Ideas']
    }
  ];

  const categories = [
    'Technology',
    'Agriculture', 
    'Fashion',
    'Food & Beverage',
    'Manufacturing',
    'Professional Services',
    'Education',
    'For Women'
  ];

  const locations = [
    'India',
    'USA',
    'Europe',
    'Canada',
    'Australia',
    'UK',
    'Germany',
    'France'
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header />
      
      {/* Category Icons Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-4 border-b border-gray-200 w-full relative z-0">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex justify-center space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { 
                title: "For Women", 
                icon: IoWomanOutline, 
                color: "bg-gradient-to-br from-pink-400 to-pink-600",
                hoverColor: "hover:from-pink-500 hover:to-pink-700"
              },
              { 
                title: "Technology", 
                icon: FaLaptopCode, 
                color: "bg-gradient-to-br from-blue-400 to-blue-600",
                hoverColor: "hover:from-blue-500 hover:to-blue-700"
              },
              { 
                title: "Agriculture", 
                icon: GiFarmTractor, 
                color: "bg-gradient-to-br from-green-400 to-green-600",
                hoverColor: "hover:from-green-500 hover:to-green-700"
              },
              { 
                title: "Manufacturing", 
                icon: MdEngineering, 
                color: "bg-gradient-to-br from-purple-400 to-purple-600",
                hoverColor: "hover:from-purple-500 hover:to-purple-700"
              },
              { 
                title: "Food & Beverage", 
                icon: IoRestaurantOutline, 
                color: "bg-gradient-to-br from-orange-400 to-orange-600",
                hoverColor: "hover:from-orange-500 hover:to-orange-700"
              },
              { 
                title: "Fashion", 
                icon: GiDress, 
                color: "bg-gradient-to-br from-red-400 to-red-600",
                hoverColor: "hover:from-red-500 hover:to-red-700"
              },
              { 
                title: "Services", 
                icon: FaUser, 
                color: "bg-gradient-to-br from-teal-400 to-teal-600",
                hoverColor: "hover:from-teal-500 hover:to-teal-700"
              }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${category.color} ${category.hoverColor} flex items-center justify-center mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 relative z-0`}>
                    <IconComponent className="text-white text-2xl sm:text-3xl" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-blue-600 border-b border-blue-700 shadow-sm w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
            {/* Search Input */}
            <div className="flex-1 min-w-0 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className={selectedCategory ? "text-gray-900" : "text-gray-500"}>
                  {selectedCategory || "Select Category"}
                </span>
                <FaChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto min-w-[150px] max-w-xs">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm sm:text-base hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className={selectedLocation ? "text-gray-900" : "text-gray-500"}>
                  {selectedLocation || "Select Location"}
                </span>
                <FaChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLocationOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto min-w-[150px] max-w-xs">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsLocationOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm sm:text-base hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 py-8 relative overflow-hidden w-full">
          {/* 3D Decorative Elements */}
          <div className="absolute top-8 left-8 w-6 h-6 bg-white rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-16 right-32 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="absolute bottom-16 left-16 w-8 h-8 bg-white rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
          
          {/* Curved Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 border-4 border-white opacity-20 rounded-full"></div>
          <div className="absolute bottom-0 right-32 w-64 h-64 border-2 border-white opacity-15 rounded-full"></div>
          
          {/* Random Business/Startup Icons - Scattered */}
          <div className="absolute top-12 left-16 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.2s' }}>
            <FaLightbulb className="text-white text-lg" />
          </div>
          
          <div className="absolute top-24 right-20 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.8s' }}>
            <FaRocket className="text-white text-sm" />
          </div>
          
          <div className="absolute top-1/3 left-8 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}>
            <FaLaptopCode className="text-white text-xl" />
          </div>
          
          <div className="absolute top-1/4 right-12 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.2s' }}>
            <FaUser className="text-yellow-500 text-lg" />
          </div>
          
          <div className="absolute bottom-1/3 left-24 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.6s' }}>
            <FaEnvelope className="text-white text-sm" />
          </div>
          
          <div className="absolute bottom-1/4 right-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
            <FaLightbulb className="text-white text-xl" />
          </div>
          
          <div className="absolute top-1/2 left-32 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.3s' }}>
            <FaRocket className="text-white text-lg" />
          </div>
          
          <div className="absolute bottom-12 right-24 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.9s' }}>
            <FaLaptopCode className="text-white text-sm" />
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 transform hover:scale-105 transition-transform duration-300 text-gray-800 drop-shadow-lg">
                Discover 10,000+ Business Ideas
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-gray-700 drop-shadow-md">
                Find the perfect business opportunity that matches your skills and investment capacity
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-0">
                <button
                  onClick={() => openAuthModal('signup')}
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="border-2 border-gray-800 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </section>

                 {/* Main Content and Right Panel Layout */}
         <section className="py-2 bg-white w-full">
           <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
             <div className="flex flex-col lg:flex-row gap-4">
               {/* Main Content */}
               <div className="flex-[0.8] min-w-0">
        {/* Find Your Idea Section */}
                <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
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
              className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 w-full"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {[
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
                  className="flex-shrink-0 w-64 sm:w-80 cursor-pointer group"
                  style={{ scrollSnapAlign: 'start' }}
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                >
                  <div className={`${idea.bgColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 w-full`}>
                    <div className="h-40 sm:h-48 overflow-hidden bg-gray-200">
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
                    <div className="p-3 sm:p-4 text-center">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg">{idea.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Featured Ideas Section */}
                   <section className="pt-2 pb-4 bg-gray-50 rounded-xl w-full">
                     <div className="px-2 sm:px-4">
               <div className="flex items-center justify-between mb-4">
                 <button
                   onClick={() => {
                     setActiveTab('All Ideas');
                     navigate('/all-ideas');
                   }}
                   className="text-blue-900 font-semibold hover:underline text-sm sm:text-base"
                 >
                   View All
                 </button>
               </div>
               
                       <div 
                         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full"
                       >
                 {featuredIdeas.map((idea) => (
                   <div 
                     key={idea.id} 
                     className="w-full"
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
              </div>

                             {/* Right Side Panel */}
               <div className="flex-[0.2] min-w-0">
                 <div className="lg:sticky lg:top-8 space-y-4 w-full">
                                     {/* Classifieds Section */}
                   <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full">
                     <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-2 sm:px-3 py-2">
                       <h3 className="text-sm sm:text-base font-bold text-white flex items-center">
                         <FaNewspaper className="mr-2" />
                         Classifieds
                       </h3>
                     </div>
                     <div className="p-2 sm:p-3 space-y-2">
                      {[
                        {
                          title: "New Business Opportunity",
                          description: "Local restaurant looking for delivery partners",
                          date: "2 hours ago",
                          icon: "🍕"
                        },
                        {
                          title: "Investment Opportunity",
                          description: "Tech startup seeking angel investors",
                          date: "5 hours ago",
                          icon: "💼"
                        },
                        {
                          title: "Partnership Available",
                          description: "E-commerce platform seeking suppliers",
                          date: "1 day ago",
                          icon: "🤝"
                        },
                        {
                          title: "Franchise Opportunity",
                          description: "Popular coffee chain expanding",
                          date: "2 days ago",
                          icon: "☕"
                        }
                      ].map((item, index) => (
                                                 <div key={index} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                           <div className="text-lg sm:text-xl">{item.icon}</div>
                           <div className="flex-1 min-w-0">
                             <h4 className="font-semibold text-gray-900 text-xs truncate">{item.title}</h4>
                             <p className="text-gray-600 text-xs mt-1">{item.description}</p>
                             <p className="text-gray-400 text-xs mt-1">{item.date}</p>
                           </div>
                         </div>
                      ))}
                    </div>
                  </div>

                                     {/* Resources Section */}
                   <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full">
                     <div className="bg-gradient-to-r from-green-600 to-green-700 px-2 sm:px-3 py-2">
                       <h3 className="text-sm sm:text-base font-bold text-white flex items-center">
                         <FaBook className="mr-2" />
                         Resources
                       </h3>
                     </div>
                     <div className="p-2 sm:p-3 space-y-2">
                      {[
                        {
                          title: "Business Plan Template",
                          description: "Free downloadable templates",
                          icon: "📋",
                          link: "#"
                        },
                        {
                          title: "Funding Guide",
                          description: "Complete guide to business funding",
                          icon: "💰",
                          link: "#"
                        },
                        {
                          title: "Market Research Tools",
                          description: "Tools for market analysis",
                          icon: "📊",
                          link: "#"
                        },
                        {
                          title: "Legal Resources",
                          description: "Business registration & compliance",
                          icon: "⚖️",
                          link: "#"
                        },
                        {
                          title: "Mentorship Program",
                          description: "Connect with experienced entrepreneurs",
                          icon: "👨‍💼",
                          link: "#"
                        },
                        {
                          title: "Success Stories",
                          description: "Real entrepreneur success stories",
                          icon: "🏆",
                          link: "#"
                        }
                      ].map((resource, index) => (
                                                 <a 
                           key={index} 
                           href={resource.link}
                           className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                         >
                           <div className="text-base sm:text-lg group-hover:scale-110 transition-transform">{resource.icon}</div>
                           <div className="flex-1 min-w-0">
                             <h4 className="font-semibold text-gray-900 text-xs group-hover:text-blue-600 transition-colors">{resource.title}</h4>
                             <p className="text-gray-600 text-xs mt-1">{resource.description}</p>
                           </div>
                           <FaChevronRight className="text-gray-400 text-xs group-hover:text-blue-600 transition-colors" />
                         </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 w-full">
          <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Stay Ahead with Fresh Ideas! 💡
              </h2>
              <p className="text-base sm:text-lg text-blue-100">
                Get the latest business ideas and startup tips delivered to your inbox
              </p>
            </div>

            {/* Centered Newsletter Form */}
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20 w-full max-w-sm">
                <div className="mb-3 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Join 10,000+ Entrepreneurs</h3>
                  <p className="text-sm sm:text-base text-blue-100">Weekly ideas that grow your business</p>
                </div>
                
                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm text-sm sm:text-base"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FaEnvelope className="text-blue-200 text-sm sm:text-base" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    Subscribe Now 🚀
                  </button>
                </form>
                
                <p className="text-blue-200 text-xs sm:text-sm mt-2 text-center">
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
        <div className="min-h-screen bg-gray-50 overflow-x-hidden" style={{ boxSizing: 'border-box' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
              * {
                box-sizing: border-box;
              }
              body {
                overflow-x: hidden;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `
          }} />
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
