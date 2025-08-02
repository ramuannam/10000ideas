import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube, FaLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import AuthModal from '../components/AuthModal';

const AboutUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About us');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setIsUserSignedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isUserSignedIn={isUserSignedIn}
        openAuthModal={openAuthModal}
        handleSignOut={handleSignOut}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-blue-600 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-400 rounded-full opacity-40"></div>
        
        {/* Dotted Pattern */}
        <div className="absolute top-20 right-60">
          <div className="grid grid-cols-6 gap-2">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center space-x-10 mb-6">
                {/* Profile Image */}
                <div className="relative">
                  <img 
                    src="/founder.jpg"
                    alt="Founder"
                    className="w-56 h-72 object-cover object-top"
                  />
                  <div className="absolute -right-12 -bottom-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg px-4 py-2 text-sm font-bold text-gray-900 shadow-lg">
                    Founder & Visionary
                  </div>
                </div>
                
                {/* Logo */}
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <FaLightbulb className="text-yellow-500 text-4xl mr-4" />
                    <div>
                      <h1 className="text-6xl font-bold text-blue-700">10000</h1>
                      <h2 className="text-4xl font-bold text-blue-700 -mt-3">IDEAS</h2>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg font-medium max-w-lg leading-relaxed">
                    Empowering entrepreneurs with innovative business ideas since 2020. Your gateway to endless possibilities and creative solutions.
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Find us On</h3>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer shadow-md">
                    <FaFacebookF className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer shadow-md">
                    <FaInstagram className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer shadow-md">
                    <FaPinterest className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer shadow-md">
                    <FaTwitter className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-md">
                    <FaYoutube className="text-white text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Decorative Numbers */}
            <div className="relative">
              <div className="text-[200px] font-bold text-gray-200 leading-none opacity-50">
                10000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Who are We */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who are We</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Welcome to 10000 Ideas, India's premier platform for discovering and exploring a wide range of business ideas. Launched in 2020, we are proud to be the only platform in India that collates, aggregates, and offers a diverse collection of business ideas catering to various domains and investment levels.
              </p>

              {/* Business Icons */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🏢</div>
                  <p className="text-white font-medium">Business Innovation</p>
                </div>
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <p className="text-white font-medium">Startup Growth</p>
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                At 10000 Ideas, our vision is to empower aspiring entrepreneurs, innovators, and business enthusiasts by providing them with a curated repository of creative and viable business ideas. By offering a platform to explore, evaluate, contribute their own ideas, to foster creativity, collaboration, and entrepreneurial spirit across the nation.
              </p>

              {/* Mission Points */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Democratize access to innovative business concepts</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Support entrepreneurs at every stage of their journey</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Foster innovation and creative thinking across industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <p className="text-blue-100">Business Ideas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <p className="text-blue-100">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25,000+</div>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-blue-100">Success Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals behind 10000 Ideas who are dedicated to empowering entrepreneurs and fostering innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                description: "Visionary entrepreneur with 15+ years in business development"
              },
              {
                name: "Priya Sharma",
                role: "Head of Innovation",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                description: "Innovation strategist passionate about emerging technologies"
              },
              {
                name: "Amit Patel",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
                description: "Tech leader building scalable platforms for entrepreneurs"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </div>
  );
};

export default AboutUsPage; 