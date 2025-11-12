import React, { useEffect, useState } from "react";
import {
  FaShopify,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useCart } from "../stores/cartStore";
import { placeholders, routes } from "../data";
import { FaSpinner } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const cartItems = useCart((s) => s.items) || [];
  const cartCount = cartItems.length;

  const setIsUserLogin = useCart((s) => s.setIsUserLogin);
  const isUserLogin = useCart((s) => s.isUserLogin);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [name, setName] = useState("");

  const [showLogoutProcess, setProcess] = useState(false);

  function handleInput(e) {
    setSearchInput(e.target.value);
  }

  function handleSearch() {
    const query = searchInput.toLowerCase().trim();

    setTimeout(() => {
      const matchedRoute =
        Object.keys(routes).find((key) => query.includes(key)) ||
        "/item-not-found";

      navigate(routes[matchedRoute] || "/item-not-found");
    }, 800);
  }

  // Logout handler
  function handleLogout() {
    try {
      const authData = JSON.parse(localStorage.getItem("auth_demo_v1")) || {};
      authData.isLogin = false;
      localStorage.setItem("auth_demo_v1", JSON.stringify(authData));

      setProcess(true);
      console.log("Logput started");

      setTimeout(() => {
        setProcess(false);
        console.log("Logout compelted");

        setIsUserLogin(false);
        setIsLogin(false);
        setShowLogout(false);
      }, 2000);

      // ✅ Update both states immediately for instant UI update
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // initialize login state  on mount or store change
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth_demo_v1"));
    if (authData?.isLogin) {
      setIsLogin(true);
      setIsUserLogin(true);
      setName(authData.name);
    } else {
      setIsLogin(false);
      setIsUserLogin(false);
    }
  }, [isUserLogin]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 py-4">
          {/* Left: Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
            role="button"
            aria-label="Go to home"
          >
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-2.5 rounded-lg shadow-md">
              <FaShopify className="text-white text-2xl" />
            </div>
            <span className="text-gray-900 text-lg sm:text-2xl font-bold tracking-tight">
              Buyonic
            </span>
          </div>

          {/* Search Input*/}
          <div className="flex-1 mx-4 hidden sm:block">
            <div className="max-w-2xl mx-auto">
              <PlaceholdersAndVanishInput
                onChange={handleInput}
                onSubmit={handleSearch}
                placeholders={placeholders}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            <nav className="hidden md:flex items-center gap-3 text-sm text-slate-700">
              <button
                onClick={() => navigate("/")}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Shop
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cart
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Contact
              </button>
            </nav>

            <button
              onClick={() => navigate("/wishlist")}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition rounded-lg"
              aria-label="Wishlist"
            >
              <FaHeart />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-gray-50 border border-gray-200 p-2.5 rounded-xl hover:bg-white transition"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-gray-700 text-lg" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 font-semibold">
                {isUserLogin ? cartCount : 0}
              </span>
            </button>

            {/* Sign In / User Dropdown */}
            {isLogin ? (
              <div className="relative inline-block">
                <button
                  onClick={() => setShowLogout((prev) => !prev)}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 
             bg-white border border-gray-200 text-slate-700 
             hover:bg-gray-50 hover:shadow-sm 
             rounded-xl transition-all duration-200"
                >
                  <FaUser className="text-slate-600 text-[15px]" />
                  <span className="text-sm font-medium">{name}</span>
                </button>

                {showLogout && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-400
             rounded-xl shadow-md transition-all duration-200"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-sm text-slate-700 font-medium py-2.5 
               hover:bg-gray-50 rounded-xl transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/sign-in")}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-sm transition"
              >
                <FaUser />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}

            {/* Mobile View Responsive */}
            <button
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input*/}
        <div className="sm:hidden pb-3">
          <PlaceholdersAndVanishInput
            onChange={(e) => setSearchInput(e.target.value)}
            placeholders={placeholders}
          />
        </div>
      </div>

      {/* This just simulates the logout process to make it feel more realistic */}
      <div
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-200 ${
          showLogoutProcess
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-slate-800/95 px-4 py-2 shadow-md ring-1 ring-slate-200 dark:ring-slate-700">
          {/* Spinner using react-icons */}
          <FaSpinner className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />

          <div className="text-sm">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              Logging out…
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-300">
              Please wait a moment
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
