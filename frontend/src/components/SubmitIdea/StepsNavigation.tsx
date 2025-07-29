import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { StepData } from '../../types/submitIdea.ts';

interface StepsNavigationProps {
  currentStep: number;
  steps: readonly StepData[];
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const StepsNavigation: React.FC<StepsNavigationProps> = ({
  currentStep,
  steps,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev
}) => {
  const currentStepData = steps[currentStep];
  const nextStepData = steps[currentStep + 1];

  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Current Step */}
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-semibold text-lg">
              {String(currentStep + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-semibold text-gray-900">{currentStepData.name}</h3>
              {currentStepData.description && (
                <p className="text-gray-600 text-sm max-w-xs">
                  {currentStepData.description}
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {nextStepData && (
              <>
                <span className="text-gray-500 font-medium">Next:</span>
                <span className="text-gray-700 font-medium">{nextStepData.name}</span>
              </>
            )}
            
            <div className="flex space-x-2 ml-6">
              <button 
                onClick={onPrev}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  canGoPrev 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!canGoPrev}
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button 
                onClick={onNext}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  canGoNext 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!canGoNext}
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsNavigation; 