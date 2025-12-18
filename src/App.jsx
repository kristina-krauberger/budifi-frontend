import "./App.css";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Course from "./pages/Course/Course.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import Login from "./pages/Login/Login.jsx";
import PublicLayout from "./layouts/PublicLayout";
import Lesson from "./pages/Lesson/Lesson";
import PrivateLayout from "./layouts/PrivateLayout";
import Datenschutz from "./pages/Datenschutz/Datenschutz.jsx";
import Impressum from "./pages/Impressum/Impressum.jsx";
// Static mock data containing all courses and their lessons
import coursesData from "./mockdata/courses.mock.json";
import LessonIntro from "./components/LessonIntro/LessonIntro.jsx";
import LessonVideo from "./components/LessonVideo/LessonVideo.jsx";
import LessonQuiz from "./components/LessonQuiz/LessonQuiz.jsx";
import LessonSummary from "./components/LessonSummary/LessonSummary.jsx";

function App() {
  // Holds the currently selected course.
  // Shared across Dashboard, Course and Lesson pages.
  const [course, setCourse] = useState(null);

  return (
    <div>
      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Private layout */}
        <Route element={<PrivateLayout />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                course={course}
                coursesData={coursesData}
                setCourse={setCourse}
              />
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <Course
                course={course}
                coursesData={coursesData}
                setCourse={setCourse}
              />
            }
          />

          {/* NESTED LESSON ROUTE
          These routes define the internal flow of a lesson
          (intro → video → quiz → summary).
          The content is rendered inside the <Outlet /> of Lesson.jsx.*/}
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={
              <Lesson
                course={course}
                coursesData={coursesData}
                setCourse={setCourse}
              />
            }
          >
            <Route path="intro" element={<LessonIntro />} />
            <Route path="video" element={<LessonVideo />} />
            <Route path="quiz" element={<LessonQuiz />} />
            <Route path="summary" element={<LessonSummary />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
