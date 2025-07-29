import React from 'react';
import { FaSpinner, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface SubmitButtonProps {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  isFormValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  submitStatus,
  isFormValid
}) => {
  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Submitting...
        </>
      );
    }

    if (submitStatus === 'success') {
      return (
        <>
          <FaCheck className="mr-2" />
          Submitted Successfully!
        </>
      );
    }

    if (submitStatus === 'error') {
      return (
        <>
          <FaExclamationTriangle className="mr-2" />
          Try Again
        </>
      );
    }

    return 'Submit Your Idea';
  };

  const getButtonStyles = () => {
    if (submitStatus === 'success') {
      return 'bg-green-600 hover:bg-green-700';
    }

    if (submitStatus === 'error') {
      return 'bg-red-600 hover:bg-red-700';
    }

    if (!isFormValid || isSubmitting) {
      return 'bg-gray-400 cursor-not-allowed';
    }

    return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
  };

  const getStatusMessage = () => {
    if (submitStatus === 'success') {
      return (
        <div className="text-green-600 text-center mb-4 flex items-center justify-center">
          <FaCheck className="mr-2" />
          Your idea has been submitted successfully! We'll review it and get back to you soon.
        </div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <div className="text-red-600 text-center mb-4 flex items-center justify-center">
          <FaExclamationTriangle className="mr-2" />
          There was an error submitting your idea. Please try again.
        </div>
      );
    }

    return null;
  };

  return (
    <div className="text-center pt-6">
      {getStatusMessage()}
      
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting || submitStatus === 'success'}
        className={`${getButtonStyles()} text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:hover:shadow-lg`}
      >
        {getButtonContent()}
      </button>
      
      {submitStatus === 'idle' && (
        <p className="text-gray-500 text-sm mt-4">
          By submitting, you agree to our terms and conditions and privacy policy.
        </p>
      )}
      
      {!isFormValid && submitStatus === 'idle' && (
        <p className="text-orange-600 text-sm mt-2">
          Please fill in all required fields (*)
        </p>
      )}
    </div>
  );
};

export default SubmitButton; 