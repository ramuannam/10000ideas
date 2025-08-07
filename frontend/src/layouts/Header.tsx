import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { 
  FaUser, 
  FaLightbulb, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram,
  FaBars,
  FaTimes,
  FaSearch,
  FaBell
} from 'react-icons/fa';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserSignedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">

        {/* Main Navigation */}
        <nav className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                           {/* Logo */}
               <Link to="/" className="flex items-center space-x-3 group">
                 <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                   <FaLightbulb className="text-gray-800 text-sm" />
                 </div>
                 <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                   10000Ideas
                 </span>
               </Link>

                           {/* Desktop Navigation Links */}
               <div className="hidden lg:flex items-center space-x-8">
                 <Link 
                   to="/" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Home
                   {isActive('/') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/categories" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/categories') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Categories
                   {isActive('/categories') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/all-ideas" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/all-ideas') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   All Ideas
                   {isActive('/all-ideas') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/submit-idea" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/submit-idea') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Submit an Idea
                   {isActive('/submit-idea') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/fundraising" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/fundraising') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Fundraising
                   {isActive('/fundraising') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/advisory" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/advisory') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Advisory
                   {isActive('/advisory') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/blog" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/blog') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   Blog
                   {isActive('/blog') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
                 <Link 
                   to="/about" 
                   className={`relative text-base font-bold transition-all duration-200 ${
                     isActive('/about') 
                       ? 'text-gray-800' 
                       : 'text-gray-600 hover:text-gray-800'
                   }`}
                   onClick={closeMobileMenu}
                 >
                   About Us
                   {isActive('/about') && (
                     <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-600 rounded-full"></div>
                   )}
                 </Link>
               </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <FaSearch className="text-sm" />
                </button>

                {/* Auth Buttons */}
                {isUserSignedIn ? (
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 relative">
                      <FaBell className="text-sm" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                    >
                      <FaUser className="text-sm" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Sign In/Sign Up
                  </button>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
              <div className="py-4 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for business ideas..."
                    className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="px-4 py-2 space-y-1">
                <Link 
                  to="/" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/categories') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Categories
                </Link>
                <Link 
                  to="/all-ideas" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/all-ideas') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  All Ideas
                </Link>
                <Link 
                  to="/submit-idea" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/submit-idea') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Submit an Idea
                </Link>
                <Link 
                  to="/fundraising" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/fundraising') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Fundraising
                </Link>
                <Link 
                  to="/advisory" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/advisory') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Advisory
                </Link>
                <Link 
                  to="/blog" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/blog') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
                <Link 
                  to="/about" 
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive('/about') 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </>
  );
};

export default Header; 