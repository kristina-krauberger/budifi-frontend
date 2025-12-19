import React from "react";
import "../../App.css";
import { useOutletContext } from "react-router";
import { useParams } from "react-router";

function LessonIntro({}) {
  // Get the course id and lesson id from URL parameter (e.g., /course/:courseId/lesson/:lessonId)
  const { lessonId } = useParams();
  const lessonIdNumber = parseInt(lessonId, 10);
  const { course } = useOutletContext();

  const lesson = course.lessons.find((lesson) => lesson.id === lessonIdNumber);

  console.log("lesson:", lesson);

  return (
    <div className="main-content">
      <h2>{lesson.title}</h2>
      <p>{lesson.intro.text}</p>
    </div>
  );
}

export default LessonIntro;
