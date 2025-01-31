import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Switzerland() {
  const [activeSection, setActiveSection] = useState('discover');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const switzerlandData = {
    intro: {
      image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
      title: "Discover Switzerland",
      subtitle: "Land of Alps and Innovation",
      flag: "https://flagcdn.com/ch.svg",
      basicInfo: {
        capital: "Bern",
        language: "German, French, Italian, Romansh",
        population: "8.7 Million",
        currency: {
          name: "Swiss Franc (CHF)",
          symbol: "CHF",
          rate: "1 USD ≈ CHF 0.89"
        },
        timeZone: "GMT+1",
        drivingSide: "Right",
        callingCode: "+41"
      }
    },
    sections: [
      {
        id: 'discover',
        icon: '🏔️',
        title: 'Discover',
        content: {
          travelGuide: {
            seasons: {
              spring: {
                months: "March to May",
                temp: "8°C to 15°C",
                description: "Mild weather, blooming meadows",
                highlights: ["Alpine flowers", "Easter festivals", "Hiking begins"]
              },
              summer: {
                months: "June to August",
                temp: "18°C to 28°C",
                description: "Perfect for outdoor activities",
                highlights: ["Mountain hiking", "Lake swimming", "Music festivals"]
              },
              autumn: {
                months: "September to November",
                temp: "10°C to 18°C",
                description: "Golden landscapes, wine harvest",
                highlights: ["Wine tasting", "Cultural events", "Less crowds"]
              },
              winter: {
                months: "December to February",
                temp: "-2°C to 7°C",
                description: "Snow sports season",
                highlights: ["Skiing", "Christmas markets", "Fondue nights"]
              }
            },
            budget: {
              backpacker: {
                daily: "CHF 70-120",
                accommodation: "Hostels & Mountain huts",
                food: "Supermarkets & Street food",
                transport: "Public transport pass"
              },
              midRange: {
                daily: "CHF 200-350",
                accommodation: "3-star hotels & B&Bs",
                food: "Cafes & Restaurants",
                transport: "Train passes & Local transport"
              },
              luxury: {
                daily: "CHF 500+",
                accommodation: "Luxury hotels & Chalets",
                food: "Fine dining & Mountain restaurants",
                transport: "First-class rail & Private transfers"
              }
            },
            transport: {
              types: [
                {
                  mode: "Swiss Travel Pass",
                  cost: "CHF 232-369 (3-8 days)",
                  description: "Unlimited travel on trains, buses & boats",
                  tips: ["Book in advance", "Download SBB app", "Check coverage"]
                },
                {
                  mode: "Regional Transport",
                  cost: "CHF 3-15 per trip",
                  description: "Efficient local connections",
                  tips: ["Get day passes", "Check schedules", "Use transport apps"]
                },
                {
                  mode: "Mountain Transport",
                  cost: "CHF 30-100",
                  description: "Cable cars & mountain railways",
                  tips: ["Early booking", "Weather check", "Combo passes"]
                }
              ]
            },
            visa: {
              schengen: {
                process: "Embassy application",
                duration: "90 days max",
                cost: "CHF 80",
                requirements: ["Valid passport", "Travel insurance", "Hotel bookings", "Bank statements"]
              }
            }
          },
          highlights: [
            {
              image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
              title: "Alpine Paradise",
              description: "Majestic mountain landscapes"
            },
            {
              image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6",
              title: "Swiss Precision",
              description: "World-class infrastructure"
            },
            {
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
              title: "Cultural Diversity",
              description: "Four language regions"
            }
          ]
        }
      },
      {
        id: 'explore',
        icon: '🗺️',
        title: 'Must Visit',
        places: [
          {
            name: "Zermatt",
            location: "Valais",
            image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd",
            description: "Car-free village with Matterhorn views",
            tags: ["Skiing", "Hiking", "Scenic"]
          },
          {
            name: "Lucerne",
            location: "Central Switzerland",
            image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd",
            description: "Medieval architecture meets lake views",
            tags: ["Culture", "History", "Nature"]
          },
          {
            name: "Interlaken",
            location: "Bernese Oberland",
            image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b",
            description: "Adventure sports capital",
            tags: ["Adventure", "Lakes", "Mountains"]
          }
        ]
      },
      {
        id: 'experience',
        icon: '✨',
        title: 'Experiences',
        activities: [
          {
            title: "Mountains",
            items: ["Alpine skiing", "Glacier excursions", "Mountain biking"]
          },
          {
            title: "Culture",
            items: ["Chocolate making", "Watch museums", "Folk festivals"]
          },
          {
            title: "Gastronomy",
            items: ["Fondue tasting", "Wine tours", "Mountain restaurants"]
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
            {Object.entries(switzerlandData.sections[0].content.travelGuide.seasons).map(([season, info]) => (
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
            {Object.entries(switzerlandData.sections[0].content.travelGuide.budget).map(([level, details]) => (
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
            {switzerlandData.sections[0].content.travelGuide.transport.types.map((type, index) => (
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
                <p className="text-gray-700">{switzerlandData.sections[0].content.travelGuide.visa.schengen.process}</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Duration:</span>
                  {switzerlandData.sections[0].content.travelGuide.visa.schengen.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Cost:</span>
                  {switzerlandData.sections[0].content.travelGuide.visa.schengen.cost}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Requirements</h4>
              <ul className="space-y-2">
                {switzerlandData.sections[0].content.travelGuide.visa.schengen.requirements.map((req, idx) => (
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
          {switzerlandData.sections[0].content.highlights.map((item, index) => (
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
            src={switzerlandData.intro.image}
            alt="Switzerland"
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">{switzerlandData.intro.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 sm:mb-12">{switzerlandData.intro.subtitle}</p>
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full max-w-full overflow-x-auto">
            {switzerlandData.sections.map((section) => (
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
                  src={switzerlandData.intro.flag}
                  alt="Flag of Switzerland"
                  className="w-48 sm:w-64 h-auto shadow-lg rounded-lg animate-flag-wave"
                />
                <div className="mt-6 sm:mt-8 text-center">
                  <span className="text-4xl sm:text-6xl font-bold text-orange-900 mb-2 block">CHF</span>
                  <span className="text-lg sm:text-xl text-gray-600">1 USD ≈ CHF 0.89</span>
                </div>
              </div>

              {/* Country Info Grid */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(switzerlandData.intro.basicInfo).map(([key, value]) => (
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
                    {switzerlandData.sections[1].places.map((place, index) => (
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
                  {switzerlandData.sections.find(s => s.id === 'experience').activities.map((activity, index) => (
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

export default Switzerland;