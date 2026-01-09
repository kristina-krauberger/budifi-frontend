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

import React from "react";
import { useParams } from "react-router";
import "../../App.css";

function LessonSummary({ course }) {
  // Get the lessonId from the URL
  const { lessonId } = useParams();

  // Find the current lesson based on the lessonId
  const foundCurrentLesson = course.lessons.find(
    (c) => c.id == parseInt(lessonId, 10)
  );

  // Extract the congratulation message and the summary text
  const congrats = foundCurrentLesson.summary.congrats;
  const textSummary = foundCurrentLesson.summary.textSummary;

  return (
    <div className="main-content space-y-6 text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700">
        {congrats}
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
        {textSummary}
      </p>
      <div>
        <p className="my-3 mt-10">Willst du mit der nächsten Lesson starten?</p>
        <div className="flex justify-center gap-4">
          <button className="w-44 py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-200">
            Los geht's!
          </button>
          <button className="w-44 py-3 rounded-md font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transition duration-200">
            Später fortfahren
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonSummary;
