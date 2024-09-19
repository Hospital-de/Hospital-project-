// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Hospital Management System</h1>
        <nav>
          <Link to="/" className="mr-6 hover:underline">
            Home
          </Link>
          <Link to="/profile" className="mr-6 hover:underline">
            Profile
          </Link>
          <Link to="/appointments" className="mr-6 hover:underline">
            Appointments
          </Link>
          <Link to="/billing" className="mr-6 hover:underline">
            Billing
          </Link>
          <Link to="/about" className="mr-6 hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
