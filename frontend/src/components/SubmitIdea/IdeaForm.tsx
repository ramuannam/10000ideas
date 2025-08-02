import React from 'react';
import BasicInfoSection from './form-sections/BasicInfoSection';
import BusinessDetailsSection from './form-sections/BusinessDetailsSection';
import ResourcesSection from './form-sections/ResourcesSection';
import ContactInfoSection from './form-sections/ContactInfoSection';
import SubmitButton from './form-sections/SubmitButton';
import { FormSectionProps } from '../../types/submitIdea';

interface IdeaFormProps extends FormSectionProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  isFormValid: boolean;
}

const IdeaForm: React.FC<IdeaFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  submitStatus,
  isFormValid
}) => {
  return (
    <section id="idea-form-section" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Idea Details Form
          </h2>

          <form onSubmit={onSubmit} className="space-y-8">
            <BasicInfoSection 
              formData={formData} 
              onInputChange={onInputChange} 
            />
            
            <BusinessDetailsSection 
              formData={formData} 
              onInputChange={onInputChange} 
            />
            
            <ResourcesSection 
              formData={formData} 
              onInputChange={onInputChange} 
            />
            
            <ContactInfoSection 
              formData={formData} 
              onInputChange={onInputChange} 
            />

            <SubmitButton 
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              isFormValid={isFormValid}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default IdeaForm; 