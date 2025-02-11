import React, { useState, useEffect } from 'react';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPosts] = useState([
    {
      id: 'featured1',
      title: "A Journey Through Japan's Ancient Temples",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1478436127897-769e1538f3fb",
      author: "Sarah Parker",
      date: "2024-01-15",
      readTime: "8 min read",
      content: "Discover the spiritual heart of Japan through its centuries-old temples...",
      likes: 1234,
      views: 5678
    },
    {
      id: 'featured2',
      title: "The Hidden Beaches of Thailand",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      author: "Mike Ross",
      date: "2024-01-10",
      readTime: "6 min read",
      content: "Exploring the pristine shores and secret coves of Thailand's islands...",
      likes: 892,
      views: 3456
    }
  ]);

  const [trendingTags] = useState([
    { name: '🌊 Beach Life', count: 156 },
    { name: '🏔️ Mountains', count: 234 },
    { name: '🍜 Local Food', count: 189 },
    { name: '🎭 Culture', count: 145 },
    { name: '🌆 City Life', count: 178 }
  ]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('userBlogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  const categories = ['All', 'Adventure', 'Culture', 'Food', 'Nature', 'City Life'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-orange-900 to-orange-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080')] 
            bg-cover bg-center opacity-30"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Travel Blog</h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            Discover stories, tips, and guides from travelers around the world
          </p>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="bg-orange-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <span className="text-orange-700 font-medium whitespace-nowrap">Trending:</span>
            {trendingTags.map((tag) => (
              <button key={tag.name} className="px-4 py-2 bg-white rounded-full text-sm text-orange-800 
                hover:bg-orange-100 transition-colors whitespace-nowrap">
                {tag.name} ({tag.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Blog Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="md:col-span-8">
            <h2 className="text-2xl font-bold mb-8">Latest Stories</h2>
            <div className="space-y-8">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                  transition-all duration-300">
                  <div className="md:flex">
                    {/* Blog Image */}
                    <div className="md:w-48 md:h-48 lg:w-64 lg:h-64 flex-shrink-0">
                      {blog.images && blog.images[0] ? (
                        <img
                          src={blog.images[0]}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 
                          flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                            {blog.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(blog.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.content}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                            {blog.author[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{blog.author}</p>
                            <p className="text-sm text-gray-500">{blog.destination}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                            {blog.views || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Stories Found</h3>
                <p className="text-gray-600">Be the first to share your travel experience!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-8">
            {/* Search */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Search Stories</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-orange-200 focus:border-orange-500 
                    focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-orange-100 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;