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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="bg-white px-16 py-14 rounded-3xl text-center shadow-2xl transform transition-all duration-300 ease-out scale-100 relative z-10">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-success-circle">
                <svg className="w-20 h-20 text-white animate-success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-orange-900 mb-3">Welcome Aboard!</h1>
            <p className="text-gray-600">Your journey begins now</p>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-6xl font-bold text-orange-900 mb-4 animate-fade-in">
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-600 animate-slide-up max-w-2xl mx-auto">
            Join our community of passionate travelers and explore the world's most amazing destinations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl space-y-8 
              transform hover:scale-[1.01] transition-all duration-300">
              {/* ...existing form fields with updated styling... */}
              <div className="space-y-6">
                {/* Username field */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-white/50 backdrop-blur border-2 border-gray-200 rounded-xl 
                      focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300
                      group-hover:border-orange-200"
                    placeholder="Choose a username"
                    required
                  />
                </div>

                {/* Similar styling for other form fields... */}
                <div className="group">
                  <label className="block text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 text-lg bg-white/50 backdrop-blur border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    } group-hover:border-orange-200`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-4 text-lg bg-white/50 backdrop-blur border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                      errors.password ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                    } group-hover:border-orange-200`}
                    placeholder="••••••••"
                    required
                  />
                  {errors.password && (
                    <p className="mt-2 text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Location
                  </label>
                  <select
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-white/50 backdrop-blur border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300 group-hover:border-orange-200"
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 text-lg bg-white/50 backdrop-blur border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300 group-hover:border-orange-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-900 to-orange-700 text-white py-4 px-8 rounded-xl 
                  text-lg font-semibold relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Create Account
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 
                  group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Travel"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-12 z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-4xl font-bold text-white mb-4">Start Your Adventure</h3>
              <p className="text-xl text-gray-200 max-w-lg">
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

@keyframes success-circle {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes success-check {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-success-circle {
  animation: success-circle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-success-check {
  animation: success-check 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
}
*/

export default Signup;