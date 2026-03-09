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
        className={`relative block w-full max-w-xl mb-16 p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${cardColor}`}
      >
        <div className="absolute -top-5 -right-5">
          {isCompleted ? (
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center ring-2 ring-white/60">
              <div className="w-5 h-5 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm"></div>
          )}
        </div>
        <h5 className="mb-4 text-3xl font-bold tracking-tight leading-tight text-white">
          {" "}
          {title}
        </h5>
        <p className="text-white/80 italic">Dauer: {duration} Minuten</p>{" "}
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
