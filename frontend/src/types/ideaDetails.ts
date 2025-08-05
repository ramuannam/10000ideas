export interface IdeaReview {
  id: number;
  ideaId: number;
  reviewerName: string;
  reviewerEmail?: string;
  reviewerWebsite?: string;
  comment: string;
  rating: number;
  helpfulVotes: number;
  unhelpfulVotes: number;
  isRecommended: boolean;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export interface IdeaInternalFactors {
  id: number;
  ideaId: number;
  factorType: 'STRENGTHS' | 'WEAKNESSES' | 'OPPORTUNITIES' | 'THREATS';
  factors: string[];
  colorCode?: string;
  iconCode?: string;
}

export interface IdeaInvestment {
  id: number;
  ideaId: number;
  investmentCategory: string;
  amount: number;
  description?: string;
  priorityLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  isOptional: boolean;
  paymentTerms?: string;
  supplierInfo?: string;
}

export interface InvestmentSummary {
  investments: IdeaInvestment[];
  totalInvestment: number;
  investmentCount: number;
}

export interface IdeaScheme {
  id: number;
  ideaId: number;
  schemeName: string;
  schemeType: 'GOVERNMENT' | 'BANK' | 'PRIVATE' | 'NGO';
  schemeCategory?: 'SUBSIDY' | 'LOAN' | 'GRANT' | 'TRAINING';
  regionState?: string;
  description?: string;
  eligibilityCriteria?: string;
  maximumAmount?: number;
  interestRate?: number;
  repaymentPeriod?: string;
  applicationDeadline?: string;
  contactInfo?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IdeaBankLoan {
  id: number;
  ideaId: number;
  bankName: string;
  loanType: string;
  loanName?: string;
  description?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  interestRateMin?: number;
  interestRateMax?: number;
  loanTenureMin?: string;
  loanTenureMax?: string;
  processingFee?: number;
  eligibilityCriteria?: string;
  requiredDocuments?: string;
  contactInfo?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteIdeaDetails {
  internalFactors: IdeaInternalFactors[];
  investments: InvestmentSummary;
  schemes: IdeaScheme[];
  bankLoans: IdeaBankLoan[];
  ratingSummary: RatingSummary;
  reviews: IdeaReview[];
}

export interface ReviewFormData {
  reviewerName: string;
  reviewerEmail?: string;
  reviewerWebsite?: string;
  comment: string;
  rating: number;
  isRecommended?: boolean;
}

export interface InternalFactorsFormData {
  factorType: 'STRENGTHS' | 'WEAKNESSES' | 'OPPORTUNITIES' | 'THREATS';
  factors: string[];
  colorCode?: string;
  iconCode?: string;
}

export interface InvestmentFormData {
  investmentCategory: string;
  amount: number;
  description?: string;
  priorityLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  isOptional?: boolean;
  paymentTerms?: string;
  supplierInfo?: string;
}

export interface SchemeFormData {
  schemeName: string;
  schemeType: 'GOVERNMENT' | 'BANK' | 'PRIVATE' | 'NGO';
  schemeCategory?: 'SUBSIDY' | 'LOAN' | 'GRANT' | 'TRAINING';
  regionState?: string;
  description?: string;
  eligibilityCriteria?: string;
  maximumAmount?: number;
  interestRate?: number;
  repaymentPeriod?: string;
  applicationDeadline?: string;
  contactInfo?: string;
  websiteUrl?: string;
}

export interface BankLoanFormData {
  bankName: string;
  loanType: string;
  loanName?: string;
  description?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  interestRateMin?: number;
  interestRateMax?: number;
  loanTenureMin?: string;
  loanTenureMax?: string;
  processingFee?: number;
  eligibilityCriteria?: string;
  requiredDocuments?: string;
  contactInfo?: string;
  websiteUrl?: string;
} 