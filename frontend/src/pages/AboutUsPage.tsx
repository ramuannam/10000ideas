import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';

const AboutUsPage: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode } = useAuth();

  const handleAuthSuccess = (userData: any) => {
    console.log('User authenticated:', userData);
  };

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
                About 10000Ideas
              </h1>
              <p className="text-xl mb-8">
                Empowering entrepreneurs with innovative business opportunities
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Mission
              </h2>
              
              <div className="prose prose-lg mx-auto">
                <p className="text-gray-700 mb-6">
                  10000Ideas is a comprehensive platform dedicated to helping entrepreneurs discover 
                  innovative business opportunities that match their skills, interests, and investment capacity. 
                  We believe that everyone has the potential to become a successful entrepreneur with the right idea and guidance.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our platform features thousands of carefully curated business ideas across various industries, 
                  complete with detailed analysis, investment requirements, market insights, and implementation strategies. 
                  Whether you're a seasoned entrepreneur or just starting your journey, we provide the resources 
                  you need to turn your dreams into reality.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What We Offer
                </h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Comprehensive business idea database with detailed analysis</li>
                  <li>Investment requirements and funding options for each idea</li>
                  <li>Government grants and schemes information</li>
                  <li>Market research and competitive analysis</li>
                  <li>Implementation strategies and success stories</li>
                  <li>Community support and networking opportunities</li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Values
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Innovation</h4>
                    <p className="text-gray-600 text-sm">
                      We constantly seek and promote innovative business ideas that solve real problems.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Community</h4>
                    <p className="text-gray-600 text-sm">
                      We believe in the power of community and collaboration in entrepreneurship.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Growth</h4>
                    <p className="text-gray-600 text-sm">
                      We're committed to helping entrepreneurs grow and succeed in their ventures.
                    </p>
                  </div>
                </div>
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

export default AboutUsPage; 