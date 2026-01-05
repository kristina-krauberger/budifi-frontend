import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

function Lesson({ course, coursesData, setCourse }) {
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = coursesData.courses.find(
      (c) => c.id === parseInt(courseId, 10)
    );
    setCourse(foundCourse);
  }, [courseId]);

  if (!course) return null;

  return (
    <div className="main-content">
      <LessonNavbar />
      {/* Outlet is a placeholder for nested lesson routes from react-router.
      React Router renders the active sub-route here
      (intro, video, quiz, or summary).*/}
      <Outlet context={{ course }} />
      <LessonFooter />
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
