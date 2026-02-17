/**
 * Renders the quiz section of a lesson:
 * - Loads quiz data based on lessonId
 * - Manages user answer and feedback
 * - Updates quiz completion state (isQuizCompleted) via context
 * - Navigates to summary on correct answer
 */

import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { updateLessonProgress } from "../../api/lesson_progress.api";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import "../../App.css";
import ButtonAnswer from "../ButtonAnswer/ButtonAnswer";

function LessonQuiz({ course }) {
  const { lessonNumber, courseId } = useParams();
  const navigate = useNavigate();
  const { isQuizCompleted, setIsQuizCompleted } = useOutletContext();
  const [showButton, setShowButton] = useState(false);

  // Local state for quiz data and answer tracking
  const [quizQuestion, setQuizQuestion] = useState();
  const [optionsAnswer, setOptionsAnswer] = useState();
  const [givenAnswer, setGivenAnswer] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isCompleted, setIsCompleted] = useState(false);

  // Global State "User"
  const { loggedInUser } = useContext(LoggedInUserContext);

  const foundLesson = course.lessons.find(
    (c) => c.lesson_number === parseInt(lessonNumber, 10),
  );
  // console.log("✅ LESSON Number from URL", lessonNumber);
  // console.log("✅ LESSON FOUND", foundLesson);
  // console.log("2️⃣ foundLesson.id", foundLesson.lesson_id);

  // Loads quiz data and answer options based on lessonId
  useEffect(() => {
    if (!foundLesson || !foundLesson.quiz || foundLesson.quiz.length === 0) {
      console.warn("❌ Lesson oder Quiz nicht gefunden");
      return;
    }

    setQuizQuestion(foundLesson.quiz[0]?.question_text);
    setOptionsAnswer(foundLesson.quiz[0]?.optionsAnswer);
    setCorrectAnswer(foundLesson.quiz[0]?.correctAnswer);
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

  if (!quizQuestion) {
    return <p>Keine Quizfrage vorhanden.</p>;
  }

  if (!optionsAnswer || optionsAnswer.length === 0) {
    return <p>Keine Antworten verfügbar.</p>;
  }

  return (
    <div className="main-content flex flex-col justify-start min-h-[200px]">
      <div>
        <h2 className="text-3xl font-bold text-grey-800 mb-6 tracking-wide">
          {quizQuestion}
        </h2>
      </div>
      <div>
        {showButton &&
          optionsAnswer.map((optionAnswer, index) => (
            <ButtonAnswer
              key={index}
              index={index}
              optionAnswer={optionAnswer}
              onClick={() => {
                setGivenAnswer(index);
                if (index === correctAnswer) {
                  console.log("👉 index:", index);
                  console.log("👉 correctAnswer:", correctAnswer);
                  new Audio("/sound/correct.mp3").play();
                  setTimeout(() => {
                    navigate(
                      `/course/${courseId}/lesson/${lessonNumber}/summary`,
                    );
                  }, 2000);
                  setIsCompleted(true);
                  setIsQuizCompleted(true);
                  // console.log("🔥 CLICKED CORRECT ANSWER");
                  // console.log(
                  //   "🔥 calling updateLessonProgress with:",
                  //   loggedInUser?.id,
                  //   foundLesson?.lesson_id,
                  // );
                  updateLessonProgress(
                    loggedInUser.id,
                    foundLesson.lesson_id,
                    1,
                  );
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
