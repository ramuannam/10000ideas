import React from 'react';
import { FormSectionProps } from '../../../types/submitIdea';

const ResourcesSection: React.FC<FormSectionProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Resources & Expertise
      </h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Required Resources & Expertise
        </label>
        <textarea
          name="resources"
          value={formData.resources}
          onChange={onInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What resources, skills, or expertise would be needed to implement this idea?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Key Expertise Areas
        </label>
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Software Development, Marketing, Design"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Potential Challenges
        </label>
        <textarea
          name="challenges"
          value={formData.challenges}
          onChange={onInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What challenges do you anticipate and how might they be addressed?"
        />
      </div>
    </div>
  );
};

export default ResourcesSection; 