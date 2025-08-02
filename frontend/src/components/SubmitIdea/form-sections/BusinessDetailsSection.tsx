import React from 'react';
import { FormSectionProps } from '../../../types/submitIdea';
import { TIMEFRAME_OPTIONS } from '../../../constants/submitIdea';

const BusinessDetailsSection: React.FC<FormSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Business Details
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Investment Needed
          </label>
          <input
            type="text"
            name="investmentNeeded"
            value={formData.investmentNeeded}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., $50,000 - $100,000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Target Market
          </label>
          <input
            type="text"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Who is your target audience?"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expected ROI
          </label>
          <input
            type="text"
            name="expectedROI"
            value={formData.expectedROI}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Expected return on investment"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Implementation Timeframe
          </label>
          <select
            name="timeframe"
            value={formData.timeframe}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {TIMEFRAME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsSection; 