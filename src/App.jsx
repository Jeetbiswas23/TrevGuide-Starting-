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
import Spain from './components/Country/Spain';
import Greece from './components/Country/Greece';
import Thiland from './components/Country/Thiland';
import Morocco from './components/Country/Morocco';
import Brazil from './components/Country/Brazil';
import NewZealand from './components/Country/NewZealand';
import Egypt from './components/Country/Egypt';
import Mexico from './components/Country/Mexixo';
import Switzerland from './components/Country/Switzerland';
import Southkorea from './components/Country/Southkorea';
import Vietnam from './components/Country/Vietnam';
import Portugal from './components/Country/Portugal';
import Peru from './components/Country/Peru';
import Croatia from './components/Country/Croatia';
import Blog from './components/Blog';
import BlogEditor from './components/BlogEditor';
import BlogPost from './components/BlogPost';
import { apiConfig } from './config/api';
import { apiService } from './services/api';
import { AuthProvider } from './contexts/AuthContext';
import { initializeApi } from './config/api';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Home({ popularPlaces, testimonials, travelTips }) {
  return (
    <div className="w-full"> {/* Add a wrapper div */}
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
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      setInstallPrompt(null);
      setIsInstallable(false);
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      console.log('beforeinstallprompt fired');
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No install prompt available');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, clear it
    setDeferredPrompt(null);
  };

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
    localStorage.removeItem('token'); // Add this line
    // Save blogs before clearing localStorage
    const userBlogs = localStorage.getItem('userBlogs');
    
    // Clear user-specific data but keep blogs
    localStorage.removeItem('username');
    localStorage.removeItem('joinDate');
    localStorage.removeItem('bio');
    localStorage.removeItem('location');
    localStorage.removeItem('travelPreferences');
    localStorage.removeItem('nextDestination');
    localStorage.removeItem('profileImage');
    
    // Restore blogs
    if (userBlogs) {
      localStorage.setItem('userBlogs', userBlogs);
    }
    
    setUsername('');
    setShowDropdown(false);
    navigate('/');
  };

  // Add API configuration to the app context
  useEffect(() => {
    // You can use apiConfig.baseURL to make API calls
    console.log('API URL configured:', apiConfig.baseURL);
  }, []);

  const handleSignup = async (userData) => {
    try {
      console.log('Initiating signup process');
      const response = await apiService.signup(userData);
      console.log('Signup successful:', response);
      
      if (response.username) {
        setUsername(response.username);
        localStorage.setItem('username', response.username);
        localStorage.setItem('joinDate', new Date().toLocaleDateString());
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      // Here you might want to show an error message to the user
      throw error;
    }
  };

  const handleApiError = (error) => {
    console.error('API Error:', error);
    setError(error.message || 'An unexpected error occurred');
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Basic API health check
        await initializeApi();
        
        // Load saved user data
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Initialization failed:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // Simple loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-900"></div>
      </div>
    );
  }

  // Simple error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-900"></div>
          </div>
        }>
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
                    className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-orange-800/30 transition-colors z-20 group"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <div className="flex flex-col items-center justify-center w-6 h-6 relative">
                      <span className={`w-5 h-0.5 bg-white rounded-full transform transition-all duration-300 ease-out-back
                        ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-[-4px] group-hover:translate-y-[-5px]'}`} 
                      />
                      <span className={`w-4 h-0.5 bg-white rounded-full transform transition-all duration-300 ease-out-back
                        ${isMobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100 group-hover:w-5'}`} 
                      />
                      <span className={`w-5 h-0.5 bg-white rounded-full transform transition-all duration-300 ease-out-back
                        ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-[4px] group-hover:translate-y-[5px]'}`} 
                      />
                    </div>
                  </button>

                  {/* Desktop & Mobile Navigation */}
                  <div 
                    className={`fixed inset-0 lg:relative lg:inset-auto bg-gradient-to-b from-orange-900 to-orange-800 lg:bg-none
                      transform transition-all duration-500 ease-in-out backdrop-blur-sm
                      ${isMobileMenuOpen 
                        ? 'translate-y-0 opacity-100 visible' 
                        : '-translate-y-full lg:translate-y-0 opacity-0 lg:opacity-100 invisible lg:visible'
                      } 
                      lg:transform-none lg:transition-none z-10`}
                  >
                    <div className={`flex flex-col lg:flex-row items-center justify-start lg:justify-center
                      min-h-screen lg:min-h-0 pt-24 lg:pt-0 px-6 lg:px-0
                      space-y-8 lg:space-y-0 lg:space-x-8
                      transform transition-all duration-500 ease-out
                      ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 lg:translate-y-0 lg:opacity-100'}`}
                    >
                      {/* Navigation Links */}
                      <div className="w-full lg:w-auto space-y-6 lg:space-y-0 lg:space-x-8">
                        {['Home', 'Countries', 'Blogs'].map((item) => (
                          <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className="flex items-center justify-center lg:inline-block
                              text-xl lg:text-base text-white 
                              hover:text-orange-200 transition-colors
                              py-4 lg:py-2 w-full lg:w-auto
                              border-b border-orange-800/30 lg:border-none"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                      
                      {/* Sign Up Button - Mobile Specific Styling */}
                      {!username && (
                        <Link 
                          to="/signup" 
                          className="bg-white text-orange-900 
                            px-8 py-4 lg:py-2
                            rounded-xl lg:rounded-full 
                            hover:bg-orange-100 transition-colors 
                            font-semibold text-xl lg:text-base 
                            w-full lg:w-auto text-center
                            shadow-lg hover:shadow-xl
                            transform hover:-translate-y-0.5 transition-all"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      )}
                      
                      {/* User Menu - Mobile Specific Styling */}
                      {username && (
                        <div className="relative w-full lg:w-auto flex justify-center" ref={dropdownRef}>
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
                              <div className="absolute right-0 lg:right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 animate-dropdownFade">
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
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </header>

            <main className="flex-grow overflow-x-hidden">
              <div className="max-w-full">
                <Routes>
                  <Route path="/" element={
                    <div className="w-full overflow-x-hidden">
                      <Home 
                        popularPlaces={popularPlaces} 
                        testimonials={testimonials} 
                        travelTips={travelTips} 
                      />
                    </div>
                  } />
                  <Route path="/signup" element={<Signup setUsername={setUsername} />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard 
                          username={username}
                          userProfile={{
                            bio: localStorage.getItem('bio'),
                            location: localStorage.getItem('location'),
                            joinDate: localStorage.getItem('joinDate')
                          }}
                        />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/country/india" element={<India />} />
                  <Route path="/country/japan" element={<Japan />} />
                  <Route path="/country/france" element={<France />} />
                  <Route path="/country/italy" element={<Italy />} />
                  <Route path="/country/spain" element={<Spain />} />
                  <Route path="/country/greece" element={<Greece />} />
                  <Route path="/country/thailand" element={<Thiland />} />
                  <Route path="/country/morocco" element={<Morocco />} />
                  <Route path="/country/brazil" element={<Brazil />} />
                  <Route path="/country/new-zealand" element={<NewZealand />} />
                  <Route path="/country/egypt" element={<Egypt />} />
                  <Route path="/country/mexico" element={<Mexico />} />
                  <Route path="/country/switzerland" element={<Switzerland />} />
                  <Route path="/country/south-korea" element={<Southkorea />} />
                  <Route path="/country/vietnam" element={<Vietnam />} />
                  <Route path="/country/portugal" element={<Portugal />} />
                  <Route path="/country/peru" element={<Peru />} />
                  <Route path="/country/croatia" element={<Croatia />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/create-blog" element={<BlogEditor />} />
                  <Route 
                    path="/blog/:id" 
                    element={
                      <ProtectedRoute>
                        <BlogPost />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/edit-blog/:id" 
                    element={
                      <ProtectedRoute>
                        <BlogEditor />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </div>
            </main>

            <footer className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-8 sm:py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {/* Logo SVG */}
                      <h4 className="text-lg sm:text-xl font-bold">TrevGuide</h4>
                    </div>
                    <p className="text-orange-100/90">
                      Your ultimate travel companion for discovering the world's most amazing destinations.
                    </p>
                    <div className="flex space-x-4">
                      {/* Social Icons */}
                    </div>
                  </div>
                  
                  {['Explore', 'Company', 'Support'].map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h4 className="text-lg font-semibold">{section}</h4>
                      <ul className="space-y-2">
                        {['About', 'Services', 'Blogs'].map((item, i) => (
                          <li key={i}>
                            <Link to={`/${item.toLowerCase()}`} className="text-orange-100/90 hover:text-white">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-orange-800/50 mt-8 pt-8 text-center">
                  <p className="text-sm text-orange-100/80">
                    &copy; {new Date().getFullYear()} TrevGuide. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
            
            {/* Install buttons */}
            {(isInstallable || deferredPrompt) && (
              <button
                onClick={handleInstallClick}
                className="fixed bottom-4 right-4 bg-orange-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center space-x-2 hover:bg-orange-800 transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Install App</span>
              </button>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}

// Fixed SocialIcon component
const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    className="p-2 hover:bg-orange-800/30 rounded-lg transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

// Simplified ErrorBoundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-800"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('username');
  return isAuthenticated ? children : <Navigate to="/signup" />;
};

export default App;