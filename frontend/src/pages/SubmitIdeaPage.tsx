import React, { useState } from 'react';
import Header from '../layouts/Header.tsx';
import Footer from '../layouts/Footer.tsx';
import HeroSection from '../components/SubmitIdea/HeroSection.tsx';
import StepsNavigation from '../components/SubmitIdea/StepsNavigation.tsx';
import IdeaForm from '../components/SubmitIdea/IdeaForm.tsx';
import FAQSection from '../components/SubmitIdea/FAQSection.tsx';
import AuthModal from '../components/AuthModal.tsx';
import { useSubmitIdea } from '../hooks/useSubmitIdea.ts';

const SubmitIdeaPage: React.FC = () => {
  // Header state
  const [activeTab, setActiveTab] = useState('Submit an Idea');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // Auth functions
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
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isUserSignedIn={isUserSignedIn}
        openAuthModal={openAuthModal}
        handleSignOut={handleSignOut}
      />
      
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
        initialMode={authModalMode}
      />
    </div>
  );
};

export default SubmitIdeaPage; 