import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaLightbulb, FaCog } from 'react-icons/fa';
import adminService from '../services/adminService';
import authService from '../services/authService';

const AdminLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminService.login(formData);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <FaLightbulb className="text-yellow-400 text-4xl mr-3" />
            <div>
              <h1 className="text-4xl font-bold text-white">10000</h1>
              <h2 className="text-2xl font-bold text-white -mt-2">IDEAS</h2>
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Admin Panel</h3>
          <p className="mt-2 text-gray-300">Sign in to manage your ideas platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="usernameOrEmail" className="sr-only">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-12 py-4 border border-white/30 placeholder-gray-400 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Username or Email"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-12 py-4 border border-white/30 placeholder-gray-400 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in to Admin Panel'
                )}
              </button>
            </div>
          </form>


        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2024 10000 Ideas. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage; 