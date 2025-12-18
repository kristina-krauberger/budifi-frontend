import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import { Outlet } from "react-router";

function Lesson({ course, courseData, setCourse }) {
  return (
    <div className="main-content">
      <LessonNavbar />
      {/* Outlet is a placeholder for nested lesson routes from react-router.
      React Router renders the active sub-route here
      (intro, video, quiz, or summary).*/}
      <Outlet />
      <LessonFooter />
    </div>
  );
}

export default Lesson;
