import CourseCard from "../../components/CourseCard/CourseCard";
import data from "../../mockdata/course.json";
import "../../App.css";
import { useState } from "react";

export default function Courses() {
  const showCourses = true;

  return (
    <div className='main-content bg-red-500'>

      {showCourses &&
        data.map((course) => (
          <Course
            key={course.id}
            title={course.course_name}
            duration={course.duration}
          />
        ))}
    </div>
  );
}
