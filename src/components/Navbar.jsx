// NavbarUI.jsx
import React from "react";

const NavbarUI = ({ isLoggedIn = false, username = "User", coins = 0 }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold hover:text-gray-200">
              MicroTasker
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <a className="hover:text-gray-200 font-medium">Login</a>
                <a className="hover:text-gray-200 font-medium">Register</a>
                <a className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                  Join as Developer
                </a>
              </>
            ) : (
              <>
                <a className="hover:text-gray-200 font-medium">Dashboard</a>
                <span className="bg-blue-500 px-3 py-1 rounded-md font-semibold">
                  Coins: {coins}
                </span>
                <div className="flex items-center space-x-4">
                  <a className="hover:text-gray-200 font-medium">{username}</a>
                  <button className="bg-red-500 px-3 py-1 rounded-md font-semibold hover:bg-red-600 transition">
                    Logout
                  </button>
                </div>
                <a className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                  Join as Developer
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (UI Only) */}
        <div className="md:hidden mt-2 space-y-2">
          {!isLoggedIn ? (
            <>
              <a className="block hover:text-gray-200 font-medium">Login</a>
              <a className="block hover:text-gray-200 font-medium">Register</a>
              <a className="block bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <a className="block hover:text-gray-200 font-medium">Dashboard</a>
              <span className="block bg-blue-500 px-3 py-1 rounded-md font-semibold">
                Coins: {coins}
              </span>
              <a className="block hover:text-gray-200 font-medium">{username}</a>
              <button className="block bg-red-500 px-3 py-1 rounded-md font-semibold hover:bg-red-600 transition">
                Logout
              </button>
              <a className="block bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                Join as Developer
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarUI;