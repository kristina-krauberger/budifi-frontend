/**
 * Renders the quiz section of a lesson:
 * - Loads quiz data based on lessonId
 * - Manages user answer and feedback
 * - Updates quiz completion state (isQuizCompleted) via context
 * - Navigates to summary on correct answer
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import "../../App.css";
import ButtonAnswer from "../ButtonAnswer/ButtonAnswer";

function LessonQuiz({ course }) {
  const { lessonId, courseId } = useParams();
  const navigate = useNavigate();
  const { isQuizCompleted, setIsQuizCompleted } = useOutletContext();
  const [showButton, setShowButton] = useState(false);

  // Local state for quiz data and answer tracking
  const [quiz, setQuiz] = useState();
  const [optionsAnswer, setOptionsAnswer] = useState();
  const [givenAnswer, setGivenAnswer] = useState();
  const [isCompleted, setIsCompleted] = useState(false);

  // Optional chaining: avoids error if quiz is undefined or null
  // Without this, accessing quiz.correctAnswer could crash the app on first render
  const correctAnswer = quiz?.correctAnswer;

  // Loads quiz data and answer options based on lessonId
  useEffect(() => {
    const foundLesson = course.lessons.find(
      (c) => c.id === parseInt(lessonId, 10)
    );

    setQuiz(foundLesson.quiz);
    setOptionsAnswer(foundLesson.quiz.optionsAnswer);
  }, []);

  // Shows the answer buttons with a 4-second delay after the question is displayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  });

  // TODO Debug: Log changes to options and selected answer (remove in production)
  // useEffect(() => {
  //   console.log("🧠 OptionsAnswer aktualisiert:", optionsAnswer);
  //   console.log("🧠 GivenAnswer aktualisiert:", givenAnswer);
  // }, [optionsAnswer, givenAnswer]);

  //TODO Debug: Log loaded quiz data (remove in production)
  // useEffect(() => {
  //   if (quiz) {
  //     console.log("📍 Quiz:", quiz);
  //     console.log("🎯 Richtige Antwort ist:", quiz.correctAnswer);
  //   }
  // }, [quiz]);

  //TODO Debug: Track changes in quiz completion state (from context)
  // useEffect(() => {
  //   console.log(
  //     "LessonQuiz.jsx✅ isQuizCompleted hat sich geändert:",
  //     isQuizCompleted
  //   );
  // }, [isQuizCompleted]);

  if (!quiz) {
    return null;
  }

  if (!optionsAnswer || optionsAnswer.length === 0) {
    return <p>Keine Antworten verfügbar.</p>;
  }

  return (
    <div className="main-content flex flex-col justify-start min-h-[200px]">
      <div>
        <h2 className="text-3xl font-bold text-grey-800 mb-6 tracking-wide">
          {quiz.question}
        </h2>
      </div>
      <div>
        {showButton &&
          optionsAnswer.map((optionAnswer, index) => (
            <ButtonAnswer
              index={index}
              optionAnswer={optionAnswer}
              onClick={() => {
                setGivenAnswer(index);
                if (index === correctAnswer) {
                  new Audio("/sound/correct.mp3").play();
                  setTimeout(() => {
                    navigate(`/course/${courseId}/lesson/${lessonId}/summary`);
                  }, 2000);
                  setIsCompleted(true);
                  setIsQuizCompleted(true);
                } else {
                  const audio = new Audio("/sound/wrong.mp3");
                  audio.volume = 0.4;
                  audio.play();
                }
              }}
              wasClicked={index === givenAnswer}
              isCorrect={index === correctAnswer}
              givenAnswer={givenAnswer}
            />
          ))}
      </div>
    </div>
  );
}

export default LessonQuiz;
