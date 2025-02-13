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
  const [showNotes, setShowNotes] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    const savedNotes = localStorage.getItem(`blog-notes-${id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [id]);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    
    const newNote = {
      id: Date.now(),
      text: note,
      date: new Date().toISOString(),
      blogId: blog.id,
      blogTitle: blog.title,
      destination: blog.destination
    };
    
    // Save to blog-specific notes
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`blog-notes-${id}`, JSON.stringify(updatedNotes));

    // Save to user's saved items
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const updatedSavedNotes = [...savedNotes, newNote];
    localStorage.setItem('savedNotes', JSON.stringify(updatedSavedNotes));
    
    setNote('');
  };

  const handleDeleteNote = (noteId) => {
    // Remove from blog-specific notes
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`blog-notes-${id}`, JSON.stringify(updatedNotes));
  
    // Remove from saved notes
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const updatedSavedNotes = savedNotes.filter(note => note.id !== noteId);
    localStorage.setItem('savedNotes', JSON.stringify(updatedSavedNotes));
  };

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
      {/* Reading Progress Bar - Make it smoother */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200/30 backdrop-blur-sm z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Enhanced Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        {blog.images && blog.images[0] ? (
          <div 
            className="absolute inset-0 scale-110 transform transition-transform duration-500"
            style={{
              backgroundImage: `url(${blog.images[0]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transform: `translateY(${readingProgress * 0.3}px)`
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{blog.title}</h1>
            <p className="text-xl md:text-2xl text-orange-200 font-light">{blog.destination}</p>
          </div>
        </div>
      </div>

      {/* Reading Controls - Enhanced Floating Panel */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl 
              hover:bg-white transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          {showControls && (
            <div className="absolute right-0 mt-2 p-6 bg-white/95 backdrop-blur-sm rounded-xl 
              shadow-xl space-y-6 min-w-[240px] animate-fadeIn">
              {/* Enhanced controls UI */}
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
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12" ref={articleRef}>
        {/* Enhanced Article Meta Section */}
        <div className="flex flex-wrap items-center justify-between mb-12 pb-6 border-b border-gray-200/80">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 
                flex items-center justify-center text-2xl font-bold text-white transform 
                group-hover:scale-110 transition-all duration-300">
                {blog.author[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full 
                border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-xl text-gray-900 mb-1">{blog.author}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>{new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
                •
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {calculateReadingTime(blog.content)} min read
                </span>
              </p>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => navigate(`/edit-blog/${blog.id}`)}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg 
                flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Story</span>
            </button>
          </div>
        </div>

        {/* Enhanced Share Options */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 space-y-4 hidden md:flex md:flex-col">
          {['twitter', 'facebook', 'linkedin', 'copy'].map((platform) => (
            <button
              key={platform}
              className="p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl 
                hover:bg-white transition-all duration-300 group transform hover:-translate-y-1"
              onClick={() => {
                if (platform === 'copy') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              {/* Enhanced share icons */}
              {platform === 'copy' ? '📋' : platform[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Content with Enhanced Typography */}
        <article className={`prose prose-lg max-w-none ${getFontSizeClass()} 
          prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 
          prose-strong:text-gray-900 prose-blockquote:border-orange-500 
          prose-blockquote:bg-orange-50 prose-blockquote:py-2 prose-blockquote:px-4 
          prose-blockquote:rounded-r-lg`}>
          <p className="whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </p>
        </article>

        {/* Add this new section for additional media */}
        <div className="mt-12">
          {/* Notes Section */}
          <div className="mt-8 mb-12">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>{showNotes ? 'Hide Notes' : 'Show Notes'}</span>
            </button>

            {showNotes && (
              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                  />
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Save Note
                  </button>
                </div>

                {notes.length > 0 && (
                  <div className="space-y-3">
                    {notes.map(note => (
                      <div key={note.id} className="p-4 bg-orange-50 rounded-lg relative group">
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 opacity-0 group-hover:opacity-100 
                            hover:bg-red-50 rounded-full transition-all duration-200"
                          title="Delete note"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <p className="text-gray-800">{note.text}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

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