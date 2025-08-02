import React from 'react';
import { FaLightbulb, FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Social Media */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                <FaLightbulb className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-blue-900">10000IDEAS</span>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Follow us on social media</h3>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                  <FaFacebookF className="text-white text-lg" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                  <FaInstagram className="text-white text-lg" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                  <FaPinterest className="text-white text-lg" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                  <FaTwitter className="text-white text-lg" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                  <FaYoutube className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">CATEGORIES</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-900 transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Manufacturing</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">For Women</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Agriculture</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Food & Beverages</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-900 transition-colors">The company</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Who We Are</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">The Journal</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">MORE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-900 transition-colors">Help center</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">News</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold">DISCLAIMER :</span>10000ideas is only an intermediary offering for exchange of ideas . offers it's platform to advertise products of seller for a subscriber /ideas seeker User coming on its website and is not and cannot be a party to or privy to or control in any manner any transactions between the seller and the subscriber.All the information , offers, subsidies, funding options, execution process on this website have been extended by various stake holders of the respective industries who have features their products. 10000ideas is only communicating the ideas and not selling or rendering any of those ideas or services. It neither warrants nor is it making any representations with respect to offer(s) made on the site. 10000ideas shall neither be responsible nor liable to mediate or resolve any disputes or disagreements between the subscribers /buyer/user and the seller and both seller and subscriber /buyer/user shall settle all such disputes without involving 10000 ideas or its parent companies in any manner.
            </p>
          </div>
          
          {/* Bottom Links */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap space-x-4 text-xs text-gray-600">
              <a href="#" className="hover:text-blue-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-900 transition-colors">CA Transparency Act</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Do Not Sell or Share My Personal Information</a>
            </div>
            <div className="text-xs text-gray-600">
              © 2025 All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 