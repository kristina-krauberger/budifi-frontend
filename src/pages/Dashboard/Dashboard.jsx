// Dashboard.jsx - Displays the user's personalized dashboard with a greeting and list of courses,
// including their individual progress data.
import "../../App.css";
import { useContext } from "react";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard({ course, allCourses, setCourse, userProgress }) {
  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <div className="main-content">
      <h1>DEIN DASHBOARD</h1>
      <h2>{JSON.stringify(loggedInUser)}</h2>
      <h2>{JSON.stringify(userProgress)}</h2>
      <h2>Hallo {loggedInUser?.first_name}, willkommen zurück!</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 max-w-4xl mx-auto mt-10">
        {/* Loop through all available courses and match them with the user's progress data */}
        {/* Joining Course ↔ Progress */}
        {allCourses.courses.map((course) => {
          // Find the user's progress for the current course by matching course IDs
          const progressObj = userProgress.courses.find(
            (progressItem) => progressItem.course_id === course.course_id,
          );
          const progressPercentage = progressObj?.completed_percentage ?? 0;

          return (
            <CourseCard
              to={`/course/${course.course_id}`}
              key={course.course_id}
              title={course.title}
              lessons={course.lessons.length}
              progress={progressPercentage}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
