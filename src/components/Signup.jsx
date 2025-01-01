import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ setUsername }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    location: '',
    bio: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (formData.username && formData.password && formData.email) {
      setShowPopup(true);
      setUsername(formData.username);
      
      // Increase timeout to ensure popup is visible
      setTimeout(() => {
        setShowPopup(false);
        // Add small delay before navigation
        setTimeout(() => {
          navigate('/');
        }, 100);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white px-16 py-14 rounded-xl text-center shadow-2xl transform transition-all duration-300 ease-in-out scale-100 border-l-4 border-orange-900">
            <div className="text-orange-900 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-orange-900 mb-2">Success!</h1>
            <p className="text-gray-600">Your account has been created successfully</p>
          </div>
        </div>
      )}
      <h2 className="text-3xl font-bold text-orange-900 mb-8">Create Your Account</h2>
      <div className="flex flex-col md:flex-row w-11/12 max-w-7xl gap-8">
        <form onSubmit={handleSubmit} className="w-full md:w-2/5 bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {['username', 'password', 'email', 'location'].map(field => (
              <div key={field} className="form-group">
                <label 
                  htmlFor={field}
                  className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                >
                  {field}
                </label>
                <input
                  id={field}
                  type={field === 'password' ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            ))}
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-900 text-white py-3 px-6 rounded-lg hover:bg-orange-800 transform hover:scale-105 transition duration-200"
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div className="w-full md:w-3/5 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112486726!2d144.9630579153167!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1e5d1b1a1e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633078471234!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;