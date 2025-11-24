import Course from "../../components/Course/Course";
import data from "../../mockdata/course.json";
import { useState } from "react";

export default function Courses() {
  const showCourses = true;

  return (
    <div>
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
