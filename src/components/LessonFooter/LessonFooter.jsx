/**
 * LessonFooter component:
 * - Displays a navigation bar at the bottom of each lesson step.
 * - Shows a "next" button conditionally based on the lesson progress.
 * - Navigates to the next lesson section or back to the course.
 */

import { useNavigate, useLocation, useParams } from "react-router";
import "../../App.css";
import ButtonBack from "../ButtonBack/ButtonBack";

function LessonFooter({
  isVideoCompleted,
  isQuizCompleted,
  coursesData,
  course,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("👉 Location Pathname", location.pathname);
  const { courseId, lessonId } = useParams();
  const currentLesson = course.lessons.find(
    (lesson) => lesson.id === parseInt(lessonId)
  );

  // Get the current course object based on the current courseId from the URL
  const currentCourse = coursesData.courses.find(
    (c) => c.id === parseInt(courseId)
  );

  // Get the current pathname from the router
  const currentPath = location.pathname;

  // Define the next path and whether the button should be shown
  let nextPathname = null;
  let showButton = false;

  // Determine navigation logic based on current route and progress
  // Video → Quiz → Summary → Next Lesson Video or Dashboard
  if (currentPath.includes("video") && isVideoCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/quiz`;
    showButton = true;
  } else if (currentPath.includes("quiz") && isQuizCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/summary`;
    showButton = true;
  } else if (currentPath.includes("summary")) {
    showButton = true;

    // Determine where to navigate after the lesson summary:
    // - If it's not the last lesson in the current course → go to next lesson
    // - If it's the last lesson but not the last course → go to next course, lesson 1
    // - If it's the last lesson of the last course → go to dashboard
    const isLastLesson = currentLesson.isLastLesson;
    const isLastCourse = currentCourse.isLastCourse;

    if (!isLastLesson) {
      nextPathname = `/course/${courseId}/lesson/${Number(lessonId) + 1}/video`;
    } else if (!isLastCourse) {
      nextPathname = `/course/${Number(courseId) + 1}/lesson/1/video`;
    } else {
      nextPathname = `/dashboard`;
    }
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
    <nav className="py-5">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-1 h-[55px]">
        <ul className="h-full flex justify-between items-center gap-2 text-sm">
          <li>
            <ButtonBack />
          </li>
          {showButton && (
            <li>
              <button
                onClick={() => navigate(nextPathname)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-emerald-400/60 text-emerald-600 hover:bg-emerald-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 transition"
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
