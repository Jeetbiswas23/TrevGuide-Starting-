import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function NewZealand() {
  const [activeSection, setActiveSection] = useState('discover');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const newZealandData = {
    intro: {
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
      title: "Discover New Zealand",
      subtitle: "Land of the Long White Cloud",
      flag: "https://flagcdn.com/nz.svg",
      basicInfo: {
        capital: "Wellington",
        language: "English, Māori",
        population: "5.1 Million",
        currency: {
          name: "New Zealand Dollar (NZD)",
          symbol: "$",
          rate: "1 USD ≈ NZ$1.65"
        },
        timeZone: "GMT+12",
        drivingSide: "Left",
        callingCode: "+64"
      }
    },
    sections: [
      {
        id: 'discover',
        icon: '🌿',
        title: 'Discover',
        content: {
          travelGuide: {
            seasons: {
              spring: {
                months: "September to November",
                temp: "12°C to 19°C",
                description: "Mild temperatures, spring blooms",
                highlights: ["Garden festivals", "Lambing season", "Hiking trails"]
              },
              summer: {
                months: "December to February",
                temp: "20°C to 25°C",
                description: "Warm days, perfect for beaches",
                highlights: ["Beach activities", "Water sports", "Outdoor festivals"]
              },
              autumn: {
                months: "March to May",
                temp: "15°C to 20°C",
                description: "Cool crisp days, autumn colors",
                highlights: ["Wine harvests", "Fall foliage", "Cultural events"]
              },
              winter: {
                months: "June to August",
                temp: "5°C to 12°C",
                description: "Snow in mountains, mild in north",
                highlights: ["Skiing", "Hot springs", "Winter festivals"]
              }
            },
            budget: {
              backpacker: {
                daily: "NZ$70-100",
                accommodation: "Hostels & Holiday Parks",
                food: "Self-catering & Food trucks",
                transport: "Public buses & Shuttles"
              },
              midRange: {
                daily: "NZ$200-300",
                accommodation: "B&Bs & Motels",
                food: "Cafes & Casual restaurants",
                transport: "Rental car & Domestic flights"
              },
              luxury: {
                daily: "NZ$500+",
                accommodation: "Luxury lodges & Boutique hotels",
                food: "Fine dining & Wine tours",
                transport: "Private tours & Helicopter transfers"
              }
            },
            transport: {
              types: [
                {
                  mode: "Car Rental",
                  cost: "NZ$40-100 per day",
                  description: "Best way to explore the country",
                  tips: ["Book in advance", "Get insurance", "Check rural road conditions"]
                },
                {
                  mode: "InterCity Bus",
                  cost: "NZ$20-50 per trip",
                  description: "Extensive network between cities",
                  tips: ["Buy FlexiPass", "Book ahead", "Check schedules"]
                },
                {
                  mode: "Domestic Flights",
                  cost: "NZ$50-200",
                  description: "Quick travel between major cities",
                  tips: ["Compare airlines", "Book early", "Check baggage limits"]
                }
              ]
            },
            visa: {
              eVisa: {
                process: "Online application",
                duration: "3-6 months",
                cost: "NZ$35",
                requirements: ["Valid passport", "Travel plans", "Sufficient funds", "Return ticket"]
              }
            }
          },
          highlights: [
            {
              image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad",
              title: "Natural Wonders",
              description: "From glaciers to thermal springs"
            },
            {
              image: "https://images.unsplash.com/photo-1528164344705-47542687000d",
              title: "Māori Culture",
              description: "Rich indigenous heritage"
            },
            {
              image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
              title: "Adventure Sports",
              description: "World's adventure capital"
            }
          ]
        }
      },
      {
        id: 'explore',
        icon: '🏔️',
        title: 'Must Visit',
        places: [
          {
            name: "Milford Sound",
            location: "Fiordland",
            image: "https://images.unsplash.com/photo-1578284747280-55bfa83160c3",
            description: "Stunning fiord with waterfalls",
            tags: ["Nature", "Cruise", "Photography"]
          },
          {
            name: "Rotorua",
            location: "Bay of Plenty",
            image: "https://images.unsplash.com/photo-1584096006933-8ab08c9e0e0a",
            description: "Geothermal wonders and Māori culture",
            tags: ["Culture", "Hot Springs", "Adventure"]
          },
          {
            name: "Queenstown",
            location: "Otago",
            image: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d",
            description: "Adventure sports capital",
            tags: ["Adventure", "Scenery", "Nightlife"]
          }
        ]
      },
      {
        id: 'experience',
        icon: '🌟',
        title: 'Experiences',
        activities: [
          {
            title: "Nature",
            items: ["Glacier hiking", "Whale watching", "Glow worm caves"]
          },
          {
            title: "Adventure",
            items: ["Bungee jumping", "Skydiving", "White water rafting"]
          },
          {
            title: "Culture",
            items: ["Māori hangi", "Haka performance", "Farm stays"]
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
            {Object.entries(newZealandData.sections[0].content.travelGuide.seasons).map(([season, info]) => (
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
            {Object.entries(newZealandData.sections[0].content.travelGuide.budget).map(([level, details]) => (
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
            {newZealandData.sections[0].content.travelGuide.transport.types.map((type, index) => (
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
              <h4 className="text-xl font-bold text-orange-900 mb-4">e-Visa Process</h4>
              <div className="space-y-4">
                <p className="text-gray-700">{newZealandData.sections[0].content.travelGuide.visa.eVisa.process}</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Duration:</span>
                  {newZealandData.sections[0].content.travelGuide.visa.eVisa.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Cost:</span>
                  {newZealandData.sections[0].content.travelGuide.visa.eVisa.cost}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Requirements</h4>
              <ul className="space-y-2">
                {newZealandData.sections[0].content.travelGuide.visa.eVisa.requirements.map((req, idx) => (
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
          {newZealandData.sections[0].content.highlights.map((item, index) => (
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
            src={newZealandData.intro.image}
            alt="New Zealand"
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">{newZealandData.intro.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 sm:mb-12">{newZealandData.intro.subtitle}</p>
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full max-w-full overflow-x-auto">
            {newZealandData.sections.map((section) => (
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
                  src={newZealandData.intro.flag}
                  alt="Flag of New Zealand"
                  className="w-48 sm:w-64 h-auto shadow-lg rounded-lg animate-flag-wave"
                />
                <div className="mt-6 sm:mt-8 text-center">
                  <span className="text-4xl sm:text-6xl font-bold text-orange-900 mb-2 block">$</span>
                  <span className="text-lg sm:text-xl text-gray-600">1 USD ≈ NZ$1.65</span>
                </div>
              </div>

              {/* Country Info Grid */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(newZealandData.intro.basicInfo).map(([key, value]) => (
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
                    {newZealandData.sections[1].places.map((place, index) => (
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
                  {newZealandData.sections.find(s => s.id === 'experience').activities.map((activity, index) => (
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

export default NewZealand;