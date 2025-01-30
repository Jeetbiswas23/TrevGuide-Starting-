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
import newzeland from './components/Country/newzeland';

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
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
                  {['Home', 'Countries', 'Contact'].map((item) => (
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
            <Route path="/country/spain" element={<Spain />} />
            <Route path="/country/greece" element={<Greece />} />
            <Route path="/country/thailand" element={<Thiland />} />
            <Route path="/country/morocco" element={<Morocco />} />
            <Route path="/country/brazil" element={<Brazil />} />
            <Route path="/country/newzeland" element={<newzeland />} />
          </Routes>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-8 sm:py-12 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-[100vw]">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 px-2">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-6 h-6" 
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
                <h4 className="text-lg sm:text-xl font-bold">TrevGuide</h4>
              </div>
              <p className="text-sm sm:text-base text-orange-100/90 leading-relaxed">
                Your ultimate travel companion for discovering the world's most amazing destinations.
                Join us in exploring breathtaking places and creating unforgettable memories.
              </p>
              <div className="flex space-x-4 pt-2">
                {/* Social Media Icons */}
                <SocialIcon
                  href="https://linkedin.com"
                  icon={
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://twitter.com"
                  icon={
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://instagram.com"
                  icon={
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://youtube.com"
                  icon={
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Footer Links */}
            {['Explore', 'Company', 'Support'].map((section, index) => (
              <div key={index} className="space-y-3 sm:space-y-4 px-2">
                <h4 className="text-base sm:text-lg font-semibold tracking-wide">{section}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {['About', 'Services', 'Contact'].map((item, i) => (
                    <li key={i}>
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="text-sm sm:text-base text-orange-100/90 hover:text-white transition-colors inline-block
                          hover:translate-x-1 transform duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-orange-800/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center px-2">
            <p className="text-xs sm:text-sm text-orange-100/80">
              &copy; {new Date().getFullYear()} TrevGuide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {isInstallable && (
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
      {deferredPrompt && (
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
  );
}

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

export default App;