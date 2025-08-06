import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { 
  FaUser, 
  FaBookmark, 
  FaShoppingCart, 
  FaLightbulb, 
  FaTrophy, 
  FaCog, 
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaStar,
  FaCalendar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

interface User {
  id: number;
  fullName: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

interface SavedIdea {
  id: number;
  idea: {
    id: number;
    title: string;
    description: string;
    category: string;
    investmentNeeded: number;
    imageUrl: string;
  };
  savedAt: string;
  notes?: string;
}

interface UserReview {
  id: number;
  idea: {
    id: number;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface UserReward {
  id: number;
  name: string;
  description: string;
  type: 'BADGE' | 'POINTS' | 'ACHIEVEMENT' | 'MILESTONE';
  pointsValue: number;
  iconUrl?: string;
  earnedAt: string;
  claimed: boolean;
}

interface ProposedIdea {
  id: number;
  title: string;
  description: string;
  category: string;
  investmentNeeded: number;
  difficultyLevel: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  adminNotes?: string;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [rewards, setRewards] = useState<UserReward[]>([]);
  const [proposedIdeas, setProposedIdeas] = useState<ProposedIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    bio: '',
    phoneNumber: '',
    location: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Entrepreneur passionate about innovative business ideas and startups.',
        phoneNumber: '+1 (555) 123-4567',
        location: 'New York, NY',
        role: 'USER',
        emailVerified: true,
        createdAt: '2024-01-15T10:30:00Z',
        lastLogin: '2024-01-20T14:45:00Z'
      });

      setSavedIdeas([
        {
          id: 1,
          idea: {
            id: 1,
            title: 'Smart Vertical Farming for Urban Areas',
            description: 'Automated vertical farming system using IoT sensors and AI for optimal crop management.',
            category: 'Agriculture',
            investmentNeeded: 4000000,
            imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop'
          },
          savedAt: '2024-01-18T09:15:00Z',
          notes: 'Great idea for urban farming'
        }
      ]);

      setReviews([
        {
          id: 1,
          idea: {
            id: 1,
            title: 'Smart Vertical Farming for Urban Areas',
            description: 'Automated vertical farming system using IoT sensors and AI.',
            category: 'Agriculture',
            imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop'
          },
          rating: 5,
          comment: 'Excellent idea with great potential for urban areas. The technology integration is innovative.',
          createdAt: '2024-01-18T10:00:00Z'
        }
      ]);

      setRewards([
        {
          id: 1,
          name: 'First Review',
          description: 'Posted your first review',
          type: 'BADGE',
          pointsValue: 10,
          iconUrl: '/badges/first-review.png',
          earnedAt: '2024-01-18T10:00:00Z',
          claimed: true
        }
      ]);

      setProposedIdeas([
        {
          id: 1,
          title: 'Smart Home Security System',
          description: 'AI-powered home security with facial recognition and mobile alerts.',
          category: 'Technology',
          investmentNeeded: 5000000,
          difficultyLevel: 'Challenging',
          status: 'PENDING',
          submittedAt: '2024-01-15T14:30:00Z'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleSignOut = () => {
    setIsUserSignedIn(false);
    navigate('/');
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    console.log('Open auth modal:', mode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab="Dashboard"
        setActiveTab={() => {}}
        isUserSignedIn={isUserSignedIn}
        openAuthModal={openAuthModal}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaUser className="text-lg" />
                  <span className="font-medium">Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'saved' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBookmark className="text-lg" />
                  <span className="font-medium">Saved Ideas</span>
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'reviews' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaStar className="text-lg" />
                  <span className="font-medium">My Reviews</span>
                </button>

                <button
                  onClick={() => setActiveTab('proposed')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'proposed' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaLightbulb className="text-lg" />
                  <span className="font-medium">Proposed Ideas</span>
                </button>

                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'rewards' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaTrophy className="text-lg" />
                  <span className="font-medium">Reward Shelf</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-blue-900 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaCog className="text-lg" />
                  <span className="font-medium">Settings</span>
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
              <p className="text-gray-600">Welcome to your dashboard! Select a section from the left navigation to get started.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard; 