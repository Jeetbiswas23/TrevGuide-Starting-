import React from 'react';

function App() {
  return (
    <div className="bg-gray-50 text-orange-900 min-h-screen flex flex-col">
      <header className="bg-orange-900 text-white p-4">
        <h1 className="text-3xl">TrevGuide</h1>
      </header>
      <main className="flex-grow p-4 flex flex-col items-center">
        <h2 className="text-4xl mb-4">Welcome to TrevGuide</h2>
        <img 
          src="/public/luca-bravo-O453M2Liufs-unsplash.jpg"
          alt="Travel destination" 
          className="mb-4 w-1/2 h-auto rounded-lg shadow-lg" 
        />
        <p className="mb-5 text-center">Explore the best places to visit around the world.</p>
      </main>
      <footer className="bg-orange-900 text-white p-4 text-center">
        <p>&copy; 2024 Travel Guide. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;