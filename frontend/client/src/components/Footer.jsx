import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Bright Smile Dental Clinic
            </h3>
            <p>We provide the best care for your oral and dental health.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/dentists" className="hover:text-blue-300">
                  Our Dentists
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-blue-300">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/general" className="hover:text-blue-300">
                  General Dentistry
                </Link>
              </li>
              <li>
                <Link to="/services/cosmetic" className="hover:text-blue-300">
                  Cosmetic Dentistry
                </Link>
              </li>
              <li>
                <Link
                  to="/services/orthodontics"
                  className="hover:text-blue-300"
                >
                  Orthodontics
                </Link>
              </li>
              <li>
                <Link to="/services/pediatric" className="hover:text-blue-300">
                  Pediatric Dentistry
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Address: Dental Street, Medical City</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@smileclinic.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-300">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-300">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-4 text-center">
          <p>&copy; 2024 Bright Smile Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
