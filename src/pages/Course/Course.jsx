import React, { useEffect, useState } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { useParams } from "react-router";
import coursesData from "./courses.mock.json";

function Course() {
  const [courseId, setCourseId] = useState(1);
  const { id } = useParams();
  const [course, setCourse] = useState()
  console.log(id);
  useEffect(() => {
    if (id) {
      console.log(coursesData);
      setCourseId(id);
      setCourse(coursesData.courses[id-1])
    }
  }, [id]);

  if (!course) {
    return null
  }

  return (
    <div className="main-content">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
        {course.title} 
      </h1>
      <LessonCard
        to={`/course${courseId}/lesson1`}
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
