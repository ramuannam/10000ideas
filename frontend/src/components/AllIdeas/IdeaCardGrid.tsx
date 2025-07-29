import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IdeaCard } from '../../types/allIdeas.ts';

interface IdeaCardGridProps {
  idea: IdeaCard;
  onToggleFavorite: (id: string) => void;
  onCardClick: (id: string) => void;
}

const IdeaCardGrid: React.FC<IdeaCardGridProps> = ({ idea, onToggleFavorite, onCardClick }) => {
  const formatInvestment = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => {
      if (num >= 10000000) {
        return `${(num / 10000000).toFixed(1)}Cr`;
      } else if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}K`;
      }
      return num.toString();
    };

    return `${currency}${formatNumber(min)} - ${currency}${formatNumber(max)}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100';
    if (score >= 5) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIdeaTypeColor = (type: string) => {
    switch (type) {
      case 'New Tech': return 'bg-blue-100 text-blue-800';
      case 'Women Focused': return 'bg-pink-100 text-pink-800';
      case 'Unicorn Ideas': return 'bg-purple-100 text-purple-800';
      case 'Manufacturing': return 'bg-orange-100 text-orange-800';
      case 'Service Ideas': return 'bg-green-100 text-green-800';
      case 'Middle Class': return 'bg-yellow-100 text-yellow-800';
      case 'Rural Focused': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
      {/* Idea Type Badge */}
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIdeaTypeColor(idea.ideaType)}`}>
            {idea.ideaType}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(idea.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          {idea.isFavorite ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-gray-400 text-sm" />
          )}
        </button>

        {/* Image */}
        <div 
          className="h-48 bg-gray-200 bg-cover bg-center"
          style={{ backgroundImage: `url(${idea.image})` }}
          onClick={() => onCardClick(idea.id)}
        >
          {!idea.image.includes('api/placeholder') && (
            <img 
              src={idea.image} 
              alt={idea.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4" onClick={() => onCardClick(idea.id)}>
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {idea.description}
        </p>

        {/* Scores */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-blue-600">🎯</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getScoreColor(idea.marketScore)}`}>
              {idea.marketScore}/10
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-red-600">⚡</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getScoreColor(idea.painPointScore)}`}>
              {idea.painPointScore}/10
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-green-600">⏰</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getScoreColor(idea.timingScore)}`}>
              {idea.timingScore}/10
            </span>
          </div>
        </div>

        {/* Investment and Difficulty */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div>
            <span className="text-gray-500">💰 Investment:</span>
            <span className="font-medium text-gray-900 ml-1">
              {formatInvestment(idea.investment.min, idea.investment.max, idea.investment.currency)}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
            {idea.difficulty}
          </span>
        </div>

        {/* Tags */}
        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {idea.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Special Advantages */}
        {idea.specialAdvantages && idea.specialAdvantages.length > 0 && (
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-500 text-sm mt-0.5">💡</span>
              <p className="text-xs text-gray-600 line-clamp-2">
                {idea.specialAdvantages[0]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaCardGrid; 