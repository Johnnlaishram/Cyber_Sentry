import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 min-h-[70vh] px-4 sm:px-10 md:px-14 lg:px-28 flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-200">
      
      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-800">
        Phishing URL Detector
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-center text-gray-700 mb-8 max-w-2xl">
        Protect yourself from phishing attacks by checking suspicious URLs instantly. 
        Our tool helps you identify unsafe websites before you interact with them.
      </p>

      {/* Try Detector Button */}
      <button
        onClick={() => navigate('/detect')}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-semibold text-lg"
      >
        Try Detector
      </button>

      {/* Illustration placeholder */}
      <div className="mt-12 w-full max-w-3xl h-64 bg-white/30 backdrop-blur-sm rounded-xl shadow-md flex items-center justify-center text-gray-400 text-xl">
        Illustration / Image goes here
      </div>
    </div>
  );
};

export default Home;
