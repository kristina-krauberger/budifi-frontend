import React from "react";
import { Link } from "react-router";

/**
 * LessonCard — neutral white card with a timeline indicator.
 * Completed lessons show a brand-mint filled circle; pending lessons are gray.
 */
function LessonCard({
  to,
  title,
  duration,
  isCompleted,
  isLastLesson,
  lessonNumber,
}) {
  return (
    <div className="flex items-stretch gap-5 w-full justify-center">
      {/* Timeline indicator */}
      <div className="relative flex flex-col items-center pt-1">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 z-10 transition-colors duration-300 ${
            isCompleted
              ? "bg-[#0EB689] border-[#0EB689]"
              : "bg-white border-gray-300"
          }`}
        />
        {!isLastLesson && (
          <div className="flex-1 w-px bg-gray-200 mt-1" />
        )}
      </div>

      {/* Lesson Card */}
      <Link
        to={to}
        className="relative block w-full max-w-xl mb-8 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
      >
        {/* Completion badge */}
        {isCompleted && (
          <span className="absolute top-4 right-4 text-xs font-semibold text-[#0EB689] bg-[#F0FAF6] px-2.5 py-1 rounded-full">
            ✓ Abgeschlossen
          </span>
        )}

        <p className="text-xs text-gray-400 mb-1">
          Lektion {lessonNumber}
        </p>
        <h5 className="text-base font-bold text-gray-800 tracking-tight leading-snug group-hover:text-[#0EB689] transition-colors duration-200 pr-28">
          {title}
        </h5>
        <p className="text-xs text-gray-400 mt-2">
          Dauer: {duration} Min.
        </p>
      </Link>
    </div>
  );
}

export default LessonCard;
