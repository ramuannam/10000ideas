import { useState } from 'react';
import { IdeaFormData } from '../types/submitIdea';
import { INITIAL_FORM_DATA, FORM_STEPS } from '../constants/submitIdea';

export const useSubmitIdea = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IdeaFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData(INITIAL_FORM_DATA);
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'category', 'description', 'name', 'contactEmail'];
    return requiredFields.every(field => formData[field as keyof IdeaFormData].trim() !== '');
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(0);
    setSubmitStatus('idle');
  };

  return {
    // State
    currentStep,
    formData,
    isSubmitting,
    submitStatus,
    steps: FORM_STEPS,
    
    // Actions
    handleInputChange,
    handleSubmit,
    nextStep,
    prevStep,
    validateForm,
    resetForm,
    
    // Computed
    canGoNext: currentStep < FORM_STEPS.length - 1,
    canGoPrev: currentStep > 0,
    isFormValid: validateForm()
  };
}; 