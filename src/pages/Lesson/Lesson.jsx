/**
 * Renders the main Lesson layout:
 * 1. Top navigation bar (LessonNavbar)
 * 2. Main lesson content (intro/video/quiz/summary) via React Router's <Outlet />
 * 3. Bottom navigation and progress logic (LessonFooter)
 *
 * Also manages:
 * - Video and quiz completion states (loaded/saved via localStorage)
 * - Developer mode for testing/resetting progress (toggle isDevMode)
 */

import { useEffect, useState } from "react"; 
import { Outlet, useParams, useNavigate } from "react-router"; 
import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import NotFound from "../NotFound/NotFound";

function Lesson({ course, allCourses, setCourse, userProgress }) {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();


  // Finds current Lesson
  const foundCurrentLesson = course?.lessons.find(
    (lesson) => lesson.lesson_id === parseInt(lessonId),
  );

  // Track progress state for video and quiz
  // Initialized from localStorage to persist state across reloads
  const [isVideoCompleted, setIsVideoCompleted] = useState(() => {
    const stored = localStorage.getItem(`lesson-${lessonId}-video`);
    return stored ? JSON.parse(stored) : false;
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(() => {
    const stored = localStorage.getItem(`lesson-${lessonId}-quiz`);
    return stored ? JSON.parse(stored) : false;
  });

  // TODO DEV MODE RESET (for development only - Remove this before deploying to production.)
  // This block resets the localStorage for video and quiz completion.
  // It runs on every render — not inside useEffect — to ensure data is cleared each time.
  const isDevMode = true;
  if (isDevMode) {
    localStorage.removeItem(`lesson-${lessonId}-video`);
    localStorage.removeItem(`lesson-${lessonId}-quiz`);
    console.log("🧹 Dev-Modus: localStorage wurde zurückgesetzt");
    console.log("🔎 DevMode Reset für lessonId:", lessonId);
  }

  // Find the current course by ID and update parent state
  useEffect(() => {
    const foundCurrentCourse = allCourses?.courses?.find(
      (c) => c.course_number === parseInt(courseId, 10),
    );
    setCourse(foundCurrentCourse);
  }, [courseId]);

  // Save isVideoCompleted state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `lesson-${lessonId}-video`,
      JSON.stringify(isVideoCompleted),
    );
  }, [isVideoCompleted, lessonId]);

  // Save isQuizCompleted state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `lesson-${lessonId}-quiz`,
      JSON.stringify(isQuizCompleted),
    );
  }, [isQuizCompleted, lessonId]);
  console.log("Lesson.jsx render:", { isQuizCompleted });

  if (!allCourses || !allCourses.courses) return <p>Lädt...</p>;

  if (allCourses && !course) {
    return <NotFound />;
  }

  return (
    <div className="main-content">
      <div className="mt-6 mb-4 flex items-baseline gap-4">
        <h1 className="text-3xl font-bold pt-2 text-gray-800 uppercase tracking-wide">
          {course?.title}
        </h1>
        <h2 className="text-lg text-gray-600 mt-2">
          {foundCurrentLesson?.title}
        </h2>
      </div>
      <LessonNavbar
        isVideoCompleted={isVideoCompleted}
        isQuizCompleted={isQuizCompleted}
      />
      {/* Outlet is a placeholder for nested lesson routes from react-router.
      React Router renders the active sub-route here
      (intro, video, quiz, or summary).*/}
      <div className="flex flex-col items-center justify-center w-full min-h-[400px] max-h-[400px] px-2 overflow-y-auto">
        <Outlet
          context={{
            course,
            isVideoCompleted,
            setIsVideoCompleted,
            isQuizCompleted,
            setIsQuizCompleted,
          }}
        />
      </div>
      <LessonFooter
        isVideoCompleted={isVideoCompleted}
        isQuizCompleted={isQuizCompleted}
        allCourses={allCourses}
        course={course}
      />
      <button
        onClick={() => navigate(`/course/${courseId}`)}
        className="px-6 py-2 border border-gray-200 bg-white rounded-md text-gray-700  hover:bg-neutral-100 cursor-pointer transition"
      >
        ← Alle Lessons
      </button>
    </div>
  );
}

export default Lesson;
