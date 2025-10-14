import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets"; // make sure assets/logop.png, home.png, application.png, circle.png exist

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Link to="/">
            <img
              src={assets.logop}
              alt="Phishing Detector Logo"
              className="w-12 sm:w-24 md:w-36"
            />
          </Link>
        </div>

        {/* Right: Nav Links + Button */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-blue-400 transition flex items-center space-x-2">
              <img className="w-6" src={assets.home} alt="Home" />
              <span>Home</span>
            </Link>
            <Link to="/contact" className="hover:text-blue-400 transition flex items-center space-x-2">
              <img className="w-6" src={assets.circle} alt="Contact" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
