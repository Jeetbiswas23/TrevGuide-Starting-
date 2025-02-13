import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState('base'); // sm, base, lg, xl
  const [theme, setTheme] = useState('light'); // light, sepia, dark
  const [showControls, setShowControls] = useState(false);
  const articleRef = useRef(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
    const foundBlog = blogs.find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.clientHeight - window.innerHeight;
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (windowScrollTop === 0) {
          setReadingProgress(0);
        }
        if (totalHeight) {
          setReadingProgress(Math.min(100, Math.round((windowScrollTop / totalHeight) * 100)));
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'sepia': return 'bg-[#f4ecd8] text-gray-900';
      case 'dark': return 'bg-gray-900 text-gray-100';
      default: return 'bg-white text-gray-900';
    }
  };

  if (!blog) {
    return <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className={`min-h-screen ${getThemeClass()} transition-colors duration-300`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-orange-500 transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        {blog.images && blog.images[0] ? (
          <img
            src={blog.images[0]}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <p className="text-xl text-orange-200">{blog.destination}</p>
          </div>
        </div>
      </div>

      {/* Reading Controls */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>

        {showControls && (
          <div className="absolute right-0 mt-2 p-4 bg-white rounded-xl shadow-xl space-y-4 min-w-[200px]">
            {/* Font Size Controls */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Font Size</p>
              <div className="flex gap-2">
                {['sm', 'base', 'lg', 'xl'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`p-2 rounded ${
                      fontSize === size ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Controls */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Theme</p>
              <div className="flex gap-2">
                {[
                  { name: 'light', icon: '☀️' },
                  { name: 'sepia', icon: '📜' },
                  { name: 'dark', icon: '🌙' }
                ].map(({ name, icon }) => (
                  <button
                    key={name}
                    onClick={() => setTheme(name)}
                    className={`p-2 rounded ${
                      theme === name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12" ref={articleRef}>
        {/* Article Meta */}
        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 
              flex items-center justify-center text-white text-xl font-bold">
              {blog.author[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {calculateReadingTime(blog.content)} min read
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/edit-blog/${blog.id}`)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Edit Story
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 space-y-4 hidden md:block">
          {['twitter', 'facebook', 'linkedin', 'copy'].map((platform) => (
            <button
              key={platform}
              className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
              onClick={() => {
                // Implement sharing logic here
                if (platform === 'copy') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              {platform === 'copy' ? '📋' : platform[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <article className={`prose prose-lg max-w-none ${getFontSizeClass()}`}>
          <p className="whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </p>
        </article>

        {/* Add this new section for additional media */}
        <div className="mt-12">
          {/* Additional Photos */}
          {blog.photos && blog.photos.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="relative group rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setShowPhotoModal(true);
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Travel photo ${index + 1}`}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Modal */}
          {showPhotoModal && selectedPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={() => setShowPhotoModal(false)}
            >
              <div className="relative max-w-7xl mx-auto">
                <img
                  src={selectedPhoto}
                  alt="Full size"
                  className="max-h-[90vh] max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setShowPhotoModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Videos */}
          {blog.videos && blog.videos.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blog.videos.map((video, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                    <video
                      src={video}
                      controls
                      className="w-full h-auto"
                      poster={blog.images?.[0]} // Use cover image as video poster
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-orange-50 text-orange-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;