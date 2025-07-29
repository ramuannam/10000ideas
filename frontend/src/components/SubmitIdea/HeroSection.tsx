import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-yellow-400 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full opacity-60"></div>
      <div className="absolute top-16 right-32 w-3 h-3 bg-blue-600 rounded-full"></div>
      <div className="absolute bottom-16 left-16 w-6 h-6 bg-white rounded-full opacity-40"></div>
      
      {/* Curved Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 border-4 border-white opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-32 w-64 h-64 border-2 border-white opacity-15 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Unlock Your Potential:<br />
              Empowering Growth<br />
              and Innovation
            </h1>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white opacity-90">
                WHY SUBMIT AN IDEA
              </h3>
              <p className="text-white text-lg opacity-80 leading-relaxed">
                For a supportive community of<br />
                entrepreneurs, fostering collaboration<br />
                and creating opportunities
              </p>
            </div>

            <button 
              onClick={() => {
                const formSection = document.getElementById('idea-form-section');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit an Idea
            </button>
          </div>

          {/* Right Content - Person Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-96 h-[450px] rounded-2xl overflow-hidden mx-auto shadow-2xl">
                <img 
                  src="/professional-with-notebook.png" 
                  alt="Professional with notebook - representing entrepreneurial spirit" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 