import { 
  CompleteIdeaDetails, 
  IdeaReview, 
  RatingSummary, 
  IdeaInternalFactors, 
  IdeaInvestment, 
  IdeaScheme, 
  IdeaBankLoan,
  ReviewFormData,
  InternalFactorsFormData,
  InvestmentFormData,
  SchemeFormData,
  BankLoanFormData
} from '../types/ideaDetails';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class IdeaDetailService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/idea-details${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Complete Idea Details
  async getCompleteIdeaDetails(ideaId: number): Promise<CompleteIdeaDetails> {
    return this.request<CompleteIdeaDetails>(`/${ideaId}/complete`);
  }

  // Internal Factors
  async getInternalFactors(ideaId: number): Promise<IdeaInternalFactors[]> {
    return this.request<IdeaInternalFactors[]>(`/${ideaId}/internal-factors`);
  }

  async createInternalFactors(ideaId: number, data: InternalFactorsFormData): Promise<IdeaInternalFactors> {
    return this.request<IdeaInternalFactors>(`/${ideaId}/internal-factors`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteInternalFactors(factorsId: number): Promise<void> {
    return this.request<void>(`/internal-factors/${factorsId}`, {
      method: 'DELETE',
    });
  }

  // Investments
  async getInvestments(ideaId: number): Promise<{
    investments: IdeaInvestment[];
    totalInvestment: number;
    investmentCount: number;
  }> {
    return this.request<{
      investments: IdeaInvestment[];
      totalInvestment: number;
      investmentCount: number;
    }>(`/${ideaId}/investments`);
  }

  async createInvestment(ideaId: number, data: InvestmentFormData): Promise<IdeaInvestment> {
    return this.request<IdeaInvestment>(`/${ideaId}/investments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteInvestment(investmentId: number): Promise<void> {
    return this.request<void>(`/investments/${investmentId}`, {
      method: 'DELETE',
    });
  }

  // Schemes
  async getSchemes(ideaId: number): Promise<IdeaScheme[]> {
    return this.request<IdeaScheme[]>(`/${ideaId}/schemes`);
  }

  async getSchemesByType(ideaId: number, schemeType: string): Promise<IdeaScheme[]> {
    return this.request<IdeaScheme[]>(`/${ideaId}/schemes/${schemeType}`);
  }

  async createScheme(ideaId: number, data: SchemeFormData): Promise<IdeaScheme> {
    return this.request<IdeaScheme>(`/${ideaId}/schemes`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteScheme(schemeId: number): Promise<void> {
    return this.request<void>(`/schemes/${schemeId}`, {
      method: 'DELETE',
    });
  }

  // Bank Loans
  async getBankLoans(ideaId: number): Promise<IdeaBankLoan[]> {
    return this.request<IdeaBankLoan[]>(`/${ideaId}/bank-loans`);
  }

  async getBankLoansByType(ideaId: number, loanType: string): Promise<IdeaBankLoan[]> {
    return this.request<IdeaBankLoan[]>(`/${ideaId}/bank-loans/${loanType}`);
  }

  async createBankLoan(ideaId: number, data: BankLoanFormData): Promise<IdeaBankLoan> {
    return this.request<IdeaBankLoan>(`/${ideaId}/bank-loans`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteBankLoan(bankLoanId: number): Promise<void> {
    return this.request<void>(`/bank-loans/${bankLoanId}`, {
      method: 'DELETE',
    });
  }

  // Reviews
  async getReviews(ideaId: number): Promise<IdeaReview[]> {
    return this.request<IdeaReview[]>(`/${ideaId}/reviews`);
  }

  async getRatingSummary(ideaId: number): Promise<RatingSummary> {
    return this.request<RatingSummary>(`/${ideaId}/rating-summary`);
  }

  async createReview(ideaId: number, data: ReviewFormData): Promise<IdeaReview> {
    return this.request<IdeaReview>(`/${ideaId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async voteReview(reviewId: number, isHelpful: boolean): Promise<IdeaReview> {
    return this.request<IdeaReview>(`/reviews/${reviewId}/vote?isHelpful=${isHelpful}`, {
      method: 'POST',
    });
  }

  // Admin endpoints
  async getPendingReviews(): Promise<IdeaReview[]> {
    return this.request<IdeaReview[]>('/admin/reviews/pending');
  }

  async approveReview(reviewId: number): Promise<IdeaReview> {
    return this.request<IdeaReview>(`/admin/reviews/${reviewId}/approve`, {
      method: 'POST',
    });
  }

  async deleteReview(reviewId: number): Promise<void> {
    return this.request<void>(`/admin/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }
}

export const ideaDetailService = new IdeaDetailService(); 