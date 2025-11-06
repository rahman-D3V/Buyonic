import React, { useState } from "react";
import SRCH from "../assets/SRCH.png";
import { FaShopify } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Router, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Main Navbar*/}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
              <FaShopify className="text-white text-2xl" />
            </div>
            <span className="text-gray-900 text-2xl font-bold tracking-tight">
              Buyonic
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-6 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-sm border border-gray-200 outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-600 hover:bg-slate-700 p-2.5 rounded-lg transition-all duration-300">
                <img
                  src={SRCH}
                  className="h-4 w-4 brightness-0 invert"
                  alt="Search"
                />
              </button>
            </div>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer group">
            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl hover:border-slate-400 hover:bg-white transition-all duration-300">
              <FaCartShopping className="text-gray-700 text-xl" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                {10}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center">
            {/* Left Side Navigation */}
            <div className="flex items-center gap-8 py-4">
              <div
                onClick={() => navigate("/")}
                className="group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-slate-700 font-medium text-sm">
                  Home
                </span>
              </div>

              <div className="group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-slate-700 font-medium text-sm">
                  Shop
                </span>
                <svg
                  className="w-3 h-3 text-gray-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180 duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <div className="group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-slate-700 font-medium text-sm">
                  Cart
                </span>
              </div>

              <div
                onClick={() => navigate("/contact")}
                className="group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-slate-700 font-medium text-sm">
                  Contact
                </span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-slate-700 cursor-pointer transition-colors duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Wishlist</span>
              </div>

              <div className="h-6 w-px bg-gray-200"></div>

              <div className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium">Sign In</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
