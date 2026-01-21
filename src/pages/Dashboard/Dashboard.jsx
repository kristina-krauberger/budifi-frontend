import "../../App.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import { LoggedInUserContext } from "../../context/LoggedInUserContext"
import { useContext } from "react";

function Dashboard({ course, allCourses, setCourse }) {
  const { loggedInUser } = useContext(LoggedInUserContext) 

  return (
    <div className="main-content">
      <h1>DEIN DASHBOARD</h1>
      <h2>{JSON.stringify(loggedInUser)}</h2>
      <h2>Hallo {loggedInUser?.first_name}, willkommen zurück!</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 max-w-4xl mx-auto mt-10">
        {allCourses.courses.map((course) => (
          <CourseCard
            to={`/course/${course.id}`}
            key={course.id}
            title={course.title}
            lessons={course.lessons.length}
            progress={45}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
