import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f7f8fa] border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Buyonic</h2>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Discover products you’ll love with fast delivery and easy returns.
            </p>

            <div className="mt-6 flex items-center gap-4 text-gray-700">
              <FaInstagram className="text-xl hover:text-black cursor-pointer" />
              <FaFacebookF className="text-xl hover:text-black cursor-pointer" />
              <FaTwitter className="text-xl hover:text-black cursor-pointer" />
              <FaYoutube className="text-xl hover:text-black cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Men</li>
              <li className="hover:text-black cursor-pointer">Women</li>
              <li className="hover:text-black cursor-pointer">Electronics</li>
              <li className="hover:text-black cursor-pointer">Accessories</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Contact Us</li>
              <li className="hover:text-black cursor-pointer">FAQ</li>
              <li className="hover:text-black cursor-pointer">
                Shipping & Returns
              </li>
              <li className="hover:text-black cursor-pointer">Track Order</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe for offers and updates.
            </p>

            <div className="flex items-center bg-white rounded-lg border overflow-hidden">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 text-sm outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} Buyonic. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <p className="hover:text-black cursor-pointer">Privacy Policy</p>
            <p className="hover:text-black cursor-pointer">Terms</p>
            <p className="hover:text-black cursor-pointer">Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
