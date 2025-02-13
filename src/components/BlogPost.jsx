import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

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