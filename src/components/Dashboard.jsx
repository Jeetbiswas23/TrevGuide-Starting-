import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ username, userProfile: initialProfile }) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
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
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              {username?.charAt(0).toUpperCase()}
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
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Trips Planned Yet</h3>
                <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
                <Link 
                  to="/explore" 
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all"
                >
                  Explore Destinations
                </Link>
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