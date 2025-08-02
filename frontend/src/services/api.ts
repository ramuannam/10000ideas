import axios from 'axios';
import { Idea, FilterOptions, FilterData } from '../types/index';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📍 Base URL:', API_BASE_URL);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const ideaService = {
  // Get all ideas
  getAllIdeas: async (): Promise<Idea[]> => {
    const response = await api.get('/ideas');
    return response.data;
  },

  // Get idea by ID
  getIdeaById: async (id: number): Promise<Idea> => {
    const response = await api.get(`/ideas/${id}`);
    return response.data;
  },

  // Get ideas with filters
  getIdeasWithFilters: async (filters: FilterOptions): Promise<Idea[]> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/ideas/filter?${params.toString()}`);
    return response.data;
  },

  // Get ideas by category
  getIdeasByCategory: async (category: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/category/${category}`);
    return response.data;
  },

  // Get ideas by sector
  getIdeasBySector: async (sector: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/sector/${sector}`);
    return response.data;
  },

  // Get ideas by difficulty level
  getIdeasByDifficultyLevel: async (difficultyLevel: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/difficulty/${difficultyLevel}`);
    return response.data;
  },

  // Get ideas by location
  getIdeasByLocation: async (location: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/location/${location}`);
    return response.data;
  },

  // Get ideas by investment range
  getIdeasByInvestmentRange: async (minInvestment?: number, maxInvestment?: number): Promise<Idea[]> => {
    const params = new URLSearchParams();
    if (minInvestment) params.append('minInvestment', minInvestment.toString());
    if (maxInvestment) params.append('maxInvestment', maxInvestment.toString());
    
    const response = await api.get(`/ideas/investment?${params.toString()}`);
    return response.data;
  },

  // Get ideas by target audience
  getIdeasByTargetAudience: async (audience: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/audience/${audience}`);
    return response.data;
  },

  // Get ideas by special advantage
  getIdeasBySpecialAdvantage: async (advantage: string): Promise<Idea[]> => {
    const response = await api.get(`/ideas/advantage/${advantage}`);
    return response.data;
  },

  // Get filter data
  getFilterData: async (): Promise<FilterData> => {
    const [categories, sectors, difficultyLevels, locations] = await Promise.all([
      api.get('/categories'),
      api.get('/sectors'),
      api.get('/difficulty-levels'),
      api.get('/locations'),
    ]);

    return {
      categories: categories.data,
      sectors: sectors.data,
      difficultyLevels: difficultyLevels.data,
      locations: locations.data,
    };
  },

  // Create new idea
  createIdea: async (idea: Omit<Idea, 'id'>): Promise<Idea> => {
    const response = await api.post('/ideas', idea);
    return response.data;
  },

  // Update idea
  updateIdea: async (id: number, idea: Partial<Idea>): Promise<Idea> => {
    const response = await api.put(`/ideas/${id}`, idea);
    return response.data;
  },

  // Delete idea
  deleteIdea: async (id: number): Promise<void> => {
    await api.delete(`/ideas/${id}`);
  },
}; 