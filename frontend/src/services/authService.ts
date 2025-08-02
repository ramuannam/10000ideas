import { ADMIN_API_BASE_URL } from '../config';

interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export interface UploadHistory {
  id: number;
  filename: string;
  batchId: string;
  uploadTimestamp: string;
  ideasCount: number;
  fileSize?: number;
  contentType?: string;
  uploadedBy?: string;
  status: string;
}

export interface DeleteUploadResponse {
  success: boolean;
  message: string;
  deletedIdeasCount?: number;
  filename?: string;
}

export interface UploadHistoryStats {
  totalUploads: number;
  totalIdeasUploaded: number;
}

class AuthService {
  private baseURL = `${ADMIN_API_BASE_URL}/auth`;
  private adminBaseURL = ADMIN_API_BASE_URL;

  // Admin login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token in localStorage
    this.setToken(data.token);
    this.setUserInfo({
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    });

    return data;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  // Set token
  private setToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  // Get user info
  getUserInfo(): any {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Set user info
  private setUserInfo(user: any): void {
    localStorage.setItem('adminUser', JSON.stringify(user));
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUserInfo();
    return !!(token && user);
  }

  // Validate token with server
  async validateToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${this.baseURL}/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // Get authorization headers for API calls
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Admin API calls
  async uploadIdeas(file: File): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.adminBaseURL}/upload-ideas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      // Check if response is ok
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          const textResponse = await response.text();
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async getIdeasPaginated(page: number = 0, size: number = 20, sortBy: string = 'id', sortDir: string = 'desc', 
                         search?: string, mainCategory?: string, subCategory?: string, difficultyLevel?: string, 
                         location?: string, maxInvestment?: number, targetAudience?: string, 
                         specialAdvantage?: string): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    let url = `${this.adminBaseURL}/ideas?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`;
    
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (mainCategory) url += `&category=${encodeURIComponent(mainCategory)}`;
    if (subCategory) url += `&sector=${encodeURIComponent(subCategory)}`;
    if (difficultyLevel) url += `&difficultyLevel=${encodeURIComponent(difficultyLevel)}`;
    if (location) url += `&location=${encodeURIComponent(location)}`;
    if (maxInvestment) url += `&maxInvestment=${maxInvestment}`;
    if (targetAudience) url += `&targetAudience=${encodeURIComponent(targetAudience)}`;
    if (specialAdvantage) url += `&specialAdvantage=${encodeURIComponent(specialAdvantage)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ideas');
    }

    return await response.json();
  }

  async getFilterOptions(): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Fetch all filter options from backend (database-driven)
    const response = await fetch(`${this.adminBaseURL}/filter-options`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch filter options');
    }

    return await response.json();
  }

  async getDashboardStats(): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.adminBaseURL}/dashboard/stats`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return await response.json();
  }

  async updateIdea(id: number, idea: any): Promise<any> {
    const response = await fetch(`${this.adminBaseURL}/ideas/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(idea),
    });

    if (!response.ok) {
      throw new Error('Failed to update idea');
    }

    return await response.json();
  }

  async deleteIdea(id: number): Promise<any> {
    const response = await fetch(`${this.adminBaseURL}/ideas/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete idea');
    }

    return await response.json();
  }

  async toggleIdeaStatus(id: number): Promise<any> {
    const response = await fetch(`${this.adminBaseURL}/ideas/${id}/toggle-status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle idea status');
    }

    return await response.json();
  }

  // Upload History Management
  async getUploadHistory(): Promise<UploadHistory[]> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.adminBaseURL}/upload-history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upload history');
    }

    return response.json();
  }

  async deleteUploadBatch(batchId: string): Promise<DeleteUploadResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.adminBaseURL}/upload-history/${batchId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete upload batch');
    }

    return response.json();
  }

  async getUploadHistoryStats(): Promise<UploadHistoryStats> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.adminBaseURL}/upload-history/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upload history stats');
    }

    return response.json();
  }
}

export default new AuthService(); 