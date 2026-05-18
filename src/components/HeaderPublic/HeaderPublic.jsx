import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

function HeaderPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl flex items-center justify-between mx-auto px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            className="h-10 w-10 rounded-full"
            alt="Buddy.Fi Logo"
          />
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Buddy.Fi
          </span>
        </Link>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            >
              Login
            </button>
          </Link>
          <Link to="/registrieren">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-white bg-[#0EB689] hover:bg-[#0c9d76] rounded-full transition cursor-pointer shadow-sm"
            >
              Registrieren
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-3 shadow-md">
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button
              type="button"
              className="w-full py-3 px-4 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
            >
              Login
            </button>
          </Link>
          <Link to="/registrieren" onClick={() => setIsMenuOpen(false)}>
            <button
              type="button"
              className="w-full py-3 px-4 text-sm font-medium text-white bg-[#0EB689] hover:bg-[#0c9d76] rounded-full transition cursor-pointer shadow-sm"
            >
              Registrieren
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default HeaderPublic;

