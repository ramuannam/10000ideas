export interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  sector: string;
  investmentNeeded: number;
  expertiseNeeded?: string;
  trainingNeeded?: string;
  resources?: string;
  successExamples?: string;
  videoUrl?: string;
  governmentSubsidies?: string;
  fundingOptions?: string;
  bankAssistance?: string;
  targetAudience?: string[];
  specialAdvantages?: string[];
  difficultyLevel?: string;
  timeToMarket?: string;
  location?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface FilterOptions {
  category?: string;
  sector?: string;
  difficultyLevel?: string;
  location?: string;
  maxInvestment?: number;
  targetAudience?: string;
  specialAdvantage?: string;
}

export interface FilterData {
  categories: string[];
  sectors: string[];
  difficultyLevels: string[];
  locations: string[];
} 