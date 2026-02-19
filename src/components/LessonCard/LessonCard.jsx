import React from "react";
import { Link } from "react-router";
import "./LessonCard.css";

function LessonCard({
  to,
  title,
  duration,
  isCompleted,
  isLastLesson,
  cardColor,
}) {
  return (
    <div className="flex items-stretch gap-6 w-full justify-center">
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
        className={`block w-full max-w-xl mb-16 p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${cardColor}`}
      >
        <h5 className="mb-4 text-3xl font-bold tracking-tight leading-tight text-black">
          {" "}
          {title}
        </h5>
        <p className="text-slate-800 italic">Dauer: {duration} Minuten</p>{" "}
        {isCompleted ? (
          <div className="mt-6 text-green-700 font-medium">✓ Abgeschlossen</div>
        ) : (
          <div className="mt-6 text-slate-600 font-medium">Ausstehend</div>
        )}
      </Link>
    </div>
  );
}

export default LessonCard;
