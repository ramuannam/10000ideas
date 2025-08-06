import { API_BASE_URL } from '../config/config';

export interface User {
  id: number;
  fullName: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface UserSignupRequest {
  fullName: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserAuthResponse {
  token: string;
  refreshToken?: string;
  userId: number;
  fullName: string;
  email: string;
  profilePictureUrl?: string;
  role: string;
  emailVerified: boolean;
  expiresAt?: string;
  message?: string;
}

export interface GoogleLoginRequest {
  googleId: string;
  email: string;
  fullName: string;
  profilePictureUrl?: string;
}

class AuthService {
  private baseUrl = `${API_BASE_URL}/users`;

  async signup(request: UserSignupRequest): Promise<UserAuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async login(request: UserLoginRequest): Promise<UserAuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async googleLogin(request: GoogleLoginRequest): Promise<UserAuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Google login failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  async getProfile(email: string): Promise<User> {
    try {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/profile?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async updateProfile(userId: number, profileData: {
    fullName: string;
    bio: string;
    phoneNumber: string;
    location: string;
  }): Promise<User> {
    try {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/profile?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Token management
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    this.removeToken();
    // Redirect to home page
    window.location.href = '/';
  }
}

export const authService = new AuthService(); 
export default new AuthService(); 