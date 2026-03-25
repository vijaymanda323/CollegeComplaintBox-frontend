import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">CCB</div>
            <span className="ml-2 text-gray-700 hidden sm:block font-semibold">
              College Complaint Box
            </span>
          </Link>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {role === 'ADMIN' ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/complaints"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  All Complaints
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/complaints/create"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Create Complaint
                </Link>
                <Link
                  to="/complaints/my"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  My Complaints
                </Link>
              </>
            )}
          </div>

          {/* Right - User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{user}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{user}</p>
                  <p className="text-xs text-gray-500 capitalize">{role?.toLowerCase()}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {role === 'ADMIN' ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/complaints"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  All Complaints
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/complaints/create"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Create Complaint
                </Link>
                <Link
                  to="/complaints/my"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Complaints
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
