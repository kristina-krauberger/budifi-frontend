import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

function Lesson({ course, coursesData, setCourse }) {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = coursesData.courses.find(
      (c) => c.id === parseInt(courseId, 10)
    );
    setCourse(foundCourse);
  }, [courseId]);

  const isDevMode = true;
  useEffect(() => {
    if (isDevMode) {
      localStorage.removeItem(`lesson-${lessonId}-video`);
      localStorage.removeItem(`lesson-${lessonId}-quiz`);
      console.log("🧹 Dev-Modus: localStorage wurde zurückgesetzt");
    }
  }, [lessonId]);

  const [isVideoCompleted, setIsVideoCompleted] = useState(() => {
    const stored = localStorage.getItem(`lesson-${lessonId}-video`);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      `lesson-${lessonId}-video`,
      JSON.stringify(isVideoCompleted)
    );
  }, [isVideoCompleted, lessonId]);

  const [isQuizCompleted, setIsQuizCompleted] = useState(() => {
    const stored = localStorage.getItem(`lesson-${lessonId}-quiz`);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      `lesson-${lessonId}-quiz`,
      JSON.stringify(isQuizCompleted)
    );
  }, [isQuizCompleted, lessonId]);
  console.log("Lesson.jsx render:", { isQuizCompleted });

  if (!course) return null;

  return (
    <div className="main-content">
      <LessonNavbar />
      {/* Outlet is a placeholder for nested lesson routes from react-router.
      React Router renders the active sub-route here
      (intro, video, quiz, or summary).*/}
      <div className="max-w-3xl w-full min-h-[400px] mx-auto px-4">
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
      />
      <button
        onClick={() => navigate(`/course/${courseId}`)}
        className="px-6 py-2 border border-gray-200 bg-white rounded-md text-gray-700"
      >
        ← Alle Lessons
      </button>
    </div>
  );
}

export default Lesson;
