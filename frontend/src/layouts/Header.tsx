import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaUser, 
  FaLightbulb, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram 
} from 'react-icons/fa';

const Header: React.FC = () => {
  const location = useLocation();
  const { isUserSignedIn, openAuthModal, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FaEnvelope className="mr-1" />
                info@10000ideas.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="h-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <FaLightbulb className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-800">10000Ideas</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/all-ideas" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/all-ideas') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Ideas
              </Link>
              <Link 
                to="/government-grants" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/government-grants') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Government Grants
              </Link>
              <Link 
                to="/submit-idea" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/submit-idea') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Submit Idea
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isUserSignedIn ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaUser className="text-sm" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 