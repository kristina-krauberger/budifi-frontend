// Dashboard.jsx - Displays the user's personalized dashboard with a greeting and list of courses,
// including their individual progress data.
import "../../App.css";
import { useContext } from "react";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard({ course, allCourses, setCourse, userProgress }) {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const cardColors = ["bg-[#FDD0BF]", "bg-[#3D7BCA]", "bg-[#ACC8E5]"];

  return (
    <div className="main-content pt-10 pb-10">
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold text-primary-600">
          Hey {loggedInUser?.first_name}!
        </h1>
        <p className="text-md text-gray-600 mt-2">
          Hier ist dein persönliches Dashboard
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 max-w-6xl mx-auto mt-12">
        {/* Loop through all available courses and match them with the user's progress data */}
        {/* Joining Course ↔ Progress */}
        {allCourses.courses.map((course, index) => {
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
              cardColor={cardColors[index % cardColors.length]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
