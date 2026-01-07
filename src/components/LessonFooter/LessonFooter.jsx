import "../../App.css";
import { useNavigate, useLocation, useParams } from "react-router";
import ButtonBack from "../ButtonBack/ButtonBack";

function LessonFooter({ isVideoCompleted }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("👉 Location Pathname", location.pathname);
  const { courseId, lessonId } = useParams();

  console.log("LESSON FOOTER📌", typeof isVideoCompleted, isVideoCompleted);

  const currentPath = location.pathname;

  let nextPathname = null;

  if (currentPath.includes("video")) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/quiz`;
  } else if (currentPath.includes("quiz")) {
    nextPathname = `/course/${courseId}/lesson/${lessonId}/summary`;
  } else if (currentPath.includes("summary")) {
    nextPathname = `/course/${courseId}`;
  }

  return (
    <nav className="main-content">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-1">
        <ul className="flex justify-between gap-2 text-sm">
          <li>
            <ButtonBack />
          </li>

          <li>
            {isVideoCompleted && (
              <button
                onClick={() => navigate(nextPathname)}
                className="mb-6 inline-flex mr-7 self-start items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 text-gray-700"
              >
                →
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LessonFooter;
