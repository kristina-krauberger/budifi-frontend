import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router";

function Lesson({ course, coursesData, setCourse }) {
  const { courseId} = useParams();

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
    </div>
  );
}

export default Lesson;
