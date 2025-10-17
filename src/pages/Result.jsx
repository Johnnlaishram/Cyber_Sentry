import React from 'react';

const Contact = () => {
  // Replace these with the real details if/when you want
  const org = 'MIT Manipur';
  const phone = '+91 96123 45678';
  const email = 'contact@mitmanipur.edu.in';
  const addressLines = [
    'Manipur Institute of Technology (MIT)',
    'Takyelpat, Imphal, Manipur',
    'India'
  ];

  return (
    <div className="pt-24 min-h-[70vh] px-4 sm:px-10 md:px-14 lg:px-28 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact</h1>

        <p className="text-center text-gray-700 mb-6">
          For queries about the Phishing Detector project, contact
          <span className="font-semibold text-blue-600"> {org}</span>.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm uppercase text-gray-500">Address</h2>
            <address className="not-italic text-gray-700 mt-1">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          </div>

          <div>
            <h2 className="text-sm uppercase text-gray-500">Phone</h2>
            <p className="mt-1 text-lg font-medium text-blue-700">{phone}</p>
          </div>

          <div>
            <h2 className="text-sm uppercase text-gray-500">Email</h2>
            <p className="mt-1 text-lg font-medium text-blue-700">{email}</p>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-4">
            <p className="text-sm text-gray-600">
              Note: This page displays static contact details for the Phishing Detector project. No personal data is collected here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
