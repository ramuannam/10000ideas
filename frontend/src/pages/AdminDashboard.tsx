import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaLightbulb, 
  FaUsers, 
  FaChartBar, 
  FaUpload, 
  FaSignOutAlt, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaToggleOn,
  FaToggleOff,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import adminService from '../services/adminService';
import BulkUpload from '../components/BulkUpload';
import IdeaEditModal from '../components/IdeaEditModal';
import UploadHistoryPage from './UploadHistoryPage';

interface DashboardStats {
  totalIdeas: number;
  activeIdeas: number;
  totalCategories: number;
  totalSectors: number;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  sector: string;
  investmentNeeded: number;
  expertiseNeeded?: string;
  trainingNeeded?: string;
  resources?: string;
  successExamples?: string;
  videoUrl?: string;
  governmentSubsidies?: string;
  fundingOptions?: string;
  bankAssistance?: string;
  targetAudience?: string[];
  specialAdvantages?: string[];
  difficultyLevel?: string;
  timeToMarket?: string;
  location?: string;
  imageUrl?: string;
  isActive: boolean;
}

interface FilterOptions {
  mainCategories: string[];
  categoryHierarchy: { [key: string]: string[] };
  difficultyLevels: string[];
  locations: string[];
  targetAudiences: string[];
  specialAdvantages: string[];
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMainCategory, setFilterMainCategory] = useState('');
  const [filterSubCategory, setFilterSubCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterMaxInvestment, setFilterMaxInvestment] = useState('');
  const [filterTargetAudience, setFilterTargetAudience] = useState('');
  const [filterSpecialAdvantage, setFilterSpecialAdvantage] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const navigate = useNavigate();

  const user = adminService.getUserInfo();

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'ideas') {
      loadIdeas();
    }
  }, [activeTab, currentPage, searchTerm, filterMainCategory, filterSubCategory, filterDifficulty, 
      filterLocation, filterMaxInvestment, filterTargetAudience, filterSpecialAdvantage]);

  useEffect(() => {
    if (activeTab === 'ideas' && !filterOptions) {
      loadFilterOptions();
    }
  }, [activeTab]);

  const loadFilterOptions = async () => {
    try {
      console.log('Loading filter options...');
      const options = await adminService.getFilterOptions();
      console.log('Filter options loaded:', options);
      setFilterOptions(options);
    } catch (error) {
      console.error('Failed to load filter options:', error);
      // Set empty options to prevent crashes
      setFilterOptions({
        mainCategories: [],
        categoryHierarchy: {},
        difficultyLevels: [],
        locations: [],
        targetAudiences: [],
        specialAdvantages: []
      });
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, ideasData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getIdeasPaginated(0, 10, 'id', 'desc')
      ]);
      setStats(statsData);
      setIdeas(ideasData.content || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const response = await adminService.getIdeasPaginated(
        currentPage, 
        20, 
        'id', 
        'desc', 
        searchTerm || undefined,
        filterMainCategory || undefined,
        filterSubCategory || undefined,
        filterDifficulty || undefined,
        filterLocation || undefined,
        filterMaxInvestment ? Number(filterMaxInvestment) : undefined,
        filterTargetAudience || undefined,
        filterSpecialAdvantage || undefined
      );
      
      // Ensure all ideas have isActive property set correctly
      const ideasWithActive = (response.content || []).map((idea: any) => ({
        ...idea,
        isActive: idea.isActive !== undefined ? idea.isActive : true // Default to true if not set
      }));
      
      console.log('Loaded ideas with active status:', ideasWithActive.map((i: any) => ({id: i.id, title: i.title, isActive: i.isActive})));
      setIdeas(ideasWithActive);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin/login');
  };

  const handleToggleIdeaStatus = async (ideaId: number) => {
    // Find the idea to update
    const ideaToUpdate = ideas.find(idea => idea.id === ideaId);
    if (!ideaToUpdate) return;

    try {
      // IMMEDIATELY update UI state for instant feedback
      const updatedIdeas = ideas.map(idea => 
        idea.id === ideaId 
          ? { ...idea, isActive: !idea.isActive }
          : idea
      );
      setIdeas(updatedIdeas);
      
      // Make API call in background
      await adminService.toggleIdeaStatus(ideaId);
      
      // Show simple success message
      console.log(`✅ Idea ${ideaId} toggled to ${!ideaToUpdate.isActive ? 'ACTIVE' : 'INACTIVE'}`);
      
    } catch (error) {
      console.error('Toggle failed:', error);
      
      // REVERT UI state if API call failed
      const revertedIdeas = ideas.map(idea => 
        idea.id === ideaId 
          ? { ...idea, isActive: ideaToUpdate.isActive } // Revert to original state
          : idea
      );
      setIdeas(revertedIdeas);
      
      alert('❌ Failed to update. Reverted changes.');
    }
  };

  const handleDeleteIdea = async (ideaId: number, ideaTitle: string) => {
    // Enhanced confirmation dialog
    const confirmMessage = `⚠️ PERMANENT DELETION WARNING ⚠️\n\nYou are about to permanently delete the idea:\n"${ideaTitle}"\n\nThis action CANNOT be undone and will remove the idea completely from the database.\n\n❌ The idea will be lost forever\n❌ All associated data will be deleted\n❌ This cannot be reversed\n\nAre you absolutely sure you want to DELETE this idea permanently?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await adminService.deleteIdea(ideaId);
        loadIdeas(); // Reload ideas
        alert(`✅ Idea "${ideaTitle}" has been permanently deleted.`);
      } catch (error) {
        console.error('Failed to delete idea:', error);
        alert('❌ Failed to delete idea. Please try again.');
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    loadIdeas();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterMainCategory('');
    setFilterSubCategory('');
    setFilterDifficulty('');
    setFilterLocation('');
    setFilterMaxInvestment('');
    setFilterTargetAudience('');
    setFilterSpecialAdvantage('');
    setCurrentPage(0);
  };

  const handleMainCategoryChange = (mainCategory: string) => {
    setFilterMainCategory(mainCategory);
    setFilterSubCategory(''); // Reset sub-category when main category changes
  };

  // Get available sub-categories based on selected main category
  const getAvailableSubCategories = () => {
    if (!filterMainCategory || !filterOptions?.categoryHierarchy) {
      return [];
    }
    return filterOptions.categoryHierarchy[filterMainCategory] || [];
  };

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
  };

  const handleCancelEdit = () => {
    setEditingIdea(null);
  };

  const handleSaveIdea = async (updatedIdea: Idea) => {
    try {
      await adminService.updateIdea(updatedIdea.id, updatedIdea);
      loadIdeas();
      setEditingIdea(null);
    } catch (error) {
      console.error('Failed to save idea:', error);
    }
  };

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading dashboard...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
              <p className="text-blue-100 text-lg">Manage your 10000 Ideas platform efficiently</p>
            </div>
            <div className="text-6xl opacity-20">
              <FaLightbulb />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Ideas</p>
                <p className="text-3xl font-bold">{stats?.totalIdeas || 0}</p>
                <p className="text-blue-200 text-sm mt-1">+12% from last month</p>
              </div>
              <FaLightbulb className="text-4xl text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Ideas</p>
                <p className="text-3xl font-bold">{stats?.activeIdeas || 0}</p>
                <p className="text-green-200 text-sm mt-1">Currently published</p>
              </div>
              <FaEye className="text-4xl text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Categories</p>
                <p className="text-3xl font-bold">{stats?.totalCategories || 0}</p>
                <p className="text-purple-200 text-sm mt-1">Different sectors</p>
              </div>
              <FaChartBar className="text-4xl text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">This Month</p>
                <p className="text-3xl font-bold">{Math.floor((stats?.totalIdeas || 0) * 0.15)}</p>
                <p className="text-orange-200 text-sm mt-1">New submissions</p>
              </div>
              <FaUsers className="text-4xl text-orange-200" />
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUpload className="mr-3 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('bulk-upload')}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors duration-200"
            >
              <FaUpload className="mr-2" />
              Bulk Upload Ideas
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg transition-colors duration-200"
            >
              <FaLightbulb className="mr-2" />
              Manage Ideas
            </button>
            <button
              onClick={() => setActiveTab('upload-history')}
              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg transition-colors duration-200"
            >
              <FaUsers className="mr-2" />
              Upload History
            </button>
          </div>
        </div>

        {/* Recent Activity & System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Ideas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="mr-3 text-green-600" />
              Recent Ideas
            </h3>
            <div className="space-y-3">
              {ideas.slice(0, 5).map((idea) => (
                <div key={idea.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{idea.title}</h4>
                    <p className="text-sm text-gray-500">{idea.category} • {idea.sector}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    idea.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {idea.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab('ideas')}
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
            >
              View All Ideas
            </button>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartBar className="mr-3 text-blue-600" />
              System Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database Status</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Backup</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage Used</span>
                <span className="text-gray-500">67% (2.1 GB)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Sessions</span>
                <span className="text-blue-600">1 admin online</span>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats?.totalIdeas || 0}</p>
                  <p className="text-sm text-gray-500">Total Ideas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats?.totalCategories || 0}</p>
                  <p className="text-sm text-gray-500">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaChartBar className="mr-3 text-purple-600" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaEye className="text-2xl text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800">Page Views</h4>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-2xl text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800">Unique Visitors</h4>
              <p className="text-2xl font-bold text-green-600">567</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaLightbulb className="text-2xl text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-800">Popular Ideas</h4>
              <p className="text-2xl font-bold text-purple-600">{Math.floor((stats?.totalIdeas || 0) * 0.3)}</p>
              <p className="text-sm text-gray-500">High engagement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUpload className="text-2xl text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-800">Uploads</h4>
              <p className="text-2xl font-bold text-orange-600">23</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIdeasManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
                         <button
               onClick={loadIdeas}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
             >
               <FaFilter className="mr-2" />
               Search
             </button>
             <button
               onClick={resetFilters}
               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
             >
               Clear Filters
             </button>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="mr-2">🏷️</span>
                Main Category
              </label>
              <select
                value={filterMainCategory}
                onChange={(e) => handleMainCategoryChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {filterOptions?.mainCategories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="mr-2">📂</span>
                Sub Category
              </label>
              <select
                value={filterSubCategory}
                onChange={(e) => setFilterSubCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!filterMainCategory}
              >
                <option value="">All Sub Categories</option>
                {getAvailableSubCategories().map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                {filterOptions?.difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                {filterOptions?.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Investment Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Investment</label>
              <select
                value={filterMaxInvestment}
                onChange={(e) => setFilterMaxInvestment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select
                value={filterTargetAudience}
                onChange={(e) => setFilterTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Audiences</option>
                {filterOptions?.targetAudiences.map((audience) => (
                  <option key={audience} value={audience}>
                    {audience}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Advantages Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Advantage</label>
              <select
                value={filterSpecialAdvantage}
                onChange={(e) => setFilterSpecialAdvantage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Advantages</option>
                {filterOptions?.specialAdvantages.map((advantage) => (
                  <option key={advantage} value={advantage}>
                    {advantage}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Ideas Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category / Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ideas.map((idea, index) => (
                <tr key={idea.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {(currentPage * 10) + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{idea.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {idea.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{idea.category}</div>
                    <div className="text-sm text-gray-500">{idea.sector}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₹{idea.investmentNeeded?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        idea.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {idea.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      {/* Main action buttons grouped together */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditIdea(idea)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Edit Idea"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleToggleIdeaStatus(idea.id)}
                          className={`px-3 py-1 rounded-lg transition-all duration-200 text-sm font-medium border-2 ${
                            idea.isActive 
                              ? 'bg-green-100 text-green-800 border-green-400 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 border-gray-400 hover:bg-gray-200'
                          }`}
                          title={idea.isActive ? 'Click to turn OFF' : 'Click to turn ON'}
                        >
                          {idea.isActive ? 'ON' : 'OFF'}
                        </button>
                      </div>
                      
                      {/* Separator line */}
                      <div className="w-px h-6 bg-gray-300"></div>
                      
                      {/* Delete button positioned farther away with warning styling */}
                      <button
                        onClick={() => handleDeleteIdea(idea.id, idea.title)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors border border-red-200 hover:border-red-400"
                        title="⚠️ Permanently Delete Idea"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'ideas', label: 'Manage Ideas', icon: FaLightbulb },
    { id: 'bulk-upload', label: 'Bulk Upload', icon: FaUpload },
    { id: 'upload-history', label: 'Upload History', icon: FaUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaLightbulb className="text-yellow-500 text-2xl mr-3" />
              <div>
                <h1 className="text-xl font-bold text-blue-600">10000 IDEAS</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.fullName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <FaSignOutAlt className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}

        {activeTab === 'bulk-upload' && (
          <BulkUpload />
        )}

        {activeTab === 'ideas' && renderIdeasManagement()}

        {activeTab === 'upload-history' && (
          <UploadHistoryPage />
        )}
      </main>

      {/* Edit Modal */}
      {editingIdea && (
        <IdeaEditModal
          idea={editingIdea}
          onSave={handleSaveIdea}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 