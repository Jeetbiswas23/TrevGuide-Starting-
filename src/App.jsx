import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup'; // Import the Signup component
import Countries from './components/Countries'; // Add this import
import './index.css'; // Import the CSS file

function App() {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setUsername('');
    setShowDropdown(false);
    // Add a small delay before reloading to ensure state is cleared
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const popularPlaces = [
    { 
      id: 1, 
      name: "Paris", 
      country: "France", 
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop", 
      description: "City of Love and Lights" 
    },
    { 
      id: 2, 
      name: "Bali", 
      country: "Indonesia", 
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop", 
      description: "Tropical Paradise" 
    },
    { 
      id: 3, 
      name: "Tokyo", 
      country: "Japan", 
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1971&auto=format&fit=crop", 
      description: "Modern Meets Traditional" 
    },
    { 
      id: 4, 
      name: "Rome", 
      country: "Italy", 
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop", 
      description: "Eternal City" 
    },
    { 
      id: 5, 
      name: "New York", 
      country: "USA", 
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop", 
      description: "The City That Never Sleeps" 
    },
    { 
      id: 6, 
      name: "Sydney", 
      country: "Australia", 
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop", 
      description: "Harbor City" 
    }
  ];

  return (
    <Router>
      <div className="bg-gray-50 text-orange-900 min-h-screen flex flex-col">
        <header className="bg-orange-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-3xl">TrevGuide</h1>
          <nav className="flex space-x-4 items-center">
            <Link to="/" className="text-white nav-link">Home</Link>
            <Link to="/countries" className="text-white nav-link">Countries</Link>
            <Link to="/contact" className="text-white nav-link">Contact</Link>
            {username ? (
              <div className="relative">
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-orange-900 font-bold text-lg">{username.charAt(0).toUpperCase()}</span>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signup" className="text-white nav-link">Sign Up</Link>
            )}
          </nav>
        </header>
        <main className="flex-grow p-4 flex flex-col items-center">
          <Routes>
            <Route path="/" element={
              <>
                <h2 className="text-4xl mb-4">Welcome to TrevGuide</h2>
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                  alt="Travel destination" 
                  className="mb-8 w-1/2 h-auto rounded-lg shadow-lg" 
                />
                <h3 className="text-4xl font-bold mb-6">Popular Places to Visit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                  {popularPlaces.map(place => (
                    <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-xl font-bold text-orange-900">{place.name}</h4>
                        <p className="text-gray-600">{place.country}</p>
                        <p className="mt-2 text-gray-700">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            } />
            <Route path="/signup" element={<Signup setUsername={setUsername} />} />
            <Route path="/countries" element={<Countries />} />
          </Routes>
        </main>
        <footer className="bg-orange-900 text-white p-4 text-center">
          <p>&copy; 2024 Travel Guide. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;