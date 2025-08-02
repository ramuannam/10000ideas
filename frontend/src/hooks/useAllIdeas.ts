import { useState, useMemo, useEffect } from 'react';
import { IdeaCard, FilterOptions } from '../types/allIdeas';
import { FILTER_DATA, INITIAL_FILTERS } from '../constants/allIdeas';
import { ideaService } from '../services/api';

export const useAllIdeas = () => {
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS);
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to map difficulty levels
  const mapDifficulty = (difficulty: string): "Easy" | "Moderate" | "Challenging" => {
    const lowerDifficulty = difficulty.toLowerCase();
    if (lowerDifficulty === 'easy') return 'Easy';
    if (lowerDifficulty === 'medium' || lowerDifficulty === 'moderate') return 'Moderate';
    if (lowerDifficulty === 'hard' || lowerDifficulty === 'challenging') return 'Challenging';
    return 'Moderate'; // Default fallback
  };

  // Helper function to map categories to ideaType
  const mapIdeaType = (category: string): "New Tech" | "Women Focused" | "Unicorn Ideas" | "Manufacturing" | "Service Ideas" | "Middle Class" | "Rural Focused" => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('technology') || lowerCategory.includes('tech')) return 'New Tech';
    if (lowerCategory.includes('women') || lowerCategory.includes('for women')) return 'Women Focused';
    if (lowerCategory.includes('manufacturing') || lowerCategory.includes('production')) return 'Manufacturing';
    if (lowerCategory.includes('service') || lowerCategory.includes('services')) return 'Service Ideas';
    if (lowerCategory.includes('rural') || lowerCategory.includes('agriculture')) return 'Rural Focused';
    return 'Middle Class'; // Default fallback
  };

  // Fetch ideas from API
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const fetchedIdeas = await ideaService.getAllIdeas();
        
        // Transform backend data to frontend format
        const transformedIdeas: IdeaCard[] = fetchedIdeas.map((idea) => ({
          id: String(idea.id),
          title: idea.title,
          description: idea.description,
          category: idea.category,
          subcategory: idea.sector,
          investment: {
            min: idea.investmentNeeded ? Math.floor(idea.investmentNeeded * 0.8) : 0,
            max: idea.investmentNeeded || 0,
            currency: '₹'
          },
          difficulty: mapDifficulty(idea.difficultyLevel || 'Medium'),
          marketScore: Math.floor(Math.random() * 3) + 8, // 8-10
          painPointScore: Math.floor(Math.random() * 3) + 8, // 8-10
          timingScore: Math.floor(Math.random() * 3) + 8, // 8-10
          tags: idea.targetAudience || [],
          type: idea.category,
          ideaType: mapIdeaType(idea.category),
          featured: false,
          favorite: false,
          image: idea.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
        }));
        
        setIdeas(transformedIdeas);
        setError(null);
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setError('Failed to load ideas');
        setIdeas([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // Filter logic
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const titleMatch = idea.title.toLowerCase().includes(searchLower);
        const descriptionMatch = idea.description.toLowerCase().includes(searchLower);
        const tagsMatch = idea.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!titleMatch && !descriptionMatch && !tagsMatch) {
          return false;
        }
      }

      // Category filter
      if (filters.category && idea.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && idea.subcategory !== filters.subcategory) {
        return false;
      }

      // Investment range filter
      if (filters.investmentRange) {
        const [min, max] = filters.investmentRange.split('-').map(v => {
          if (v.includes('+')) return Infinity;
          return parseInt(v);
        });
        
        if (idea.investment.min < min || idea.investment.max > max) {
          return false;
        }
      }

      // Build difficulty filter
      if (filters.buildDifficulty && idea.difficulty.toLowerCase() !== filters.buildDifficulty) {
        return false;
      }

      // Market score filter
      if (filters.marketScore) {
        if (filters.marketScore === '9-10') {
          if (idea.marketScore < 9) {
            return false;
          }
        } else {
          const [min, max] = filters.marketScore.split('-').map(v => parseInt(v));
          if (idea.marketScore < min || idea.marketScore > max) {
            return false;
          }
        }
      }

      // Pain point score filter
      if (filters.painPointScore) {
        if (filters.painPointScore === '9-10') {
          if (idea.painPointScore < 9) {
            return false;
          }
        } else {
          const [min, max] = filters.painPointScore.split('-').map(v => parseInt(v));
          if (idea.painPointScore < min || idea.painPointScore > max) {
            return false;
          }
        }
      }

      // Timing score filter
      if (filters.timingScore) {
        if (filters.timingScore === '9-10') {
          if (idea.timingScore < 9) {
            return false;
          }
        } else {
          const [min, max] = filters.timingScore.split('-').map(v => parseInt(v));
          if (idea.timingScore < min || idea.timingScore > max) {
            return false;
          }
        }
      }

      // Idea type filter
      if (filters.ideaType) {
        const typeMap: { [key: string]: string } = {
          'new-tech': 'New Tech',
          'women-focused': 'Women Focused',
          'unicorn-ideas': 'Unicorn Ideas',
          'manufacturing': 'Manufacturing',
          'service-ideas': 'Service Ideas',
          'middle-class': 'Middle Class',
          'rural-focused': 'Rural Focused'
        };
        
        if (idea.ideaType !== typeMap[filters.ideaType]) {
          return false;
        }
      }

      return true;
    });
  }, [ideas, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    // This function is called when "Apply Filters" button is clicked
    // In this case, filters are applied in real-time, so no additional action needed
    console.log('Filters applied:', filters);
  };

  const clearAllFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const toggleFavorite = (ideaId: string) => {
    // In a real app, this would update the backend
    // For now, we'll just update local state
    console.log('Toggle favorite for idea:', ideaId);
    // You could implement local storage or state management here
  };

  const handleCardClick = (ideaId: string) => {
    // Navigate to idea detail page
    console.log('Navigate to idea detail:', ideaId);
    // You could implement navigation here using React Router
  };

  return {
    filteredIdeas,
    filters,
    filterData: FILTER_DATA,
    handleFilterChange,
    applyFilters,
    clearAllFilters,
    toggleFavorite,
    handleCardClick,
    totalIdeas: ideas.length,
    filteredCount: filteredIdeas.length,
    loading,
    error,
    refreshIdeas: () => {
      // Force refresh by calling fetch again
      const fetchIdeas = async () => {
        try {
          setLoading(true);
          const fetchedIdeas = await ideaService.getAllIdeas();
          
          const transformedIdeas: IdeaCard[] = fetchedIdeas.map((idea) => ({
            id: String(idea.id),
            title: idea.title,
            description: idea.description,
            category: idea.category,
            subcategory: idea.sector,
            investment: {
              min: idea.investmentNeeded ? Math.floor(idea.investmentNeeded * 0.8) : 0,
              max: idea.investmentNeeded || 0,
              currency: '₹'
            },
            difficulty: mapDifficulty(idea.difficultyLevel || 'Medium'),
            marketScore: Math.floor(Math.random() * 3) + 8,
            painPointScore: Math.floor(Math.random() * 3) + 8,
            timingScore: Math.floor(Math.random() * 3) + 8,
            tags: idea.targetAudience || [],
            type: idea.category,
            ideaType: mapIdeaType(idea.category),
            featured: false,
            favorite: false,
            image: idea.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
          }));
          
          setIdeas(transformedIdeas);
          setError(null);
        } catch (err) {
          console.error('Error fetching ideas:', err);
          setError('Failed to load ideas');
        } finally {
          setLoading(false);
        }
      };
      fetchIdeas();
    }
  };
}; 