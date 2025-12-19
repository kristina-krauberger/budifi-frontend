import "../../App.css";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard({ course, coursesData, setCourse }) {

  return (
    <div className="main-content">
      <h1>DEIN DASHBOARD</h1>
      <h2>Hallo [NAME], willkommen zurück!</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 max-w-4xl mx-auto mt-10">
        {coursesData.courses.map((course) => (
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
