import React from "react";
import "../../App.css";
import { Link, useLocation } from "react-router";

function LessonNavbar() {
  const location = useLocation();
  console.log("NAVBAR LOCATION:", location.pathname);

  return (
    <nav className="py-3">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-3">
        <ul className="flex justify-between gap-2 text-sm">
          <Link
            to="video"
            className={`w-full text-center px-3 py-2 border rounded-md bg-white text-gray-700 transition hover:border-gray-400 ${
              location.pathname.includes("video")
                ? " border-grey-300"
                : " border-gray-200"
            }`}
          >
            Video
          </Link>
          <Link
            to="quiz"
            className={`w-full text-center px-3 py-2 border bg-white rounded-md text-gray-700 transition  hover:border-gray-400 ${
              location.pathname.includes("quiz")
                ? " border-grey-300"
                : " border-gray-200"
            }
          `}
          >
            Quiz
          </Link>
          <Link
            to="summary"
            className={`w-full text-center px-3 py-2 border bg-white rounded-md text-gray-700 transition  hover:border-gray-400${
              location.pathname.includes("summary")
                ? " border-grey-300"
                : " border-gray-200"
            }`}
          >
            Fazit
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default LessonNavbar;
