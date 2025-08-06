import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaTimes, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onAuthSuccess: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin', onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match!');
          setIsLoading(false);
          return;
        }

        if (!formData.agreeToTerms) {
          setError('Please agree to the terms and conditions');
          setIsLoading(false);
          return;
        }

        // Signup
        const signupData = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        };

        const response = await authService.signup(signupData);
        login(response); // Use context login function
        onAuthSuccess(response);
        onClose();
        navigate('/dashboard');
      } else {
        // Signin
        const loginData = {
          email: formData.email,
          password: formData.password
        };

        const response = await authService.login(loginData);
        login(response); // Use context login function
        onAuthSuccess(response);
        onClose();
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      if (mode === 'signin' && error.message?.includes('not found')) {
        setError('User not found. Please sign up first!');
      } else if (mode === 'signin' && error.message?.includes('Invalid password')) {
        setError('Invalid password. Please check your credentials.');
      } else if (mode === 'signup' && error.message?.includes('already registered')) {
        setError('Email already registered. Please sign in instead.');
      } else {
        setError(error.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      rememberMe: false
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  const handleAdminLogin = () => {
    onClose();
    navigate('/admin/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Left Side - Yellow with Illustration */}
        <div className="flex-1 bg-yellow-400 p-8 flex flex-col justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-900 hover:text-blue-700 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
          
          {mode === 'signin' ? (
            <>
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome back!
              </h2>
              <p className="text-white text-lg mb-8">
                Find your next big idea, and start building your dream business
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-4">
                Join 10000Ideas!
              </h2>
              <p className="text-white text-lg mb-8">
                Start your entrepreneurial journey and discover unlimited business opportunities
              </p>
            </>
          )}
        </div>

        {/* Right Side - White Form */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {mode === 'signin' ? (
              /* SIMPLE SIGNIN FORM */
              <>
                {/* Email Field */}
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Email"
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </>
            ) : (
              /* DETAILED SIGNUP FORM */
              <>
                {/* Full Name Field */}
                <div>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Full Name"
                    disabled={isLoading}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Email Address"
                    disabled={isLoading}
                  />
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Create Password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Confirm Password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start pt-4">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    disabled={isLoading}
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                      Privacy Policy
                    </a>. I also consent to receiving business opportunity updates via email.
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 rounded-full text-white font-medium text-lg transition-colors duration-200 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  mode === 'signin' ? 'Log In' : 'Create Account'
                )}
              </button>
            </div>

            {/* Admin Login Button - Only show on signin mode */}
            {mode === 'signin' && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleAdminLogin}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                >
                  <FaCog className="w-4 h-4 mr-2" />
                  Admin Login
                </button>
              </div>
            )}

            {/* Mode Switch */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
                  disabled={isLoading}
                >
                  {mode === 'signin' ? 'Sign up for free' : 'Sign in here'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 