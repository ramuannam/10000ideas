import React from 'react';
import { Idea } from '../types/index';
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface IdeaCardProps {
  idea: Idea;
  onClick: (idea: Idea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onClick }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount}`;
  };

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div 
      className="idea-card group"
      onClick={() => onClick(idea)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={idea.imageUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'}
          alt={idea.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficultyLevel)}`}>
            {idea.difficultyLevel || 'Medium'}
          </span>
        </div>
        {/* Investment Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-yellow-400 text-blue-900 text-xs px-2 py-1 rounded font-medium">
            {formatCurrency(idea.investmentNeeded)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded-full">
            {idea.category}
          </span>
          <span className="text-xs text-gray-500">
            {idea.sector}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {idea.description}
        </p>

        {/* Investment */}
        <div className="flex items-center mb-2">
          <FaMoneyBillWave className="text-green-500 mr-2" />
          <span className="text-sm font-medium text-gray-900">
            Investment: {formatCurrency(idea.investmentNeeded)}
          </span>
        </div>

        {/* Time to Market */}
        {idea.timeToMarket && (
          <div className="flex items-center mb-2">
            <FaClock className="text-blue-500 mr-2" />
            <span className="text-sm text-gray-600">
              {idea.timeToMarket}
            </span>
          </div>
        )}

        {/* Location */}
        {idea.location && (
          <div className="flex items-center mb-3">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span className="text-sm text-gray-600">
              {idea.location}
            </span>
          </div>
        )}

        {/* Target Audience */}
        {idea.targetAudience && idea.targetAudience.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.targetAudience.slice(0, 3).map((audience, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {audience}
              </span>
            ))}
            {idea.targetAudience.length > 3 && (
              <span className="text-xs text-gray-500">
                +{idea.targetAudience.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Special Advantages */}
        {idea.specialAdvantages && idea.specialAdvantages.length > 0 && (
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-2" />
            <span className="text-xs text-gray-600">
              {idea.specialAdvantages[0]}
              {idea.specialAdvantages.length > 1 && ` +${idea.specialAdvantages.length - 1} more`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaCard; 