import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../App.css";
import ButtonAnswer from "../ButtonAnswer/ButtonAnswer";

function LessonQuiz({ course }) {
  const { lessonId } = useParams();

  const [quiz, setQuiz] = useState();
  const [optionsAnswer, setOptionsAnswer] = useState();
  console.log("📚 course:", course);

  useEffect(() => {
    const foundLesson = course.lessons.find(
      (c) => c.id === parseInt(lessonId, 10)
    );

    setQuiz(foundLesson.quiz);
    setOptionsAnswer(foundLesson.quiz.optionsAnswer);
  }, []);

  useEffect(() => {
    console.log("✅ OptionsAnswer aktualisiert:", optionsAnswer);
  }, [optionsAnswer]);

  if (!quiz) {
    return null;
  }

  if (!optionsAnswer || optionsAnswer.length === 0) {
    return <p>Keine Antworten verfügbar.</p>;
  }

  return (
    <div className="main-content">
      <h1>Question:</h1>
      <h2>{quiz.question}</h2>
      {optionsAnswer.map((option, index) => (
        <ButtonAnswer index={index} option={option} />
      ))}
    </div>
  );
}

export default LessonQuiz;
