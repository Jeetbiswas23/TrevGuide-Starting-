import React, { useState, useEffect } from 'react';

function Countries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    // Simulate loading and preload images
    const preloadImages = async () => {
      setIsLoading(true);
      const imagePromises = countries.map(country => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = country.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"/>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"/>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"/>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"/>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"/>
          <div className="space-y-2">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 rounded w-3/4"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-orange-900 mb-8 text-center">Explore Countries</h2>
      
      <div className="max-w-4xl mx-auto mb-12"> {/* Changed from max-w-md and increased margin bottom */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-lg" /* Updated padding, text size, border, and added shadow */
          />
          <svg
            className="absolute right-6 top-5 h-6 w-6 text-gray-400" /* Adjusted position and size of icon */
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Show skeleton loading while images are loading
          Array(9).fill(0).map((_, index) => <SkeletonCard key={index} />)
        ) : (
          filteredCountries.map(country => (
            <div key={country.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={country.image} 
                alt={country.name} 
                className="w-full h-48 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-900 mb-2">{country.name}</h3>
                <p className="text-gray-600 mb-2">Capital: {country.capital}</p>
                <p className="text-gray-700 mb-4">{country.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-800">Top Attractions:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {country.attractions.map((attraction, index) => (
                      <li key={index}>{attraction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Countries;