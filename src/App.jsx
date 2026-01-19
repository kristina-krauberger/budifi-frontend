import "./App.css";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Course from "./pages/Course/Course.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import Login from "./pages/Login/Login.jsx";
import PublicLayout from "./layouts/PublicLayout";
import Lesson from "./pages/Lesson/Lesson";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import Imprint from "./pages/Imprint/Imprint.jsx";
// Static mock data containing all courses and their lessons
import { getAllCourses } from "./api/course.api.js";
import LessonVideo from "./components/LessonVideo/LessonVideo.jsx";
import LessonQuiz from "./components/LessonQuiz/LessonQuiz.jsx";
import LessonSummary from "./components/LessonSummary/LessonSummary.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  // Holds the currently selected course.
  // Shared across Dashboard, Course and Lesson pages.
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState(null);
  console.log("ALL COURSES", allCourses, typeof(allCourses))

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setAllCourses(data);
        console.log(data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };

    fetchCourses();
  }, []);

  if (!allCourses) {
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
