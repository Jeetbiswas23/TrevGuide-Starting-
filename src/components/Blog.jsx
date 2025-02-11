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
      image: "https://images.unsplash.com/photo-1478436127897-769e1538f3fb?q=80&w=2070&auto=format&fit=crop",
      author: "Sarah Parker",
      date: "2024-01-15",
      readTime: "8 min read",
      content: "Discover the spiritual heart of Japan through its centuries-old temples...",
      likes: 1234,
      views: 5678
    },
    // Add more featured posts as needed
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-black">
        <img 
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2070&auto=format&fit=crop"
          alt="Travel Blog Hero"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Explore Travel Stories</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Discover amazing destinations through the eyes of fellow travelers
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-4 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-orange-200"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPosts.map(post => (
            <div key={post.id} className="group relative overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-[16/9]">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="inline-block px-4 py-1 bg-orange-500 text-white rounded-full text-sm mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
                  <div className="flex items-center text-gray-300 text-sm">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Latest Posts Grid */}
        <h2 className="text-3xl font-bold mb-8">Latest Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
              transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[16/9] overflow-hidden">
                {blog.images && blog.images[0] ? (
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {blog.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-orange-600 
                  transition-colors">{blog.title}</h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 
                      rounded-full flex items-center justify-center text-white">
                      {blog.author[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {blog.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {blog.views || 0}
                    </span>
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
    </div>
  );
}

export default Blog;