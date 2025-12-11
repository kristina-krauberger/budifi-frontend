import React from "react";
import "../../App.css";
import LessonNavbar from "../../components/LessonNavbar/LessonNavbar";
import LessonFooter from "../../components/LessonFooter/LessonFooter";
import { Outlet } from "react-router";

function Lessons() {
  return (
    <div className="main-content">
      <LessonNavbar />
      <Outlet />
      <LessonFooter />
    </div>
  );
}

export default Lessons;
