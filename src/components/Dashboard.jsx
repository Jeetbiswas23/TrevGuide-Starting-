import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ username, userProfile: initialProfile }) {
  const [activeTab, setActiveTab] = useState('trips');

  const userStats = {
    tripsPlanned: 12,
    placesVisited: 8,
    totalSaved: 15,
    reviewsWritten: 6
  };

  const upcomingTrips = [
    {
      id: 1,
      destination: "Paris",
      date: "Mar 15, 2024",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      status: "Confirmed"
    },
    {
      id: 2,
      destination: "Tokyo",
      date: "Apr 22, 2024",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      status: "Planning"
    }
  ];

  const savedPlaces = [
    {
      id: 1,
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e"
    },
    {
      id: 2,
      name: "Machu Picchu",
      country: "Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1"
    },
    {
      id: 3,
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
    }
  ];

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced User Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing 
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl font-bold text-orange-900">
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

        {/* Stats Section with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Trips Planned', value: userStats.tripsPlanned, icon: '✈️', trend: '+2 this month' },
            { label: 'Places Visited', value: userStats.placesVisited, icon: '📍', trend: 'Latest: Paris' },
            { label: 'Places Saved', value: userStats.totalSaved, icon: '❤️', trend: '3 new saves' },
            { label: 'Reviews', value: userStats.reviewsWritten, icon: '⭐', trend: '4.8 avg rating' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-orange-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
              <div className="text-sm text-orange-600 mt-2">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Main Content Tabs with enhanced UI */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {['trips', 'saved', 'reviews', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center px-6 py-4 font-semibold transition-colors capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-orange-500 text-orange-900 bg-orange-50'
                      : 'text-gray-500 hover:text-orange-900 hover:bg-gray-50'
                  }`}
                >
                  {/* Add icons for each tab */}
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

          {/* Existing tab content with minor enhancements */}
          <div className="p-6">
            <div className="space-y-8">
              {activeTab === 'trips' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Upcoming Trips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingTrips.map(trip => (
                      <div key={trip.id} className="flex bg-gray-50 rounded-xl overflow-hidden">
                        <img 
                          src={trip.image} 
                          alt={trip.destination}
                          className="w-32 h-32 object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-semibold">{trip.destination}</h4>
                            <p className="text-gray-600">{trip.date}</p>
                          </div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                            trip.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {trip.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Saved Places</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {savedPlaces.map(place => (
                      <div key={place.id} className="group relative overflow-hidden rounded-xl">
                        <img 
                          src={place.image} 
                          alt={place.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <div className="text-white">
                            <h4 className="text-lg font-semibold">{place.name}</h4>
                            <p className="text-sm text-gray-300">{place.country}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No reviews written yet</p>
                  <Link 
                    to="/countries" 
                    className="mt-4 inline-block bg-orange-900 text-white px-6 py-2 rounded-full hover:bg-orange-800 transition-colors"
                  >
                    Explore Places to Review
                  </Link>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your trips</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-900"></div>
                      </label>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold">Travel Updates</h4>
                        <p className="text-sm text-gray-600">Get notified about travel deals</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-900"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;