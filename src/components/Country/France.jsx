import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function France() {
  const [activeSection, setActiveSection] = useState('discover');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const franceData = {
    intro: {
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Enchanting France",
      subtitle: "Land of Art & Culture",
      flag: "https://flagcdn.com/fr.svg",
      basicInfo: {
        capital: "Paris",
        language: "French",
        population: "67.4 Million",
        currency: {
          name: "Euro (EUR)",
          symbol: "€",
          rate: "1 USD ≈ €0.92"
        },
        timeZone: "GMT+1",
        drivingSide: "Right",
        callingCode: "+33"
      }
    },
    sections: [
      {
        id: 'discover',
        icon: '🗼',
        title: 'Discover',
        content: {
          travelGuide: {
            seasons: {
              spring: {
                months: "March to May",
                temp: "8°C to 19°C",
                description: "Perfect weather, blooming gardens",
                highlights: ["Cherry blossoms in Paris", "Loire Valley castles", "Wine tours"]
              },
              summer: {
                months: "June to August",
                temp: "15°C to 25°C",
                description: "Peak tourist season, festivals",
                highlights: ["Lavender fields", "Beach resorts", "Bastille Day"]
              },
              autumn: {
                months: "September to November",
                temp: "11°C to 21°C",
                description: "Wine harvest, fewer tourists",
                highlights: ["Wine festivals", "Fall colors", "Truffle hunting"]
              },
              winter: {
                months: "December to February",
                temp: "3°C to 8°C",
                description: "Christmas markets, skiing",
                highlights: ["Alpine skiing", "Christmas markets", "New Year celebrations"]
              }
            },
            budget: {
              backpacker: {
                daily: "€50-70",
                accommodation: "Hostels & Budget hotels",
                food: "Bakeries & Markets",
                transport: "Public transit"
              },
              midRange: {
                daily: "€150-250",
                accommodation: "3-star hotels & B&Bs",
                food: "Bistros & Cafes",
                transport: "Trains & Taxis"
              },
              luxury: {
                daily: "€400+",
                accommodation: "Luxury hotels & Châteaux",
                food: "Michelin-starred restaurants",
                transport: "First-class rail & Private cars"
              }
            },
            transport: {
              types: [
                {
                  mode: "TGV (High-speed rail)",
                  cost: "€30-200",
                  description: "Fast connections between cities",
                  tips: ["Book in advance", "Get a rail pass", "Check for strikes"]
                },
                {
                  mode: "Metro",
                  cost: "€1.90 per ticket",
                  description: "Excellent urban networks",
                  tips: ["Buy carnet tickets", "Download city apps", "Watch for pickpockets"]
                },
                {
                  mode: "Bus",
                  cost: "¥220-1000 per ride",
                  description: "Covers areas without train access",
                  tips: ["Have exact change", "Check bus schedules", "Signal to stop"]
                }
              ]
            },
            visa: {
              eVisa: {
                process: "Online application",
                duration: "30-60 days",
                cost: "$25-80",
                requirements: ["Valid passport", "Digital photo", "Return ticket"]
              }
            },
            health: {
              vaccinations: [
                "Hepatitis A & B",
                "Typhoid",
                "COVID-19",
                "Tetanus"
              ],
              tips: [
                "Drink bottled water only",
                "Eat at hygienic establishments",
                "Carry basic medicines",
                "Have travel insurance"
              ],
              emergencyContacts: {
                police: "110",
                ambulance: "119",
                tourist_police: "03-3503-8484"
              }
            },
            cuisine: {
              mustTry: [
                { dish: "Croissant", region: "Paris", type: "Veg" },
                { dish: "Coq au Vin", region: "Burgundy", type: "Non-Veg" },
                { dish: "Ratatouille", region: "Provence", type: "Veg" },
                { dish: "Cassoulet", region: "Toulouse", type: "Non-Veg" }
              ],
              diningTips: [
                "Lunch is typically 12-2pm",
                "Dinner starts after 7:30pm",
                "Service is included in bills",
                "Reservations recommended for dinner"
              ]
            },
            culture: {
              customs: [
                "Greet with 'Bonjour'",
                "Two cheek kisses as greeting",
                "Learn basic French phrases",
                "Dress smartly in cities"
              ],
              festivals: [
                { name: "Bastille Day", month: "July", type: "National Holiday" },
                { name: "Cannes Film Festival", month: "May", type: "Cultural Event" },
                { name: "Tour de France", month: "July", type: "Sporting Event" }
              ]
            },
            weather: {
              regions: [
                {
                  name: "Northern France",
                  climate: "Cool winters, mild summers",
                  bestTime: "May to September"
                },
                {
                  name: "Southern France",
                  climate: "Mediterranean climate",
                  bestTime: "April to October"
                },
                {
                  name: "French Alps",
                  climate: "Cold winters, cool summers",
                  bestTime: "December to March (skiing), June to September (hiking)"
                }
              ]
            },
            shopping: {
              items: [
                "Fashion & Luxury goods",
                "Fine wines & Champagne",
                "Gourmet foods",
                "French cosmetics"
              ],
              markets: [
                { name: "Marché aux Puces", location: "Paris", specialty: "Antiques" },
                { name: "Les Halles", location: "Lyon", specialty: "Food" },
                { name: "Cours Saleya", location: "Nice", specialty: "Flowers & Food" }
              ],
              tips: [
                "Most shops closed on Sundays",
                "Tax refund available for purchases over €100",
                "Haggling not common except at flea markets",
                "Sales periods (soldes) in January and July"
              ]
            }
          },
          highlights: [
            {
              image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
              title: "Art & Architecture",
              description: "World-renowned museums and monuments"
            },
            {
              image: "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?q=80&w=2787&auto=format&fit=crop", // New Culinary Excellence image
              title: "Culinary Excellence",
              description: "Birthplace of haute cuisine"
            },
            {
              image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b",
              title: "Wine Culture",
              description: "Famous wine regions and tastings"
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
            name: "Eiffel Tower",
            location: "Paris",
            image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop", // Updated more reliable Eiffel Tower image
            description: "Iconic symbol of France",
            tags: ["Landmark", "Architecture", "Views"]
          },
          {
            name: "Palace of Versailles",
            location: "Versailles",
            image: "https://images.unsplash.com/photo-1526816229784-65d5d54ac8bc",
            description: "Royal château and gardens",
            tags: ["History", "Architecture", "Gardens"]
          },
          {
            name: "Mont Saint-Michel",
            location: "Normandy",
            image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
            description: "Medieval abbey on a tidal island",
            tags: ["UNESCO", "History", "Architecture"]
          }
        ]
      },
      {
        id: 'experience',
        icon: '✨',
        title: 'Experiences',
        activities: [
          {
            title: "Cultural",
            items: ["Wine tasting", "Cooking classes", "Art museums"]
          },
          {
            title: "Outdoor",
            items: ["Alpine skiing", "Loire Valley cycling", "Mediterranean beaches"]
          },
          {
            title: "Culinary",
            items: ["Food markets", "Cheese tours", "Michelin dining"]
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
            {Object.entries(franceData.sections[0].content.travelGuide.seasons).map(([season, info]) => (
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
            {Object.entries(franceData.sections[0].content.travelGuide.budget).map(([level, details]) => (
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
            {franceData.sections[0].content.travelGuide.transport.types.map((type, index) => (
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
                <p className="text-gray-700">{franceData.sections[0].content.travelGuide.visa.eVisa.process}</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Duration:</span>
                  {franceData.sections[0].content.travelGuide.visa.eVisa.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Cost:</span>
                  {franceData.sections[0].content.travelGuide.visa.eVisa.cost}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Requirements</h4>
              <ul className="space-y-2">
                {franceData.sections[0].content.travelGuide.visa.eVisa.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Health Section */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Health & Safety</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Vaccinations</h4>
              <ul className="space-y-2">
                {franceData.sections[0].content.travelGuide.health.vaccinations.map((vax, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">💉</span> {vax}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Health Tips</h4>
              <ul className="space-y-2">
                {franceData.sections[0].content.travelGuide.health.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">✓</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Emergency Contacts</h4>
              {Object.entries(franceData.sections[0].content.travelGuide.health.emergencyContacts).map(([service, number]) => (
                <div key={service} className="mb-2 text-gray-600">
                  <span className="capitalize">{service.replace('_', ' ')}: </span>
                  <span className="font-bold">{number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cuisine Section */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">French Cuisine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Must Try Dishes</h4>
              <div className="grid grid-cols-1 gap-4">
                {franceData.sections[0].content.travelGuide.cuisine.mustTry.map((dish, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <span className="font-bold text-orange-900">{dish.dish}</span>
                      <p className="text-sm text-gray-600">{dish.region}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {dish.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Dining Tips</h4>
              <ul className="space-y-3">
                {franceData.sections[0].content.travelGuide.cuisine.diningTips.map((tip, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">🍽️</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Cultural Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Customs & Etiquette</h4>
              <ul className="space-y-3">
                {franceData.sections[0].content.travelGuide.culture.customs.map((custom, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">🙏</span> {custom}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Major Festivals</h4>
              {franceData.sections[0].content.travelGuide.culture.festivals.map((festival, idx) => (
                <div key={idx} className="mb-4 p-4 bg-orange-50 rounded-lg">
                  <h5 className="font-bold text-orange-900">{festival.name}</h5>
                  <p className="text-sm text-gray-600">{festival.month} - {festival.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shopping Section */}
        <div>
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Shopping Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">What to Buy</h4>
              <ul className="space-y-2">
                {franceData.sections[0].content.travelGuide.shopping.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">🛍️</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Famous Markets</h4>
              {franceData.sections[0].content.travelGuide.shopping.markets.map((market, idx) => (
                <div key={idx} className="mb-3 p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-bold text-orange-900">{market.name}</h5>
                  <p className="text-sm text-gray-600">{market.location} - {market.specialty}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Shopping Tips</h4>
              <ul className="space-y-2">
                {franceData.sections[0].content.travelGuide.shopping.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">💡</span> {tip}
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
          {franceData.sections[0].content.highlights.map((item, index) => (
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
            src={franceData.intro.image}
            alt="France"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">{franceData.intro.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 sm:mb-12">{franceData.intro.subtitle}</p>
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full max-w-full overflow-x-auto">
            {franceData.sections.map((section) => (
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

      {/* Basic Country Info Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Flag and Currency Column */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <img 
                src={franceData.intro.flag}
                alt="Flag"
                className="w-48 sm:w-64 h-auto shadow-lg rounded-lg animate-flag-wave"
              />
              <div className="mt-6 sm:mt-8 text-center">
                <span className="text-4xl sm:text-6xl font-bold text-orange-900 mb-2 block">€</span>
                <span className="text-lg sm:text-xl text-gray-600">1 USD ≈ €0.92</span>
              </div>
            </div>

            {/* Country Info Grid */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(franceData.intro.basicInfo).map(([key, value]) => (
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

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          {activeSection === 'discover' && renderDiscoverSection()}
          {activeSection === 'explore' && (
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 sm:space-y-16"
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-16">
                  {franceData.sections[1].places.map((place, index) => (
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {franceData.sections.find(s => s.id === 'experience').activities.map((activity, index) => (
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
    </div>
  );
}

export default France;