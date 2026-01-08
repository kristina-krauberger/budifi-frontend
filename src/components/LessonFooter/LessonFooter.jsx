/**
 * LessonFooter component:
 * - Displays a navigation bar at the bottom of each lesson step.
 * - Shows a "next" button conditionally based on the lesson progress.
 * - Navigates to the next lesson section or back to the course.
 */

import { useNavigate, useLocation, useParams } from "react-router";
import "../../App.css";
import ButtonBack from "../ButtonBack/ButtonBack";

function LessonFooter({ isVideoCompleted, isQuizCompleted }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("👉 Location Pathname", location.pathname);
  const { courseId, lessonId } = useParams();

  // Get the current pathname from the router
  const currentPath = location.pathname;

  // Define the next path and whether the button should be shown
  let nextPathname = null;
  let showButton = false;

  // Determine logic based on current route and progress
  if (currentPath.includes("video") && isVideoCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/quiz`;
    showButton = true;
  } else if (currentPath.includes("quiz") && isQuizCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/summary`;
    showButton = true;
  } else if (currentPath.includes("summary")) {
    nextPathname = `/course/${courseId}`;
  }

  // TODO Debug: remove in production
  // console.log(
  //   "LessonFooter.jsx VIDEOCompleted📌",
  //   typeof isVideoCompleted,
  //   isVideoCompleted
  // );

  // TODO Debug: remove in production
  // console.log(
  //   "LessonFooter.jsx QuizCompleted✅",
  //   typeof isQuizCompleted,
  //   isQuizCompleted
  // );

  return (
    <nav className="main-content">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-1">
        <ul className="flex justify-between gap-2 text-sm">
          <li>
            <ButtonBack />
          </li>
          {showButton && (
            <li>
              <button
                onClick={() => navigate(nextPathname)}
                className="mb-6 inline-flex mr-7 self-start items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 text-gray-700"
              >
                →
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default LessonFooter;
