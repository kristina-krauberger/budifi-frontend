import React from "react";
import "../../App.css";

function LessonFooter() {
  return (
    <nav className="main-content">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-3">
        <ul className="flex justify-between gap-2 text-sm">
          <li className="px-6 py-2 border border-gray-200 bg-white rounded-md text-gray-700">
            Zurück</li>
         
          <li className="px-6 py-2 border border-gray-200 bg-white rounded-md text-gray-700">
            Weiter
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LessonFooter;
