import React from "react";
import { Link } from "react-router";
import "./LessonCard.css";

function LessonCard({ to, title, duration, completed, isLast }) {
  return (
    <div className="flex items-stretch gap-6 w-full">
      {/* Left timeline column */}
      <div className="relative flex flex-col items-center">
        {/* Top Circle */}
        {!isLast && <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10"></div>}

        {/* If NOT last lesson → draw line */}
        {!isLast && <div className="flex-1 w-[2px] bg-gray-300 mt-1"></div>}

        {/* If last lesson → big bottom circle */}
        {isLast && (
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 bg-neutral-100 mt-1"></div>
        )}
      </div>

      {/* Card itself */}
      <Link
        to={to}
        className="block w-full max-w-sm mb-20 p-6 bg-neutral-100 border border-gray-300 rounded-lg shadow hover:bg-neutral-200"
      >
        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
          {title}
        </h5>
        <p className="text-body text-left">Dauer: {duration}</p>
        {completed && (
          <div className="mt-4 text-green-600 font-light text-left">
            ✓ Completed
          </div>
        )}
      </Link>
    </div>
  );
}

export default LessonCard;
