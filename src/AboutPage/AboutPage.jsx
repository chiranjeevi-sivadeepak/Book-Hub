import React from 'react'
import Navbar from '../Navbar/Navbar'
function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-[100px] px-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About BookHub</h1>
        <p className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed">
          Welcome to <span className="font-semibold">BookHub</span> – your one-stop
          destination to discover, explore, and enjoy the best books.  
          <br />
          Our mission is to help you find your next favorite read. Whether you love
          fiction, non-fiction, or academic books, we’ve got personalized recommendations
          tailored just for you.
        </p>

        <div className="grid grid-rows-1 md:grid-rows-3 gap-8 mt-10">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">📚 Wide Collection</h2>
            <p className="text-gray-600">
              Access top-rated and trending books across multiple genres and categories.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">✨ Personalized</h2>
            <p className="text-gray-600">
              Get book suggestions based on your reading history and interests.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">🌍 Community</h2>
            <p className="text-gray-600">
              Join a passionate community of readers, share reviews, and discover hidden gems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage
