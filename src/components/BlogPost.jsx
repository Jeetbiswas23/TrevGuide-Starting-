import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
    const foundBlog = blogs.find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  if (!blog) {
    return <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white">
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

      <div className="max-w-4xl mx-auto px-4 py-12">
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

        <article className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
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