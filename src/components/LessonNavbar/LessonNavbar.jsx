import React from "react";
import "../../App.css";
import { Link, useLocation } from "react-router";

function LessonNavbar({ isVideoCompleted, isQuizCompleted }) {
  const location = useLocation();

  const baseTab = "w-full text-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
  const activeTab = "bg-[#F7F5F2] border border-[#0EB689]/30 text-[#0EB689] font-bold shadow-sm";
  const inactiveTab = "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-[#F7F5F2]/50";
  const disabledTab = "opacity-30 pointer-events-none cursor-not-allowed";

  return (
    <nav className="py-3">
      <div className="bg-white border border-gray-100/80 shadow-sm rounded-2xl px-2 py-2">
        <ul className="flex justify-between gap-1 text-sm">
          <Link
            to="video"
            className={`${baseTab} ${location.pathname.includes("video") ? activeTab : inactiveTab}`}
          >
            Video
          </Link>
          <Link
            to="quiz"
            className={`${baseTab} ${location.pathname.includes("quiz") ? activeTab : inactiveTab} ${!isVideoCompleted ? disabledTab : ""}`}
          >
            Quiz
          </Link>
          <Link
            to="summary"
            className={`${baseTab} ${location.pathname.includes("summary") ? activeTab : inactiveTab} ${!isQuizCompleted ? disabledTab : ""}`}
          >
            Fazit
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default LessonNavbar;

