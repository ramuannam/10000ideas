import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CategoriesDropdown from '../components/CategoriesDropdown';
import { NAVIGATION_ITEMS } from '../constants/categories';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isUserSignedIn: boolean;
  openAuthModal: (mode: 'signin' | 'signup') => void;
  handleSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isUserSignedIn,
  openAuthModal,
  handleSignOut
}) => {
  const navigate = useNavigate();

  const handleNavClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tab);
    
    if (tab === 'Submit an Idea') {
      navigate('/submit-idea');
    } else if (tab === 'All Ideas') {
      navigate('/all-ideas');
    } else if (tab === 'About us') {
      navigate('/about-us');
    } else if (tab === 'Home') {
      navigate('/');
    }
    // Add other navigation logic as needed
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-blue-900 text-white text-sm py-1">
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
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center text-2xl font-bold text-blue-900 cursor-pointer" onClick={() => navigate('/')}>
                <FaLightbulb className="text-yellow-500 mr-2" />
                10000IDEAS
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                onClick={(e) => handleNavClick('Home', e)}
                className={`transition-colors duration-200 pb-1 ${
                  activeTab === 'Home'
                    ? 'text-blue-900 border-b-2 border-yellow-400'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                Home
              </a>
              
              <CategoriesDropdown activeTab={activeTab} setActiveTab={setActiveTab} />
              
              {NAVIGATION_ITEMS.map((tab) => (
                <a
                  key={tab}
                  href="#"
                  onClick={(e) => handleNavClick(tab, e)}
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

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {!isUserSignedIn ? (
                <button
                  onClick={() => openAuthModal('signin')}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  Sign In / Sign Up
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 text-sm">Welcome back!</span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-blue-900 text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 