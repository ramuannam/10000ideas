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
import { MAIN_CATEGORIES } from './constants/categories';
import { HARDCODED_IDEAS } from './constants/allIdeas';
import IdeaCardGrid from './components/AllIdeas/IdeaCardGrid';
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
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isUserSignedIn={isUserSignedIn}
        openAuthModal={openAuthModal}
        handleSignOut={handleSignOut}
      />

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

      {/* Hero Section */}
      <section className="bg-yellow-400 py-6 px-6 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 opacity-90"></div>
        
        {/* Floating Clouds */}
        <div className="absolute top-4 left-10 w-16 h-8 bg-white rounded-full opacity-40 animate-float shadow-lg"></div>
        <div className="absolute top-8 right-20 w-12 h-6 bg-white rounded-full opacity-30 animate-float shadow-lg" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-6 left-32 w-20 h-10 bg-white rounded-full opacity-35 animate-float shadow-lg" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-12 left-1/3 w-14 h-7 bg-white rounded-full opacity-25 animate-float shadow-lg" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-10 right-40 w-18 h-9 bg-white rounded-full opacity-30 animate-float shadow-lg" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-6 right-1/3 w-10 h-5 bg-white rounded-full opacity-20 animate-float shadow-lg" style={{animationDelay: '2.5s'}}></div>
        
        {/* Premium Light Rays */}
        <div className="absolute top-0 left-1/4 w-1 h-12 bg-yellow-200 opacity-30 animate-pulse blur-sm"></div>
        <div className="absolute top-0 right-1/4 w-1 h-12 bg-yellow-200 opacity-30 animate-pulse blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-3/4 w-1 h-12 bg-yellow-200 opacity-30 animate-pulse blur-sm" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-16 left-16 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-20 right-24 w-1 h-1 bg-yellow-100 rounded-full opacity-50 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-24 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-16 w-2 h-2 bg-yellow-100 rounded-full opacity-40 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-24 left-1/2 w-1 h-1 bg-white rounded-full opacity-50 animate-ping" style={{animationDelay: '1.5s'}}></div>
        
        {/* Premium Geometric Shapes */}
        <div className="absolute top-8 left-1/4 w-3 h-3 bg-blue-300 opacity-20 rounded transform rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-12 right-1/4 w-4 h-4 bg-green-300 opacity-15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-14 right-1/3 w-2 h-2 bg-red-300 opacity-25 rounded transform rotate-12 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            {/* Left side - Creative Illustration */}
            <div className="flex-1 relative flex justify-center items-center">
              <div className="relative">
                {/* Creative Illustration - replace with your image */}
                <img 
                  src="/image3.png"
                  alt="Creative entrepreneur with lightbulb rocket illustration"
                  className="w-64 h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
                
                {/* Optional: Floating elements around the image */}
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-70 shadow-lg"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 animate-pulse">
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 shadow-lg"></div>
                </div>
                <div className="absolute top-1/3 -left-6 animate-float">
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-50 shadow-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Center - Text content */}
            <div className="flex-2 text-center relative mx-8">
                          <h1 className="text-4xl font-bold text-blue-900 mb-3 leading-tight" style={{fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '700'}}>
              <div>Business <span className="text-blue-900 font-extrabold text-5xl drop-shadow-lg transform hover:scale-105 transition-transform duration-300">IDEAS</span></div>
              <div>at your</div>
              <div>fingertips</div>
            </h1>
              <p className="text-base text-gray-700 mb-4 whitespace-nowrap">
                Discover thousands of innovative business ideas across different industries
              </p>
              
              {/* CTA Buttons */}
              <div className="flex justify-center space-x-3">
                <button 
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                  className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-lg text-sm"
                >
                  View All
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('All Ideas');
                    navigate('/all-ideas');
                  }}
                  className="bg-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-lg text-sm"
                >
                  View By Category
                </button>
              </div>
            </div>
            
            {/* Right side - 3D Flying Rocket moved further right */}
            <div className="flex-1 flex justify-end items-center">
              <div className="relative mr-8">
                {/* 3D Rocket Container */}
                <div className="w-56 h-56 relative flex items-center justify-center">
                  {/* Main Rocket - flying upward diagonally */}
                  <div className="relative transform rotate-12 hover:scale-110 transition-transform duration-500 animate-rocket-fly">
                    {/* Rocket Body - improved shape */}
                    <div className="w-14 h-40 bg-gradient-to-b from-gray-100 to-white rounded-t-full relative border-2 border-gray-300 shadow-2xl">
                      {/* Rocket Nose Cone */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-gradient-to-t from-red-500 to-red-400 rounded-t-full shadow-lg border border-red-600"></div>
                      
                      {/* Rocket Body Sections */}
                      <div className="absolute top-6 left-0 right-0 h-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded shadow-inner"></div>
                      <div className="absolute top-16 left-0 right-0 h-4 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded shadow-inner"></div>
                      <div className="absolute top-24 left-0 right-0 h-6 bg-gradient-to-r from-red-500 to-red-400 rounded shadow-inner"></div>
                      
                      {/* Rocket Windows */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-3 border-yellow-400 shadow-inner">
                        <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1 opacity-80"></div>
                      </div>
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-yellow-400 shadow-inner">
                        <div className="w-1 h-1 bg-white rounded-full mt-1 ml-1 opacity-80"></div>
                      </div>
                      
                      {/* Rocket Fins - improved design */}
                      <div className="absolute bottom-0 -left-3 w-6 h-12 bg-gradient-to-br from-blue-700 to-blue-800 transform rotate-12 rounded-bl-lg shadow-lg border border-blue-900"></div>
                      <div className="absolute bottom-0 -right-3 w-6 h-12 bg-gradient-to-bl from-blue-700 to-blue-800 transform -rotate-12 rounded-br-lg shadow-lg border border-blue-900"></div>
                      
                      {/* Center Fin */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-b-lg shadow-lg border border-blue-800"></div>
                    </div>
                    
                    {/* Rocket Exhaust Flames - enhanced */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      {/* Main flame */}
                      <div className="w-6 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-b-full animate-pulse opacity-90 shadow-lg"></div>
                      {/* Inner flame */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-b-full animate-pulse"></div>
                      {/* Core flame */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-white to-yellow-200 rounded-b-full animate-pulse"></div>
                      
                      {/* Side exhaust */}
                      <div className="absolute top-0 -left-1 w-2 h-6 bg-gradient-to-bl from-orange-400 to-red-500 rounded-bl-full animate-pulse opacity-70 transform -rotate-12"></div>
                      <div className="absolute top-0 -right-1 w-2 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-br-full animate-pulse opacity-70 transform rotate-12"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Flying Trail Effect */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col space-y-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-bounce shadow-lg"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Floating Elements */}
                  <div className="absolute top-6 left-8 animate-float">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80 shadow-lg"></div>
                  </div>
                  
                  <div className="absolute top-12 right-6 animate-float" style={{animationDelay: '0.5s'}}>
                    <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-70 shadow-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-16 left-6 animate-float" style={{animationDelay: '1s'}}>
                    <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-75 shadow-lg"></div>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 animate-float" style={{animationDelay: '1.5s'}}>
                    <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
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

      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
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
    <Router>
              <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit-idea" element={<SubmitIdeaPage />} />
          <Route path="/all-ideas" element={<AllIdeasPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/idea/:id" element={<IdeaDetailPageWrapper />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/upload-history" element={<UploadHistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App; 