import React, { useState } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import HeroSection from '../components/SubmitIdea/HeroSection';
import StepsNavigation from '../components/SubmitIdea/StepsNavigation';
import IdeaForm from '../components/SubmitIdea/IdeaForm';
import FAQSection from '../components/SubmitIdea/FAQSection';
import AuthModal from '../components/AuthModal';
import { useSubmitIdea } from '../hooks/useSubmitIdea';
import { useAuth } from '../contexts/AuthContext';

const SubmitIdeaPage: React.FC = () => {
  // Header state
  const [activeTab, setActiveTab] = useState('Submit an Idea');
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode } = useAuth();

  const handleAuthSuccess = (userData: any) => {
    console.log('User authenticated:', userData);
  };

  // Submit idea form logic
  const {
    currentStep,
    formData,
    isSubmitting,
    submitStatus,
    steps,
    handleInputChange,
    handleSubmit,
    nextStep,
    prevStep,
    canGoNext,
    canGoPrev,
    isFormValid
  } = useSubmitIdea();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <HeroSection />
      
      <StepsNavigation
        currentStep={currentStep}
        steps={steps}
        onNext={nextStep}
        onPrev={prevStep}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
      />

      {/* Blue Information Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-xl leading-relaxed">
            Submit an idea to foster creativity, collaboration, and entrepreneurial<br />
            spirit by sharing your unique business ideas.
          </p>
        </div>
      </section>

      <IdeaForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        isFormValid={isFormValid}
      />

      {/* Separator Line */}
      <div className="bg-gray-200 h-px"></div>

      <FAQSection />

      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </div>
  );
};

export default SubmitIdeaPage; 