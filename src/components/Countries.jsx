import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
      <p className="text-xl text-gray-600">Loading amazing destinations...</p>
    </div>
  </div>
);

const CountryCard = React.memo(({ country, onClick }) => (
  <div 
    className="group bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl cursor-pointer"
    onClick={() => onClick(country.name)}
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={country.image} 
        alt={country.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
      <h3 className="absolute bottom-4 left-6 text-3xl font-bold text-white">{country.name}</h3>
    </div>
    <div className="p-8">
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold text-orange-900">Capital:</span>
        <span className="ml-2 text-gray-600">{country.capital}</span>
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">{country.description}</p>
      <div>
        <h4 className="font-semibold text-orange-900 mb-3">Top Attractions:</h4>
        <ul className="space-y-2">
          {country.attractions.map((attraction, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="text-orange-500 mr-2">✦</span>
              {attraction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));

function Countries() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const countries = [
    {
      id: 1,
      name: "France",
      capital: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
      description: "Known for its rich culture, historic architecture, and culinary excellence.",
      attractions: ["Eiffel Tower", "Louvre Museum", "Palace of Versailles"]
    },
    {
      id: 2,
      name: "Japan",
      capital: "Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      description: "A unique blend of modern technology and ancient traditions.",
      attractions: ["Mount Fuji", "Kyoto Temples", "Tokyo Tower"]
    },
    {
      id: 3,
      name: "Italy",
      capital: "Rome",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      description: "Home to ancient ruins, artistic masterpieces, and amazing cuisine.",
      attractions: ["Colosseum", "Venice Canals", "Vatican City"]
    },
    {
      id: 4,
      name: "Spain",
      capital: "Madrid",
      image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325",
      description: "Home to vibrant culture, stunning architecture, and world-famous cuisine.",
      attractions: ["Sagrada Familia", "Alhambra", "Plaza Mayor"]
    },
    {
      id: 5,
      name: "Greece",
      capital: "Athens",
      image: "https://images.unsplash.com/photo-1503152394-c571994fd383",
      description: "Ancient ruins, beautiful islands, and Mediterranean charm.",
      attractions: ["Acropolis", "Santorini", "Parthenon"]
    },
    {
      id: 6,
      name: "Thailand",
      capital: "Bangkok",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      description: "Tropical beaches, ornate temples, and amazing street food.",
      attractions: ["Grand Palace", "Phi Phi Islands", "Wat Phra Kaew"]
    },
    {
      id: 7,
      name: "Morocco",
      capital: "Rabat",
      image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70",
      description: "Colorful markets, desert adventures, and rich history.",
      attractions: ["Medina of Marrakech", "Sahara Desert", "Hassan II Mosque"]
    },
    {
      id: 8,
      name: "Brazil",
      capital: "Brasília",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
      description: "Vibrant culture, Amazon rainforest, and beautiful beaches.",
      attractions: ["Christ the Redeemer", "Iguazu Falls", "Copacabana Beach"]
    },
    {
      id: 80,
      name: "New Zealand",
      capital: "Wellington",
      image: "https://images.unsplash.com/photo-1469521669194-babb45599def",
      description: "Stunning landscapes, Maori culture, and outdoor adventures.",
      attractions: ["Milford Sound", "Hobbiton", "Rotorua"]
    },
    {
      id: 9,
      name: "Egypt",
      capital: "Cairo",
      image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
      description: "Ancient pyramids, rich history, and the magnificent Nile River.",
      attractions: ["Pyramids of Giza", "Valley of the Kings", "Egyptian Museum"]
    },
    {
      id: 10,
      name: "India",
      capital: "New Delhi",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      description: "Diverse culture, ancient temples, and vibrant festivals.",
      attractions: ["Taj Mahal", "Jaipur Palace", "Varanasi Ghats"]
    },
    {
      id: 11,
      name: "Mexico",
      capital: "Mexico City",
      image: "https://images.unsplash.com/photo-1518638150340-f706e86654de",
      description: "Rich history, beautiful beaches, and amazing food.",
      attractions: ["Chichen Itza", "Tulum Ruins", "Cancun Beaches"]
    },
    {
      id: 12,
      name: "Switzerland",
      capital: "Bern",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
      description: "Stunning Alps, pristine lakes, and chocolate paradise.",
      attractions: ["Matterhorn", "Lake Geneva", "Lucerne"]
    },
    {
      id: 13,
      name: "South Korea",
      capital: "Seoul",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451",
      description: "Modern technology, ancient temples, and K-pop culture.",
      attractions: ["Gyeongbokgung Palace", "Namsan Tower", "Jeju Island"]
    },
    {
      id: 14,
      name: "Vietnam",
      capital: "Hanoi",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592",
      description: "Beautiful landscapes, rich history, and delicious cuisine.",
      attractions: ["Ha Long Bay", "Hoi An", "Cu Chi Tunnels"]
    },
    {
      id: 15,
      name: "Portugal",
      capital: "Lisbon",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b",
      description: "Historic cities, beautiful beaches, and port wine.",
      attractions: ["Porto", "Sintra Palace", "Algarve Coast"]
    },
    {
      id: 16,
      name: "Peru",
      capital: "Lima",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
      description: "Ancient Incan ruins, Amazon rainforest, and rich culture.",
      attractions: ["Machu Picchu", "Cusco", "Sacred Valley"]
    },
    {
      id: 17,
      name: "Croatia",
      capital: "Zagreb",
      image: "https://images.unsplash.com/photo-1581930407536-ba4fd42d4332?q=80&w=2070&auto=format&fit=crop",  // Updated Croatia image to show Dubrovnik
      description: "Beautiful coastline, historic cities, and crystal clear waters.",
      attractions: ["Dubrovnik", "Plitvice Lakes", "Split"]
    },
    {
      id: 18,
      name: "Iceland",
      capital: "Reykjavik",
      image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf",
      description: "Northern lights, volcanic landscapes, and hot springs.",
      attractions: ["Blue Lagoon", "Golden Circle", "Vatnajökull Glacier"]
    },
    {
      id: 19,
      name: "Turkey",
      capital: "Ankara",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop",  // Updated Turkey image
      description: "Where East meets West, with ancient ruins and stunning mosques.",
      attractions: ["Hagia Sophia", "Cappadocia", "Blue Mosque"]
    },
    {
      id: 20,
      name: "Norway",
      capital: "Oslo",
      image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627",  // Updated image URL
      description: "Fjords, northern lights, and Viking heritage.",
      attractions: ["Geirangerfjord", "Trolltunga", "Bergen Fish Market"]
    }
  ];

  const filteredCountries = useMemo(() => 
    countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  const handleCountryClick = useCallback((countryName) => {
    const countryRoutes = {
      'Japan': '/country/japan',
      'India': '/country/india',
      'France': '/country/france',
      'Italy': '/country/italy',
      'Spain': '/country/spain',
      'Greece': '/country/greece',
      'Thailand': '/country/thailand',
      'Morocco': '/country/morocco',
      'Brazil': '/country/brazil',
      'New Zealand': '/country/new-zealand',
      'Egypt': '/country/egypt',
    };

    const route = countryRoutes[countryName] || `/country/${countryName.toLowerCase()}`;
    navigate(route);
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-16 text-center">
        <h2 className="text-6xl font-bold text-orange-900 mb-4">Explore Countries</h2>
        <p className="text-xl text-gray-600 mb-8">Discover amazing destinations around the world</p>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search country name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-8 py-6 text-xl border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none shadow-xl transition-all duration-300"
            />
            <svg
              className="absolute right-8 top-7 h-8 w-8 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No countries found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCountries.map((country) => (
              <CountryCard 
                key={country.id}
                country={country}
                onClick={handleCountryClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Countries);