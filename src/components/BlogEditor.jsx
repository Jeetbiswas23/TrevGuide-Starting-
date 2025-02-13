import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [blog, setBlog] = useState({
    title: '',
    destination: '',
    date: '',
    content: '',
    images: [],
    imageUrl: '',
    tags: [],
    category: 'adventure'
  });

  const categories = [
    { id: 'adventure', label: 'Adventure', icon: '🏃‍♂️' },
    { id: 'culture', label: 'Culture', icon: '🏛️' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'city-life', label: 'City Life', icon: '🌆' }
  ];

  const availableTags = [
    'Backpacking', 'Luxury', 'Budget', 'Family', 'Solo Travel',
    'Photography', 'History', 'Art', 'Architecture', 'Local Experience'
  ];

  // Load existing blog if in edit mode
  useEffect(() => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
      const existingBlog = blogs.find(b => b.id === id);
      if (existingBlog) {
        setBlog({
          ...existingBlog,
          imageUrl: existingBlog.images?.[0] || '',
          date: new Date(existingBlog.date).toISOString().split('T')[0]
        });
      }
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBlog(prev => ({
        ...prev,
        imageUrl: reader.result,
        images: [reader.result]
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setPublishError('');

    try {
      const username = localStorage.getItem('username');
      const blogPost = {
        id: id || Date.now().toString(),
        ...blog,
        author: username || 'Anonymous',
        createdAt: id ? blog.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: blog.likes || 0,
        comments: blog.comments || []
      };

      // Get existing blogs
      const existingBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
      let updatedBlogs;

      if (id) {
        // Update existing blog
        updatedBlogs = existingBlogs.map(b => 
          b.id === id ? blogPost : b
        );
      } else {
        // Add new blog
        updatedBlogs = [blogPost, ...existingBlogs];
      }
      
      localStorage.setItem('userBlogs', JSON.stringify(updatedBlogs));
      navigate('/dashboard');
    } catch (error) {
      setPublishError(error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span>{id ? 'Edit Story' : 'Create New Story'}</span>
            <span className="text-orange-500">✍️</span>
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {publishError && (
          <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{publishError}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cover Image */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative group">
                  {blog.imageUrl ? (
                    <div className="relative h-[400px]">
                      <img 
                        src={blog.imageUrl}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setBlog(prev => ({ ...prev, imageUrl: '', images: [] }))}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-[400px] bg-gradient-to-br from-orange-50 to-orange-100 cursor-pointer group-hover:from-orange-100 group-hover:to-orange-200 transition-all">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-orange-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xl font-medium text-gray-700 mb-2">Add Cover Photo</p>
                        <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <input
                  type="text"
                  value={blog.title}
                  onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your Story Title"
                  className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300"
                  required
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <textarea
                  value={blog.content}
                  onChange={(e) => setBlog(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Tell your story..."
                  className="w-full min-h-[400px] text-lg border-none focus:outline-none focus:ring-0 placeholder-gray-300 resize-none"
                  required
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Publish Settings</h3>
                <div className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setBlog(prev => ({ ...prev, category: category.id }))}
                          className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                            blog.category === category.id
                              ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setBlog(prev => ({
                              ...prev,
                              tags: prev.tags.includes(tag)
                                ? prev.tags.filter(t => t !== tag)
                                : [...prev.tags, tag]
                            }))
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-all ${
                            blog.tags.includes(tag)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination & Date */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                      <input
                        type="text"
                        value={blog.destination}
                        onChange={(e) => setBlog(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                        placeholder="Where did you go?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                      <input
                        type="date"
                        value={blog.date}
                        onChange={(e) => setBlog(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPublishing}
                  className={`flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                    transition-all flex items-center justify-center gap-2 ${
                      isPublishing ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                  {isPublishing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Publishing</span>
                    </>
                  ) : (
                    <>
                      <span>Publish Story</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogEditor;