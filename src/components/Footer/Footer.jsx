import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="w-full px-6 pb-6">
      <div className="w-full mx-auto max-w-screen-xl p-6 md:flex md:items-center md:justify-between bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 Buddy.Fi – Alle Rechte vorbehalten.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/datenschutz" className="hover:underline me-4 md:me-6">
              Datenschutz
            </Link>
          </li>
          <li>
            <Link to="/impressum" className="hover:underline">
              Impressum
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
