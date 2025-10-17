import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Detect from './pages/Detect';
import Result from './pages/Result';
import Footer from './component/Footer';

const App = () => {  
  return (
    

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-b from-teal-50 to-blue-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
