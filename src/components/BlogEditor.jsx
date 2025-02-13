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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {id ? 'Edit Story' : 'Create New Story'}
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {publishError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{publishError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image Upload */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-gray-700">Cover Photo</label>
              <div className="relative group">
                {blog.imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden h-[400px]">
                    <img 
                      src={blog.imageUrl}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setBlog(prev => ({ ...prev, imageUrl: '', images: [] }))}
                      className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="mt-2 text-gray-500">Add Cover Photo</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <input
                type="text"
                value={blog.title}
                onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Your Story Title"
                className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300"
                required
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Destination</label>
                <input
                  type="text"
                  value={blog.destination}
                  onChange={(e) => setBlog(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Travel Date</label>
                <input
                  type="date"
                  value={blog.date}
                  onChange={(e) => setBlog(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Story Content */}
            <div>
              <textarea
                value={blog.content}
                onChange={(e) => setBlog(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tell your story..."
                className="w-full min-h-[400px] p-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPublishing}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 flex items-center gap-2"
              >
                {isPublishing ? 'Publishing...' : 'Publish Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;