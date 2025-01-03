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
      
      setShowPopup(true);
      setUsername(formData.username);
      
      setTimeout(() => {
        setShowPopup(false);
        setShowPopup(false);
        setTimeout(() => {
          window.scrollTo(0, 0);
          navigate('/dashboard'); // Navigate to dashboard instead of home
        }, 100);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto py-12">
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
      
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-orange-900 mb-4">Begin Your Journey</h2>
        <p className="text-xl text-gray-600">Join our community of global travelers</p>
      </div>

      <div className="flex flex-col md:flex-row w-11/12 gap-12">
        <form onSubmit={handleSubmit} className="w-full md:w-2/5 bg-white p-10 rounded-2xl shadow-xl">
          <div className="space-y-8">
            <div className="form-group">
              <label htmlFor="username" className="block text-gray-700 text-lg font-semibold mb-3">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-3">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                }`}
                required
              />
              {errors.email && (
                <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block text-gray-700 text-lg font-semibold mb-3">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all duration-300 ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'
                }`}
                required
              />
              {errors.password && (
                <p className="mt-2 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location" className="block text-gray-700 text-lg font-semibold mb-3">
                Location
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300 bg-white"
                required
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-3">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-900 to-orange-700 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div className="w-full md:w-3/5 h-[700px] rounded-2xl shadow-xl overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112486726!2d144.9630579153167!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1e5d1b1a1e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633078471234!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;