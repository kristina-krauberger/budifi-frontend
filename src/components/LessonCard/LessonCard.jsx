import React from "react";
import { Link } from "react-router";
import "./LessonCard.css";

function LessonCard({ to, title, duration, isCompleted, isLastLesson }) {
  return (
    <div className="flex items-stretch ml-3 gap-6 w-full">
      {/* Timeline: circle + vertical line, last lesson shows only a final circle */}
      <div className="relative flex flex-col items-center">
        {!isLastLesson ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white z-10"></div>
            <div className="flex-1 w-[2px] bg-gray-300 mt-1"></div>
          </>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-400 bg-neutral-100 mt-0.5"></div>
        )}
      </div>

      {/* Lesson Card */}
      <Link
        to={to}
        className="block w-full max-w-sm mb-20 p-6 bg-neutral-100 border border-gray-300 rounded-lg shadow hover:bg-neutral-200"
      >
        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
          {title}
        </h5>
        <p className="text-body text-left italic">Dauer: {duration} Minuten</p>
        {isCompleted ? (
          <div className="mt-4 text-green-600 font-light text-left">
            ✓ Abgeschlossen
          </div>
        ) : (
          <div className="mt-4 text-gray-400 font-light text-left">
            Ausstehend
          </div>
        )}
      </Link>
    </div>
  );
}

export default LessonCard;
