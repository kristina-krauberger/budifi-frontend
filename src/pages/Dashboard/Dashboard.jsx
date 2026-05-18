// Dashboard.jsx - Displays the user's personalized dashboard with a greeting and list of courses,
// including their individual progress data.
import "../../App.css";
import { useContext } from "react";
import { Link } from "react-router";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard({ course, allCourses, setCourse, userProgress }) {
  const { loggedInUser } = useContext(LoggedInUserContext);
  // Green-family palette: cohesive but distinct tints
  const cardColors = ["bg-[#0B7A5E]", "bg-[#0EB689]", "bg-[#3DC4A0]"];

  return (
    <div className="main-content">
      <div className="text-center mb-10 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Hey {loggedInUser?.first_name}!
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Schön, dass du wieder da bist.
        </p>
      </div>
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6 max-w-6xl mx-auto px-6">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Dein Lernpfad</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto px-6">
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

      {/* AI Tools Section */}
      <div className="max-w-6xl mx-auto mt-12 px-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Persönlicher Finanz-Coach
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex items-center justify-between gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-6 max-w-2xl">
          {/* Left: Icon + Text */}
          <div className="flex items-start gap-5">
            {/* Compass icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#0EB689]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-800 mb-1">
                Money Compass
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Erhalte eine persönliche Investitionsempfehlung – basierend auf
                deinem Alter, deiner Sparrate und deinen Zielen.
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0">
            <Link
              to="/money-compass"
              className="inline-block bg-[#0EB689] hover:bg-[#0c9d76] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 whitespace-nowrap"
            >
              Jetzt starten →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
