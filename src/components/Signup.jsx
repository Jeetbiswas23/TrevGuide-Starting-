import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUsername }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    location: '',
    bio: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria",
    "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", "Finland", "France",
    "Germany", "Greece", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Japan",
    "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Norway", "Pakistan",
    "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa",
    "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "United Arab Emirates",
    "United Kingdom", "United States", "Vietnam"
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({...prev, email: 'Please enter a valid email address'}));
      return false;
    }
    setErrors(prev => ({...prev, email: ''}));
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrors(prev => ({...prev, password: 'Password must be at least 8 characters long'}));
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrors(prev => ({...prev, password: 'Password must contain at least one uppercase letter'}));
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setErrors(prev => ({...prev, password: 'Password must contain at least one number'}));
      return false;
    }
    setErrors(prev => ({...prev, password: ''}));
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'email') {
      validateEmail(value);
    }
    if (id === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    
    if (formData.username && isEmailValid && isPasswordValid && formData.location) {
      // Save all form data to localStorage
      Object.entries(formData).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      localStorage.setItem('joinDate', new Date().toLocaleDateString());
      localStorage.setItem('isAuthenticated', 'true'); // Add this line
      
      setShowPopup(true);
      setUsername(formData.username);
      
      setTimeout(() => {
        setShowPopup(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleSignUp = () => {
    // ...existing signup logic...
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', formData.username);
    // ...rest of the logic...
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white px-16 py-14 rounded-xl text-center shadow-2xl transform transition-all duration-300 ease-in-out scale-100 border-l-4 border-orange-900">
            <div className="text-orange-900 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-orange-900 mb-2">Success!</h1>
            <p className="text-gray-600">Your account has been created successfully</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-orange-900 mb-4 animate-fade-in">
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-600 animate-slide-up">
            Join our community of passionate travelers and explore the world
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl space-y-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-lg font-semibold text-gray-800 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                    placeholder="Choose a username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 text-lg bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-4 text-lg bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                      errors.password ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  {errors.password && (
                    <p className="mt-2 text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-lg font-semibold text-gray-800 mb-2">
                    Location
                  </label>
                  <select
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-lg font-semibold text-gray-800 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-900 to-orange-700 text-white py-4 px-8 rounded-xl text-lg font-semibold 
                  hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300
                  focus:ring-4 focus:ring-orange-200 focus:outline-none"
              >
                Create Account
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Travel"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
              <h3 className="text-3xl font-bold mb-4">Start Your Adventure</h3>
              <p className="text-lg text-gray-200">
                Join thousands of travelers exploring the world's most beautiful destinations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS or tailwind.config.js
/*
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}
*/

export default Signup;