import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Croatia() {
  const [activeSection, setActiveSection] = useState('discover');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const croatiaData = {
    intro: {
      image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",  // Updated Dubrovnik image
      title: "Discover Croatia",
      subtitle: "Pearl of the Adriatic",
      flag: "https://flagcdn.com/hr.svg",
      basicInfo: {
        capital: "Zagreb",
        language: "Croatian",
        population: "4 Million",
        currency: {
          name: "Croatian Kuna (HRK)",
          symbol: "kn",
          rate: "1 USD ≈ 7.5 HRK"
        },
        timeZone: "GMT+1",
        drivingSide: "Right",
        callingCode: "+385"
      }
    },
    sections: [
      {
        id: 'discover',
        icon: '🌊',
        title: 'Discover',
        content: {
          travelGuide: {
            seasons: {
              spring: {
                months: "March to May",
                temp: "15°C to 23°C",
                description: "Mild temperatures, perfect for sightseeing",
                highlights: ["Easter festivals", "Lower prices", "Blooming nature"]
              },
              summer: {
                months: "June to August",
                temp: "26°C to 30°C",
                description: "Peak season, perfect beach weather",
                highlights: ["Beach activities", "Music festivals", "Island hopping"]
              },
              autumn: {
                months: "September to November",
                temp: "15°C to 25°C",
                description: "Pleasant weather, fewer tourists",
                highlights: ["Wine harvests", "Truffle hunting", "Cultural events"]
              },
              winter: {
                months: "December to February",
                temp: "5°C to 10°C",
                description: "Cool and quiet season",
                highlights: ["Christmas markets", "Skiing", "Thermal spas"]
              }
            },
            budget: {
              backpacker: {
                daily: "€40-60",
                accommodation: "Hostels & Guesthouses",
                food: "Street food & Local markets",
                transport: "Public buses & Ferries"
              },
              midRange: {
                daily: "€100-200",
                accommodation: "Mid-range hotels & Apartments",
                food: "Local restaurants & Cafes",
                transport: "Rental car & Catamarans"
              },
              luxury: {
                daily: "€300+",
                accommodation: "Luxury hotels & Villas",
                food: "Fine dining & Wine tours",
                transport: "Private yacht & Transfers"
              }
            },
            transport: {
              types: [
                {
                  mode: "Ferry",
                  cost: "€10-50 per trip",
                  description: "Essential for island hopping",
                  tips: ["Book in advance", "Check schedules", "Consider weather"]
                },
                {
                  mode: "Bus",
                  cost: "€15-30 per trip",
                  description: "Reliable intercity connections",
                  tips: ["Buy tickets early", "Compare companies", "Check routes"]
                },
                {
                  mode: "Car Rental",
                  cost: "€30-70 per day",
                  description: "Best for coastal exploration",
                  tips: ["Book ahead", "Check insurance", "Mind parking"]
                }
              ]
            },
            visa: {
              schengen: {
                process: "Visa-free for many countries",
                duration: "90 days",
                cost: "Free",
                requirements: ["Valid passport", "Travel insurance", "Return ticket", "Hotel bookings"]
              }
            }
          },
          highlights: [
            {
              image: "https://images.pexels.com/photos/2832045/pexels-photo-2832045.jpeg", // Croatian coast updated
              title: "Stunning Coastline",
              description: "1,777 kilometers of pristine shores"
            },
            {
              image: "https://images.pexels.com/photos/2832045/pexels-photo-2832045.jpeg", // Split architecture updated
              title: "Historic Cities",
              description: "Ancient Roman and Venetian heritage"
            },
            {
              image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95", // Plitvice
              title: "National Parks",
              description: "Pristine nature and waterfalls"
            }
          ]
        }
      },
      {
        id: 'explore',
        icon: '⛵',
        title: 'Must Visit',
        places: [
          {
            name: "Dubrovnik",
            location: "Southern Dalmatia",
            image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
            description: "Pearl of the Adriatic, ancient walled city",
            tags: ["History", "Game of Thrones", "Beaches"]
          },
          {
            name: "Plitvice Lakes",
            location: "Central Croatia",
            image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
            description: "UNESCO World Heritage site with 16 lakes",
            tags: ["Nature", "Waterfalls", "Hiking"]
          },
          {
            name: "Split",
            location: "Central Dalmatia",
            image: "https://images.pexels.com/photos/2832045/pexels-photo-2832045.jpeg",
            description: "Roman palace and vibrant harbor city",
            tags: ["History", "Nightlife", "Beaches"]
          }
        ]
      },
      {
        id: 'experience',
        icon: '🎭',
        title: 'Experiences',
        activities: [
          {
            title: "Coastal Life",
            items: ["Island hopping", "Beach clubs", "Sailing adventures"]
          },
          {
            title: "Culture",
            items: ["Roman ruins", "Medieval festivals", "Local wine tasting"]
          },
          {
            title: "Nature",
            items: ["National parks", "Cave exploring", "Sea kayaking"]
          }
        ]
      }
    ]
  };

  const renderDiscoverSection = () => (
    <div className="space-y-20">
      {/* Travel Guide Section */}
      <div className="space-y-16">
        {/* Seasons */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Best Time to Visit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(croatiaData.sections[0].content.travelGuide.seasons).map(([season, info]) => (
              <div key={season} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-orange-900 capitalize mb-4">{season}</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-2">🗓️</span>
                    {info.months}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-2">🌡️</span>
                    {info.temp}
                  </div>
                  <p className="text-gray-700">{info.description}</p>
                  <ul className="space-y-2">
                    {info.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="text-orange-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Travel Budgets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(croatiaData.sections[0].content.travelGuide.budget).map(([level, details]) => (
              <div key={level} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-orange-900 capitalize mb-4">{level}</h4>
                <div className="text-3xl font-bold text-orange-600 mb-4">{details.daily}</div>
                <div className="space-y-3">
                  {Object.entries(details).map(([key, value]) => (
                    key !== 'daily' && (
                      <div key={key} className="flex items-start">
                        <span className="text-orange-500 mr-2">✦</span>
                        <div>
                          <span className="font-medium text-gray-700 capitalize">{key}: </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Getting Around</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {croatiaData.sections[0].content.travelGuide.transport.types.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-orange-900 mb-4">{type.mode}</h4>
                <div className="text-2xl font-bold text-orange-600 mb-4">{type.cost}</div>
                <p className="text-gray-700 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-orange-500 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Visa */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-orange-900 mb-8">Visa Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Schengen Visa Process</h4>
              <div className="space-y-4">
                <p className="text-gray-700">{croatiaData.sections[0].content.travelGuide.visa.schengen.process}</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Duration:</span>
                  {croatiaData.sections[0].content.travelGuide.visa.schengen.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Cost:</span>
                  {croatiaData.sections[0].content.travelGuide.visa.schengen.cost}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Requirements</h4>
              <ul className="space-y-2">
                {croatiaData.sections[0].content.travelGuide.visa.schengen.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div>
        <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Country Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {croatiaData.sections[0].content.highlights.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
            >
              <img 
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-screen">
        <div className="absolute inset-0">
          <img 
            src={croatiaData.intro.image}
            alt="Croatia"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">{croatiaData.intro.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 sm:mb-12">{croatiaData.intro.subtitle}</p>
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full max-w-full overflow-x-auto">
            {croatiaData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all whitespace-nowrap
                  ${activeSection === section.id 
                    ? 'bg-white text-orange-900' 
                    : 'hover:bg-white/10'}`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main>
        {/* Basic Country Info Section */}
        <div className="bg-white py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Flag and Currency Column */}
              <div className="w-full lg:w-1/3 flex flex-col items-center">
                <img 
                  src={croatiaData.intro.flag}
                  alt="Flag of Croatia"
                  className="w-48 sm:w-64 h-auto shadow-lg rounded-lg animate-flag-wave"
                />
                <div className="mt-6 sm:mt-8 text-center">
                  <span className="text-4xl sm:text-6xl font-bold text-orange-900 mb-2 block">kn</span>
                  <span className="text-lg sm:text-xl text-gray-600">1 USD ≈ 7.5 HRK</span>
                </div>
              </div>

              {/* Country Info Grid */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(croatiaData.intro.basicInfo).map(([key, value]) => (
                  key !== 'currency' && (
                    <div key={key} className="bg-orange-50 p-6 rounded-xl">
                      <h3 className="text-orange-900 font-semibold capitalize mb-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-gray-700 text-lg">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
            {activeSection === 'discover' && (
              <div className="space-y-12 md:space-y-20">
                {renderDiscoverSection()}
              </div>
            )}
            {activeSection === 'explore' && (
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12 sm:space-y-16"
              >
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 gap-16">
                    {croatiaData.sections[1].places.map((place, index) => (
                      <div 
                        key={index}
                        className="flex flex-col md:flex-row gap-8 items-center"
                      >
                        <div className="w-full md:w-1/2">
                          <img 
                            src={place.image}
                            alt={place.name}
                            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <h3 className="text-3xl font-bold text-orange-900">{place.name}</h3>
                          <p className="text-orange-600">{place.location}</p>
                          <p className="text-gray-700 text-lg">{place.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {place.tags.map((tag, i) => (
                              <span 
                                key={i}
                                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
            {activeSection === 'experience' && (
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12 sm:space-y-16"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {croatiaData.sections.find(s => s.id === 'experience').activities.map((activity, index) => (
                    <div 
                      key={index}
                      className="bg-orange-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-2xl font-bold text-orange-900 mb-6">
                        {activity.title}
                      </h3>
                      <ul className="space-y-4">
                        {activity.items.map((item, i) => (
                          <li key={i} className="flex items-center text-gray-700">
                            <span className="text-orange-500 mr-3">✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Croatia;