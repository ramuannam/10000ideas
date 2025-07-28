import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    occupation: '',
    experience: '',
    interests: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(`${mode} attempt:`, formData);
    // Add authentication logic here
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      location: '',
      occupation: '',
      experience: '',
      interests: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      rememberMe: false
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    resetForm();
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
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
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
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <input
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Email Address"
                    />
                  </div>

                  <div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* Date of Birth & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        name="dateOfBirth"
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900"
                      />
                    </div>
                    <div>
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Location (City, Country)"
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Professional Information</h3>
                  
                  <div>
                    <input
                      name="occupation"
                      type="text"
                      required
                      value={formData.occupation}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Current Occupation"
                    />
                  </div>

                  <div>
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900"
                    >
                      <option value="">Years of Professional Experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>

                  <div>
                    <input
                      name="interests"
                      type="text"
                      required
                      value={formData.interests}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Business Interests (e.g., Technology, Healthcare, Food)"
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Security</h3>
                  
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 bg-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Create Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
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
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            {/* Or divider */}
            <div className="text-center text-gray-500 text-sm pt-4">
              Or
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {mode === 'signin' ? 'Log in with Google' : 'Sign up with Google'}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {mode === 'signin' ? 'Log in with Facebook' : 'Sign up with Facebook'}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="#1DA1F2" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                {mode === 'signin' ? 'Log in with Twitter' : 'Sign up with Twitter'}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-full text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-medium text-lg transition-colors duration-200"
              >
                {mode === 'signin' ? 'Log In' : 'Create Account'}
              </button>
            </div>

            {/* Mode Switch */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="font-medium text-blue-600 hover:text-blue-500 underline"
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