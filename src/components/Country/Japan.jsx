import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Japan() {
  const [activeSection, setActiveSection] = useState('discover');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const japanData = {
    intro: {
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
      title: "Discover Japan",
      subtitle: "Where Tradition Meets Innovation",
      flag: "https://flagcdn.com/jp.svg",
      basicInfo: {
        capital: "Tokyo",
        language: "Japanese",
        population: "125.7 Million",
        currency: {
          name: "Japanese Yen (JPY)",
          symbol: "¥",
          rate: "1 USD ≈ ¥150"
        },
        timeZone: "GMT+9",
        drivingSide: "Left",
        callingCode: "+81"
      }
    },
    sections: [
      {
        id: 'discover',
        icon: '🌸',
        title: 'Discover',
        content: {
          travelGuide: {
            seasons: {
              spring: {
                months: "March to May",
                temp: "10°C to 20°C",
                description: "Cherry blossom season, perfect weather",
                highlights: ["Hanami festivals", "Cherry blossoms", "Garden visits"]
              },
              summer: {
                months: "June to August",
                temp: "20°C to 30°C",
                description: "Hot and humid, festival season",
                highlights: ["Summer festivals", "Fireworks", "Mountain hiking"]
              },
              autumn: {
                months: "September to November",
                temp: "15°C to 25°C",
                description: "Pleasant weather, fall colors",
                highlights: ["Fall foliage", "Cultural events", "Harvest season"]
              },
              winter: {
                months: "December to February",
                temp: "-5°C to 10°C",
                description: "Cold with occasional snow",
                highlights: ["Snow festivals", "Hot springs", "Skiing"]
              }
            },
            budget: {
              backpacker: {
                daily: "¥5000-8000",
                accommodation: "Hostels & Capsule hotels",
                food: "Convenience stores & Small restaurants",
                transport: "Local trains & Buses"
              },
              midRange: {
                daily: "¥15000-25000",
                accommodation: "Business hotels",
                food: "Regular restaurants",
                transport: "Limited Express trains"
              },
              luxury: {
                daily: "¥40000+",
                accommodation: "Luxury hotels & Ryokans",
                food: "Fine dining & Traditional kaiseki",
                transport: "First class rail & Taxis"
              }
            },
            transport: {
              types: [
                {
                  mode: "JR Rail",
                  cost: "¥14000-50000 (Rail Pass)",
                  description: "Extensive rail network with legendary punctuality",
                  tips: ["Get a JR Pass", "Reserve seats in advance", "Download train apps"]
                },
                {
                  mode: "Metro",
                  cost: "¥170-310 per ride",
                  description: "Efficient urban transportation",
                  tips: ["Get IC card", "Check last train times", "Follow station signs"]
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
                { dish: "Sushi", region: "Tokyo", type: "Non-Veg" },
                { dish: "Ramen", region: "Kyushu", type: "Non-Veg" },
                { dish: "Tempura", region: "Kanto", type: "Both" },
                { dish: "Okonomiyaki", region: "Osaka", type: "Veg" }
              ],
              diningTips: [
                "Try local izakayas for authentic experience",
                "Street food is popular but choose hygienic vendors",
                "Many restaurants are specialized in one type of dish",
                "Slurping noodles is considered polite"
              ]
            },
            culture: {
              customs: [
                "Remove shoes before entering homes",
                "Bow as a greeting",
                "Use both hands to give and receive items",
                "Do not tip in restaurants"
              ],
              festivals: [
                { name: "Cherry Blossom Festival", month: "March/April", type: "Seasonal Festival" },
                { name: "Gion Matsuri", month: "July", type: "Cultural Festival" },
                { name: "Obon", month: "August", type: "Religious Festival" }
              ]
            },
            weather: {
              regions: [
                {
                  name: "Hokkaido",
                  climate: "Cold winters, mild summers",
                  bestTime: "June to September"
                },
                {
                  name: "Honshu",
                  climate: "Varied, four distinct seasons",
                  bestTime: "March to May, September to November"
                },
                {
                  name: "Okinawa",
                  climate: "Subtropical, warm year-round",
                  bestTime: "March to May, October to December"
                }
              ]
            },
            shopping: {
              items: [
                "Electronics",
                "Fashion",
                "Traditional crafts",
                "Snacks"
              ],
              markets: [
                { name: "Tsukiji Outer Market", location: "Tokyo", specialty: "Seafood" },
                { name: "Nishiki Market", location: "Kyoto", specialty: "Food" },
                { name: "Dotonbori", location: "Osaka", specialty: "Street Food" }
              ],
              tips: [
                "Tax-free shopping available for tourists",
                "Quality is generally high",
                "Get receipts for large purchases",
                "Be mindful of store hours"
              ]
            }
          },
          highlights: [
            {
              image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
              title: "Ancient Culture",
              description: "Centuries of preserved traditions"
            },
            {
              image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
              title: "Modern Technology",
              description: "Leading edge of innovation"
            },
            {
              image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
              title: "Natural Beauty",
              description: "From mountains to islands"
            }
          ]
        }
      },
      {
        id: 'explore',
        icon: '🗼',
        title: 'Must Visit',
        places: [
          {
            name: "Mount Fuji",
            location: "Shizuoka Prefecture",
            image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65",
            description: "Japan's iconic sacred mountain",
            tags: ["UNESCO Site", "Nature", "Hiking"]
          },
          {
            name: "Kyoto",
            location: "Kansai Region",
            image: "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f",
            description: "The cultural heart of Japan",
            tags: ["Temples", "Culture", "History"]
          },
          {
            name: "Tokyo",
            location: "Kanto Region",
            image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
            description: "The bustling modern metropolis",
            tags: ["Modern", "City", "Technology"]
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
            items: ["Tea ceremony", "Kimono wearing", "Temple stays"]
          },
          {
            title: "Modern",
            items: ["Robot restaurants", "Anime districts", "Gaming centers"]
          },
          {
            title: "Natural",
            items: ["Hot springs", "Garden visits", "Mountain trails"]
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
            {Object.entries(japanData.sections[0].content.travelGuide.seasons).map(([season, info]) => (
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
            {Object.entries(japanData.sections[0].content.travelGuide.budget).map(([level, details]) => (
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
            {japanData.sections[0].content.travelGuide.transport.types.map((type, index) => (
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
                <p className="text-gray-700">{japanData.sections[0].content.travelGuide.visa.eVisa.process}</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Duration:</span>
                  {japanData.sections[0].content.travelGuide.visa.eVisa.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Cost:</span>
                  {japanData.sections[0].content.travelGuide.visa.eVisa.cost}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-900 mb-4">Requirements</h4>
              <ul className="space-y-2">
                {japanData.sections[0].content.travelGuide.visa.eVisa.requirements.map((req, idx) => (
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
                {japanData.sections[0].content.travelGuide.health.vaccinations.map((vax, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">💉</span> {vax}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Health Tips</h4>
              <ul className="space-y-2">
                {japanData.sections[0].content.travelGuide.health.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">✓</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Emergency Contacts</h4>
              {Object.entries(japanData.sections[0].content.travelGuide.health.emergencyContacts).map(([service, number]) => (
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
          <h3 className="text-3xl font-bold text-orange-900 text-center mb-8">Japanese Cuisine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Must Try Dishes</h4>
              <div className="grid grid-cols-1 gap-4">
                {japanData.sections[0].content.travelGuide.cuisine.mustTry.map((dish, idx) => (
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
                {japanData.sections[0].content.travelGuide.cuisine.diningTips.map((tip, idx) => (
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
                {japanData.sections[0].content.travelGuide.culture.customs.map((custom, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">🙏</span> {custom}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Major Festivals</h4>
              {japanData.sections[0].content.travelGuide.culture.festivals.map((festival, idx) => (
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
                {japanData.sections[0].content.travelGuide.shopping.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-orange-500 mr-2">🛍️</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Famous Markets</h4>
              {japanData.sections[0].content.travelGuide.shopping.markets.map((market, idx) => (
                <div key={idx} className="mb-3 p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-bold text-orange-900">{market.name}</h5>
                  <p className="text-sm text-gray-600">{market.location} - {market.specialty}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-orange-900 mb-4">Shopping Tips</h4>
              <ul className="space-y-2">
                {japanData.sections[0].content.travelGuide.shopping.tips.map((tip, idx) => (
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
          {japanData.sections[0].content.highlights.map((item, index) => (
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
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={japanData.intro.image}
            alt="Japan"
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
          <h1 className="text-8xl font-bold mb-6">{japanData.intro.title}</h1>
          <p className="text-3xl font-light mb-12">{japanData.intro.subtitle}</p>
          
          {/* Navigation Pills */}
          <div className="flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
            {japanData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                  activeSection === section.id 
                    ? 'bg-white text-orange-900' 
                    : 'hover:bg-white/10'
                }`}
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
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Basic Country Info Section - Updated */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Flag and Currency Column */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <img 
                src={japanData.intro.flag}
                alt="Flag of Japan"
                className="w-64 h-auto shadow-lg rounded-lg animate-flag-wave"
              />
              <div className="mt-8 text-center">
                <span className="text-6xl font-bold text-orange-900 mb-2 block">¥</span>
                <span className="text-xl text-gray-600">1 USD ≈ ¥150</span>
              </div>
            </div>

            {/* Country Info Grid */}
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-6">
              {Object.entries(japanData.intro.basicInfo).map(([key, value]) => (
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
        <div className="container mx-auto px-4 py-16">
          {activeSection === 'discover' && renderDiscoverSection()}
          {activeSection === 'explore' && (
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-20"
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-16">
                  {japanData.sections[1].places.map((place, index) => (
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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="py-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {japanData.sections.find(s => s.id === 'experience').activities.map((activity, index) => (
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

export default Japan;