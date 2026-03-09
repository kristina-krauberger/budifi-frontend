import React from "react";
import "../../App.css";
import { Link, useLocation } from "react-router";

function LessonNavbar({ isVideoCompleted, isQuizCompleted }) {
  const location = useLocation();
  console.log("NAVBAR LOCATION:", location.pathname);

  return (
    <nav className="py-3">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-3">
        <ul className="flex justify-between gap-2 text-sm">
          <Link
            to="video"
            className={`w-full text-center px-3 py-2 border-2 rounded-md bg-white text-gray-700 transition ${
              location.pathname.includes("video")
                ? "border-[#ACC8E5] text-[#1F2A44]"
                : "bg-gray-100 text-gray-500 border-gray-200 hover:border-[#ACC8E5] hover:text-[#1F2A44]"
            }`}
          >
            Video
          </Link>
          <Link
            to="quiz"
            className={`w-full text-center px-3 py-2 border-2 rounded-md bg-white text-gray-700 transition ${
              location.pathname.includes("quiz")
                ? "border-[#ACC8E5] text-[#1F2A44]"
                : "bg-gray-100 text-gray-500 border-gray-200 hover:border-[#ACC8E5] hover:text-[#1F2A44]"
            } ${!isVideoCompleted ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
          >
            Quiz
          </Link>
          <Link
            to="summary"
            className={`w-full text-center px-3 py-2 border-2 rounded-md bg-white text-gray-700 transition ${
              location.pathname.includes("summary")
                ? "border-[#ACC8E5] text-[#1F2A44]"
                : "bg-gray-100 text-gray-500 border-gray-200 hover:border-[#ACC8E5] hover:text-[#1F2A44]"
            } ${!isQuizCompleted ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
          >
            Fazit
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default LessonNavbar;
