import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          
          {/* Logo */}
          <div className="text-white text-2xl font-bold cursor-pointer hover:text-indigo-400 transition-colors duration-300">
            Resume
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white">Home</span>
              <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">Home</a>
              <a href="#support" className="hover:text-indigo-400 transition-colors duration-300">Support</a>
              <a href="#product" className="hover:text-indigo-400 transition-colors duration-300">Product</a>
              <a href="#affiliate" className="hover:text-indigo-400 transition-colors duration-300">Affiliate</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white">Resources</span>
              <a href="#resources" className="hover:text-indigo-400 transition-colors duration-300">Resources</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white">Legal</span>
              <a href="#privacy" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-indigo-400 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-400 text-white transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-400 text-white transition-colors duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-400 text-white transition-colors duration-300">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-400 text-white transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Resume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
