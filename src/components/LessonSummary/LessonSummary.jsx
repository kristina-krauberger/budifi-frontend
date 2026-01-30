/**
 * Renders the final summary screen at the end of a lesson:
 *
 * 1. Displays a congratulatory message (e.g. "Well done!")
 * 2. Shows a short summary of the lesson content
 *
 * The data is extracted from the current lesson object inside the course.
 * The lessonId is taken from the URL using `useParams`.
 *
 * This component is displayed inside the <Outlet /> of Lesson.jsx
 * on the route: /course/:courseId/lesson/:lessonId/summary
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../App.css";
import ButtonNextLesson from "../../ButtonNextLesson/ButtonNextLesson";

function LessonSummary({ course }) {
  // Get the lessonId from the URL
  const { lessonId } = useParams();

  // Find the current lesson based on the lessonId
  const foundCurrentLesson = course?.lessons?.find(
    (lesson) => lesson.lesson_number === parseInt(lessonId, 10),
  );

  if (!foundCurrentLesson) {
    return <p>Lädt Zusammenfassung...</p>;
  }

  // Extract the congratulation message and the summary text
  const congrats = foundCurrentLesson.summaryCongrats;
  const textSummary = foundCurrentLesson.summaryText;

  const [showButton, setShowButton] = useState(false);

  (useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  }),
    []);

  return (
    <div className="main-content space-y-6 text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700">
        {congrats}
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
        {textSummary}
      </p>
      <div>
        <div className="flex justify-center gap-4">
          {showButton && (
            <button className="w-44 py-3 rounded-md font-semibold bg-emerald-400 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md transition-all duration-200">
              Weiter geht's!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonSummary;
