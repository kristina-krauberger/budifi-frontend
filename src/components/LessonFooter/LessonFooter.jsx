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
  allCourses,
  course,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("👉 Location Pathname", location.pathname);
  const { courseId, lessonNumber } = useParams();
  console.log("🚨 COURSE ID", courseId);
  console.log("🚨 LESSON ID", lessonNumber);
  console.log("COURSE", course);
  console.log("🚨 COURSE.LESSONS", course.lessons);
  const currentLesson = course?.lessons?.find(
    (lesson) => lesson.lesson_number === parseInt(lessonNumber),
  );

  console.log("🚨 CurrentLesson", currentLesson);
  if (!currentLesson) {
    return <p>Lädt Footer...</p>;
  }

  // Get the current course object based on the current courseId from the URL
  const currentCourse = allCourses.courses.find(
    (c) => c.course_id === parseInt(courseId),
  );

  // Get the current pathname from the router
  const currentPath = location.pathname;

  // Define the next path and whether the button should be shown
  let nextPathname = null;
  let showButton = false;

  // Determine navigation logic based on current route and progress
  // Video → Quiz → Summary → Next Lesson Video or Dashboard
  if (currentPath.includes("video") && isVideoCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonNumber}/quiz`;
    showButton = true;
  } else if (currentPath.includes("quiz") && isQuizCompleted) {
    nextPathname = `/course/${courseId}/lesson/${lessonNumber}/summary`;
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
      nextPathname = `/course/${courseId}/lesson/${Number(lessonNumber) + 1}/video`;
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
    <nav className="py-4">
      <div className="bg-gray-100 rounded-xl px-4 py-2 h-[52px] flex items-center justify-between">
          <ButtonBack />
          {showButton && (
            <button
              onClick={() => navigate(nextPathname)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0EB689] text-white shadow-sm hover:bg-[#0c9d76] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EB689]/40 transition text-base"
            >
              →
            </button>
          )}
      </div>
    </nav>
  );
}

export default LessonFooter;
