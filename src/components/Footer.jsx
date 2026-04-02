// FooterUI.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="backdrop-brightness-50 blur-xsg-amber-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          
          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-bold hover:text-gray-200">
              MicroTasker
            </h2>
            <p className="mt-2 text-gray-200">
              Complete tasks. Earn coins. Grow your skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a className="hover:text-gray-200">Home</a></li>
              <li><a className="hover:text-gray-200">Dashboard</a></li>
              <li><a className="hover:text-gray-200">Tasks</a></li>
              <li><a className="hover:text-gray-200">Profile</a></li>
              <li><a className="hover:text-gray-200">Support</a></li>
            </ul>
          </div>

          {/* Social / Developer */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://github.com/your-client-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200"
                >
                  Join as Developer
                </a>
              </li>
              <li><a className="hover:text-gray-200">Twitter</a></li>
              <li><a className="hover:text-gray-200">Facebook</a></li>
              <li><a className="hover:text-gray-200">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-blue-500 pt-4 text-center text-gray-200 text-sm">
          &copy; {new Date().getFullYear()} MicroTasker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;