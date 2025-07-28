import React from 'react';
import { Idea } from '../types';
import { 
  FaMoneyBillWave, 
  FaClock, 
  FaMapMarkerAlt, 
  FaStar, 
  FaGraduationCap,
  FaTools,
  FaHandshake,
  FaVideo,
  FaUniversity,
  FaPiggyBank,
  FaBuilding,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';

interface IdeaDetailProps {
  idea: Idea;
  onBack: () => void;
}

const IdeaDetail: React.FC<IdeaDetailProps> = ({ idea, onBack }) => {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          ← Back to Ideas
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <img
              src={idea.imageUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800'}
              alt={idea.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-primary-600 rounded-full text-sm font-medium">
                  {idea.category}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {idea.sector}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(idea.difficultyLevel)}`}>
                  {idea.difficultyLevel || 'Medium'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{idea.title}</h1>
              <p className="text-lg opacity-90">{idea.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-600 text-xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Investment Needed</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(idea.investmentNeeded)}</p>
                  </div>
                </div>
              </div>
              
              {idea.timeToMarket && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 text-xl mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Time to Market</p>
                      <p className="text-xl font-bold text-blue-600">{idea.timeToMarket}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {idea.location && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-red-600 text-xl mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-xl font-bold text-red-600">{idea.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Target Audience & Special Advantages */}
            {(idea.targetAudience?.length || idea.specialAdvantages?.length) && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUsers className="mr-2 text-primary-600" />
                  Target Audience & Advantages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {idea.targetAudience?.length && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Target Audience</h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.targetAudience.map((audience, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {audience}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {idea.specialAdvantages?.length && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaStar className="mr-1 text-yellow-500" />
                        Special Advantages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.specialAdvantages.map((advantage, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                          >
                            {advantage}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaLightbulb className="mr-2 text-primary-600" />
                Requirements & Training
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {idea.expertiseNeeded && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-blue-500" />
                      Expertise Needed
                    </h4>
                    <p className="text-gray-600">{idea.expertiseNeeded}</p>
                  </div>
                )}
                
                {idea.trainingNeeded && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FaGraduationCap className="mr-2 text-green-500" />
                      Training Needed
                    </h4>
                    <p className="text-gray-600">{idea.trainingNeeded}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resources */}
            {idea.resources && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaTools className="mr-2 text-primary-600" />
                  Resources Required
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.resources}</p>
              </div>
            )}

            {/* Success Examples */}
            {idea.successExamples && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaHandshake className="mr-2 text-primary-600" />
                  Success Examples
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.successExamples}</p>
              </div>
            )}

            {/* Video */}
            {idea.videoUrl && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaVideo className="mr-2 text-primary-600" />
                  Related Video
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={idea.videoUrl}
                    title="Idea Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Government Support */}
            {idea.governmentSubsidies && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUniversity className="mr-2 text-primary-600" />
                  Government Support & Subsidies
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.governmentSubsidies}</p>
              </div>
            )}

            {/* Funding Options */}
            {idea.fundingOptions && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaPiggyBank className="mr-2 text-primary-600" />
                  Funding Options
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.fundingOptions}</p>
              </div>
            )}

            {/* Bank Assistance */}
            {idea.bankAssistance && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaBuilding className="mr-2 text-primary-600" />
                  Bank Assistance
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.bankAssistance}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail; 