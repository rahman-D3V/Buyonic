import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-[#f7f8fa] border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Layout */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">Buyonic</h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              Shop smart, fast and easy with a clean, simple experience.
            </p>

            <div className="mt-4 flex items-center gap-4 text-gray-600">
              <FaInstagram className="text-lg hover:text-black cursor-pointer" />
              <FaFacebookF className="text-lg hover:text-black cursor-pointer" />
              <FaTwitter className="text-lg hover:text-black cursor-pointer" />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex gap-6 text-sm text-gray-600">
              <button
                onClick={() => navigate("/")}
                className="hover:text-black cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="hover:text-black cursor-pointer"
              >
                Cart
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-black cursor-pointer"
              >
                Contact
              </button>
              <button 
              onClick={() => navigate("/contact")} className="hover:text-black cursor-pointer">Help</button>
            </div>

            <p className="text-xs text-gray-500">
              © {year} Buyonic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
