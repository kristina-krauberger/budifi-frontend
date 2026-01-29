// Main application component with routing setup.
// Fetches course data and user progress once logged in.
import "./App.css";

import { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";

import { getAllCourses } from "./api/course.api.js";
import { getLessonProgress } from "./api/lesson_progress.api.js";
import { LoggedInUserContext } from "./context/LoggedInUserContext";

import Course from "./pages/Course/Course.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Imprint from "./pages/Imprint/Imprint.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Lesson from "./pages/Lesson/Lesson";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import PublicLayout from "./layouts/PublicLayout";
import RegisterUser from "./pages/RegisterUser/RegisterUser.jsx";

import LessonVideo from "./components/LessonVideo/LessonVideo.jsx";
import LessonQuiz from "./components/LessonQuiz/LessonQuiz.jsx";
import LessonSummary from "./components/LessonSummary/LessonSummary.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const location = useLocation();

  // Holds the currently selected course and progress.
  // Shared across Dashboard, Course and Lesson pages.
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState(null);
  console.log("ALL COURSES", allCourses, typeof allCourses);
  const [userProgress, setUserProgress] = useState(null);

  // Fetch all courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setAllCourses(data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    fetchCourses();
  }, []);


  // Fetch the progress of the currently logged-in user
  // This is triggered only once the user is available in context
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const data = await getLessonProgress(loggedInUser.id);
        setUserProgress(data);
        console.log("Progress for User (ID):", data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    if (loggedInUser) {
      fetchUserProgress();
    }
  }, [loggedInUser, location.pathname]);

  // Show loading screen until both course data and user progress have loaded
  if (!allCourses || !userProgress) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Listens to route changes and scrolls to top. */}
      <ScrollToTop />
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datenschutz" element={<PrivacyPolicy />} />
          <Route path="/impressum" element={<Imprint />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrieren" element={<RegisterUser />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Private layout */}
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                course={course}
                allCourses={allCourses}
                setCourse={setCourse}
                userProgress={userProgress}
              />
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <Course
                course={course}
                allCourses={allCourses}
                setCourse={setCourse}
                userProgress={userProgress}
              />
            }
          />

          {/* NESTED LESSON ROUTE
          These routes define the internal flow of a lesson
          (video → quiz → summary).
          The content is rendered inside the <Outlet /> of Lesson.jsx.*/}
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={
              <Lesson
                course={course}
                allCourses={allCourses}
                setCourse={setCourse}
                userProgress={userProgress}
              />
            }
          >
            <Route index element={<Navigate to="video" replace />} />
            <Route
              path="video"
              element={
                <LessonVideo
                  course={course}
                  allCourses={allCourses}
                  setCourse={setCourse}
                />
              }
            />
            <Route
              path="quiz"
              element={
                <LessonQuiz
                  course={course}
                  allCourses={allCourses}
                  setCourse={setCourse}
                />
              }
            />
            <Route
              path="summary"
              element={
                <LessonSummary
                  course={course}
                  allCourses={allCourses}
                  setCourse={setCourse}
                />
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
