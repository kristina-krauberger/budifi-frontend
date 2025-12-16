import React, { useEffect, useState } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { useParams } from "react-router";
import coursesData from "./courses.mock.json";

// TODO: delete all console.logs

function Course() {
  // Get the course id from URL parameter (e.g., /course/:id)
  const { courseId } = useParams();

  // State to store the selected course data
  const [course, setCourse] = useState(null);

  console.log(courseId);
  useEffect(() => {
    if (courseId) {
      console.log(coursesData);

      // `id` comes from the URL as a string (e.g. "2"), so we convert it to a number
      // to safely use it as an index for our mock data array
      setCourse(coursesData.courses[parseInt(courseId) - 1]);
    }
  }, [courseId]);

  // Guard to avoid rendering before course data is ready
  if (!course) {
    return null;
  }

  return (
    <div className="main-content">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
        {course.title}
      </h1>

      {/* The link is built dynamically using the URL id */}
      <LessonCard
        to={`/course/${courseId}/lesson1`}
        title="Titel"
        duration="10 Minuten"
        completed={true}
        isLast={false}
      />
      <LessonCard
        to="/course1-lesson2"
        title="Titel"
        duration="10 Minuten"
        completed={false}
        isLast={false}
      />
      <LessonCard
        to="/course1-lesson3"
        title="Titel"
        duration="10 Minuten"
        completed={false}
        isLast={false}
      />
      <LessonCard
        to="/course1-lesson4"
        title="Titel"
        duration="10 Minuten"
        completed={false}
        isLast={false}
      />
      <LessonCard
        to="/course1-lesson5"
        title="Titel"
        duration="10 Minuten"
        completed={false}
        isLast={true}
      />
    </div>
  );
}

export default Course;
