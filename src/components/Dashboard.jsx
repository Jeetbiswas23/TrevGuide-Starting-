import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ username: propUsername, userProfile: initialProfile }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(propUsername || localStorage.getItem('username'));

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      setUsername(propUsername);
      localStorage.setItem('username', propUsername);
    }
  }, [propUsername]);

  const [activeTab, setActiveTab] = useState('trips');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: username || 'Traveler',
    bio: localStorage.getItem('bio') || 'No bio yet...',
    location: localStorage.getItem('location') || 'Earth',
    joinDate: localStorage.getItem('joinDate') || new Date().toLocaleDateString(),
    travelPreferences: JSON.parse(localStorage.getItem('travelPreferences')) || ['Adventure', 'Culture'],
    nextDestination: localStorage.getItem('nextDestination') || 'Planning...'
  });
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');
  const fileInputRef = useRef(null);

  const availableTags = [
    'Adventure', 'Culture', 'Food', 'Nature', 'Photography', 'History',
    'Beach', 'Mountains', 'City', 'Luxury', 'Budget', 'Solo Travel'
  ];

  const handleProfileUpdate = () => {
    localStorage.setItem('bio', userProfile.bio);
    localStorage.setItem('location', userProfile.location);
    localStorage.setItem('travelPreferences', JSON.stringify(userProfile.travelPreferences));
    localStorage.setItem('nextDestination', userProfile.nextDestination);
    setIsEditing(false);
  };

  const toggleTag = (tag) => {
    setUserProfile(prev => ({
      ...prev,
      travelPreferences: prev.travelPreferences.includes(tag)
        ? prev.travelPreferences.filter(t => t !== tag)
        : [...prev.travelPreferences, tag]
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    localStorage.removeItem('profileImage');
  };

  // Add logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('userBlogs')) || []);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    destination: '',
    date: '',
    content: '',
    images: [],
    tags: [],
    category: 'adventure' // New field
  });

  // Add this to save blogs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userBlogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const blogPost = {
      ...newBlog,
      id: Date.now(),
      author: username,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    setBlogs(prev => [blogPost, ...prev]);
    setShowBlogForm(false);
    setNewBlog({ title: '', destination: '', date: '', content: '', images: [], tags: [] });
  };

  // Rename this handler for blog images
  const handleBlogImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteBlog = (blogId) => {
    setBlogs(prev => prev.filter(blog => blog.id !== blogId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          {/* Replace the flex justify-between with flex justify-end */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isEditing 
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              {profileImage ? (
                <div className="relative">
                  <img 
                    src={profileImage} 
                    alt={username}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                  {isEditing && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      title="Remove photo"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                  {username?.charAt(0).toUpperCase()}
                </div>
              )}
              
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
                    title="Upload photo"
                  >
                    📷
                  </button>
                </>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{username}</h2>
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="px-4 py-1 border-2 border-orange-200 rounded-full text-sm focus:outline-none focus:border-orange-500"
                  />
                ) : (
                  <span className="px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {userProfile.location}
                  </span>
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-orange-500"
                  rows="3"
                />
              ) : (
                <p className="text-gray-600 mb-4">{userProfile.bio}</p>
              )}

              {isEditing && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Select your travel interests:</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          userProfile.travelPreferences.includes(tag)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {!isEditing && userProfile.travelPreferences.map((pref, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              {['trips', 'saved', 'reviews', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50'
                      : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <span className="mr-2">
                    {tab === 'trips' && '🗺️'}
                    {tab === 'saved' && '🔖'}
                    {tab === 'reviews' && '📝'}
                    {tab === 'settings' && '⚙️'}
                  </span>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'trips' && (
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-800">Travel Stories</h3>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl 
                      hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 
                      shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Share Your Story</span>
                  </button>
                </div>

                {/* Blog Categories */}
                <div className="flex overflow-x-auto gap-4 mb-8 pb-4 scrollbar-hide">
                  {['All', 'Adventure', 'Culture', 'Food', 'Nature', 'City Life'].map((category) => (
                    <button
                      key={category}
                      className="px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap
                        bg-orange-50 text-orange-800 hover:bg-orange-100 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                      transition-all duration-300 transform hover:-translate-y-1">
                      {/* Blog Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        {blog.images[0] ? (
                          <img
                            src={blog.images[0]}
                            alt={blog.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 space-x-2">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
                            hover:bg-white transition-colors">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{blog.destination}</span>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 
                          transition-colors">{blog.title}</h4>
                        <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 text-xs font-medium bg-orange-50 text-orange-800 
                              rounded-full">{tag}</span>
                          ))}
                        </div>

                        {/* Author and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 
                              flex items-center justify-center text-white font-medium">
                              {blog.author[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => deleteBlog(blog.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete story"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {blogs.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your First Story</h3>
                    <p className="text-gray-600 mb-8">Start documenting your travel adventures</p>
                    <button
                      onClick={() => setShowBlogForm(true)}
                      className="bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 
                        transition-colors transform hover:scale-105"
                    >
                      Create Blog Post
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Saved Places</h3>
                <p className="text-gray-600 mb-6">Save your favorite destinations for later</p>
                <Link 
                  to="/explore" 
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all"
                >
                  Discover Places
                </Link>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Reviews Yet</h3>
                <p className="text-gray-600 mb-6">Share your travel experiences</p>
                <Link 
                  to="/explore" 
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all"
                >
                  Write a Review
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
                <div className="space-y-4">
                  {/* Simple settings toggles */}
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div>
                      <h4 className="font-semibold">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your trips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;