import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in and retrieve user data
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user !== null;
  const isAdmin = isLoggedIn && user.role === "admin"; // Assuming `role` determines if the user is an admin

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to landing page
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Community Portal
        </Link>
        <div className="flex space-x-4">
          <div className="flex justify-center space-x-4">
            <a href="/" className="text-white text-[16px] hover:text-yellow-300">
              Home
            </a>
            <div className="relative inline-block my-auto text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center text-[16px] w-full px-4 text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  Complaints
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  isOpen ? "" : "hidden"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                onMouseLeave={closeDropdown}
              >
                <div className="py-1">
                  {/* Show Update Complaint for Admin */}
                  {isAdmin && (
                    <Link
                      to="/update"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Update a Complaint
                    </Link>
                  )}
                  {/* Show File a Complaint for non-Admin */}
                  {!isAdmin && (
                    <Link
                      to={isLoggedIn ? "/complaint" : "/login"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      File a Complaint
                    </Link>
                  )}
                  {!isAdmin && (
                  <Link
                    to={isLoggedIn ? "/upvote" : "/login"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Upvote a Complaint
                  </Link>
                  )}
                  {!isAdmin && (
                    <Link
                      to={isLoggedIn ? "/mycomplaints" : "/login"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      My Complaints
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Conditionally render Login or Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white text-[16px] hover:text-yellow-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white text-[16px] hover:text-yellow-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
