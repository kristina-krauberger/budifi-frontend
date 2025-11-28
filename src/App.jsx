import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CoursesOverview from "./pages/CoursesOverview/CoursesOverview.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Test from "./components/Test/Test.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Lessons from "./pages/Lessons/Lessons.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datenschutz" element={<h1>Datenschutz TEST</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesOverview />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
