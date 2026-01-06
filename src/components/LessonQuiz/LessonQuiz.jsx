import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../App.css";
import ButtonAnswer from "../ButtonAnswer/ButtonAnswer";

function LessonQuiz({ course }) {
  const { lessonId } = useParams();

  const [quiz, setQuiz] = useState();
  const [optionsAnswer, setOptionsAnswer] = useState();
  const [givenAnswer, setGivenAnswer] = useState();
  // Optional chaining: avoids error if quiz is undefined or null
  // Without this, accessing quiz.correctAnswer could crash the app on first render
  const correctAnswer = quiz?.correctAnswer;

  console.log("📚 course:", course);

  //1.
  useEffect(() => {
    const foundLesson = course.lessons.find(
      (c) => c.id === parseInt(lessonId, 10)
    );

    setQuiz(foundLesson.quiz);
    setOptionsAnswer(foundLesson.quiz.optionsAnswer);
  }, []);

  // TODO console log löschen
  //2.
  useEffect(() => {
    console.log("✅ OptionsAnswer aktualisiert:", optionsAnswer);
    console.log("🧠 GivenAnswer aktualisiert:", givenAnswer);
  }, [optionsAnswer, givenAnswer]);

  //3.
  useEffect(() => {
    if (quiz) {
      console.log("✅ Quiz:", quiz);
      console.log("🎯 Richtige Antwort ist:", quiz.correctAnswer);
    }
  }, [quiz]);

  if (!quiz) {
    return null;
  }

  if (!optionsAnswer || optionsAnswer.length === 0) {
    return <p>Keine Antworten verfügbar.</p>;
  }

  return (
    <div className="main-content">
      <h2 className="text-3xl font-bold text-grey-800 mb-6 text-center tracking-wide">{quiz.question}</h2>
      {optionsAnswer.map((optionAnswer, index) => (
        <ButtonAnswer
          index={index}
          optionAnswer={optionAnswer}
          onClick={() => {
            setGivenAnswer(index);
            if (index === correctAnswer) {
              new Audio("/sound/correct.mp3").play();
            } else {
              new Audio("/sound/wrong.mp3").play();
            }
          }}
          wasClicked={index === givenAnswer}
          isCorrect={index === correctAnswer}
          givenAnswer={givenAnswer}
        />
      ))}
    </div>
  );
}

export default LessonQuiz;
