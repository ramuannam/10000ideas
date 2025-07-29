export interface IdeaCard {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  investment: {
    min: number;
    max: number;
    currency: string;
  };
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  marketScore: number;
  painPointScore: number;
  timingScore: number;
  ideaType: 'New Tech' | 'Women Focused' | 'Unicorn Ideas' | 'Manufacturing' | 'Service Ideas' | 'Middle Class' | 'Rural Focused';
  specialAdvantages?: string[];
  image: string;
  isFavorite?: boolean;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  subcategory: string;
  investmentRange: string;
  buildDifficulty: string;
  marketScore: string;
  painPointScore: string;
  timingScore: string;
  ideaType: string;
}

export interface FilterData {
  categories: Array<{ value: string; label: string }>;
  subcategories: Array<{ value: string; label: string }>;
  investmentRanges: Array<{ value: string; label: string }>;
  buildDifficulties: Array<{ value: string; label: string }>;
  marketScoreOptions: Array<{ value: string; label: string }>;
  painPointScoreOptions: Array<{ value: string; label: string }>;
  timingScoreOptions: Array<{ value: string; label: string }>;
  scoreOptions: Array<{ value: string; label: string }>;
  ideaTypes: Array<{ value: string; label: string }>;
}

export interface AdvancedFilterProps {
  filters: FilterOptions;
  filterData: FilterData;
  onFilterChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onClearAll: () => void;
  totalIdeas: number;
  filteredIdeas: number;
} 