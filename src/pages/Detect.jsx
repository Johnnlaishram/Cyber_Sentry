import React, { useState } from 'react';

const Detect = () => {
  const [url, setUrl] = useState('');

  const handleDetect = () => {
    // For now just log the URL, you can later connect your backend
    console.log('Detecting URL:', url);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-24 min-h-[70vh] px-4 sm:px-10 md:px-14 lg:px-28">
      <h1 className="text-3xl font-bold mb-6 text-center">Phishing URL Detector</h1>
      
      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter URL to check"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDetect}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-semibold"
        >
          Detect
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-center">
        Enter the URL you want to check for phishing.  
      </p>
    </div>
  );
};

export default Detect;
