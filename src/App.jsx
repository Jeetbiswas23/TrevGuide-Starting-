import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Countries from './components/Countries';
import Dashboard from './components/Dashboard';
import './index.css';
import { popularPlaces, testimonials, travelTips } from './data/siteData';
import India from './components/Country/India';
import Japan from './components/Country/Japan';
import France from './components/Country/France';
import Italy from './components/Country/Italy';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Home({ popularPlaces, testimonials, travelTips }) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
          alt="Travel destination" 
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to TrevGuide</h2>
            <p className="text-lg sm:text-xl mb-8">Discover the world's most amazing destinations</p>
            <Link to="/countries" className="bg-orange-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-orange-800 transition-colors font-semibold text-base sm:text-lg inline-block">
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Places Section */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Popular Places to Visit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {popularPlaces.map(place => (
              <div key={place.id} className="group relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h4 className="text-2xl font-bold mb-2">{place.name}</h4>
                    <p className="text-orange-200 mb-2">{place.country}</p>
                    <p className="text-gray-200">{place.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Tips Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Essential Travel Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelTips.map((tip, index) => (
              <div key={index} className="bg-orange-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h4 className="text-2xl font-bold mb-4 text-orange-900">{tip.title}</h4>
                <ul className="space-y-3">
                  {tip.tips.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-orange-900">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-white">What Travelers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-orange-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-r from-orange-100 to-orange-200">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl text-gray-600 mb-8">Get travel tips and exclusive offers straight to your inbox</p>
          <form className="max-w-2xl mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-orange-300 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-900 text-white px-8 py-4 rounded-xl hover:bg-orange-800 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
      localStorage.setItem('joinDate', new Date().toLocaleDateString());
    }
  }, [username]);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername('');
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <div className="bg-gray-50 text-orange-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <header className="bg-gradient-to-r from-orange-900 to-orange-700 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="relative flex items-center justify-between" ref={mobileMenuRef}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-20">
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">TrevGuide</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-orange-800/50 rounded-lg transition-colors z-20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>

            {/* Desktop & Mobile Navigation */}
            <div 
              className={`fixed inset-0 lg:relative lg:inset-auto bg-orange-900/95 lg:bg-transparent 
                transform transition-all duration-300 ease-in-out 
                ${isMobileMenuOpen 
                  ? 'translate-x-0 opacity-100 visible' 
                  : 'translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100 invisible lg:visible'
                } 
                lg:transform-none lg:transition-none z-10`}
            >
              <div className={`flex flex-col lg:flex-row items-center justify-center h-full space-y-8 lg:space-y-0 lg:space-x-8 p-4 lg:p-0
                transform transition-all duration-300 delay-100
                ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 lg:translate-x-0 lg:opacity-100'}`}
              >
                {/* Navigation Links */}
                {['Home', 'Countries', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-xl lg:text-base text-white hover:text-orange-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                
                {/* User Menu */}
                {username ? (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2"
                    >
                      <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-300 ${
                        showDropdown ? 'ring-2 ring-orange-200' : 'hover:ring-2 hover:ring-orange-200/50'
                      }`}>
                        <span className="text-orange-900 font-bold text-lg">
                          {username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <>
                        <div className="fixed inset-0 bg-black/5 backdrop-blur-xs" onClick={() => setShowDropdown(false)} />
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 animate-dropdownFade">
                          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Welcome back,</p>
                            <p className="text-base md:text-lg font-semibold text-orange-900">{username}</p>
                          </div>
                          
                          <div className="px-2 py-2">
                            <Link 
                              to="/dashboard" 
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors group"
                              onClick={() => setShowDropdown(false)}
                            >
                              <span className="flex items-center justify-center w-8 h-8 mr-3 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-200 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                              </span>
                              <div>
                                <p className="font-medium">Dashboard</p>
                                <p className="text-xs text-gray-500">View your activity</p>
                              </div>
                            </Link>
                            
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-3 mt-1 text-gray-700 hover:bg-red-50 rounded-xl transition-colors group"
                            >
                              <span className="flex items-center justify-center w-8 h-8 mr-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-200 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                              </span>
                              <div>
                                <p className="font-medium text-left">Sign out</p>
                                <p className="text-xs text-gray-500 text-left">See you next time</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link 
                    to="/signup" 
                    className="bg-white text-orange-900 px-6 py-2 rounded-full hover:bg-orange-100 transition-colors font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home 
              popularPlaces={popularPlaces} 
              testimonials={testimonials} 
              travelTips={travelTips} 
            />
          } />
          <Route path="/signup" element={<Signup setUsername={setUsername} />} />
          <Route path="/countries" element={<Countries />} />
          <Route 
            path="/dashboard" 
            element={
              username ? (
                <Dashboard 
                  username={username}
                  userProfile={{
                    bio: localStorage.getItem('bio'),
                    location: localStorage.getItem('location'),
                    joinDate: localStorage.getItem('joinDate')
                  }}
                />
              ) : (
                <Navigate to="/signup" replace />
              )
            } 
          />
          <Route path="/country/india" element={<India />} />
          <Route path="/country/japan" element={<Japan />} />
          <Route path="/country/france" element={<France />} />
          <Route path="/country/italy" element={<Italy />} />
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Logo and Description */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h4 className="text-lg sm:text-xl font-bold mb-4">TrevGuide</h4>
              <p className="text-orange-100 text-sm sm:text-base">
                Your ultimate travel companion for discovering the world's most amazing destinations.
              </p>
            </div>

            {/* Footer Links */}
            {['Explore', 'Company', 'Support'].map((section, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="text-lg sm:text-xl font-bold mb-4">{section}</h4>
                <ul className="space-y-2 text-orange-100 text-sm sm:text-base">
                  {['About', 'Services', 'Contact'].map((item, i) => (
                    <li key={i} className="hover:text-orange-200 cursor-pointer transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-orange-800 mt-8 pt-8 text-center">
            <p className="text-orange-100 text-xs sm:text-sm">
              &copy; 2024 TrevGuide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;