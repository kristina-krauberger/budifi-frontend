import React from "react";
import "../../App.css";
import { Link } from "react-router";


function LessonNavbar() {
  return (
    <nav className="main-content">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-3">
        <ul className="flex justify-between gap-2 text-sm">
          <Link to="video" className="w-full text-center px-3 py-2 border border-gray-200 bg-white rounded-md text-gray-700;">Video</Link>
          <Link to="quiz" className="w-full text-center px-3 py-2 border border-gray-200 bg-white rounded-md text-gray-700;">Quiz</Link>
          <Link to="summary" className="w-full text-center px-3 py-2 border border-gray-200 bg-white rounded-md text-gray-700;">Summary</Link>
        </ul>
      </div>
    </nav>
  );
}

export default LessonNavbar;
