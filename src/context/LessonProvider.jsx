import { LessonContext } from "./LessonContext";
import { useState } from "react";

export function LessonProvider({ children }) {
  const [currentLesson2, setCurrentLesson2] = useState("currentLesson2 TEST");
  const [lessonId2, setLessonId2] = useState("lessonId2 TEST");
  const [isCompleted2, setIsCompleted2] = useState("isCompleted2 TEST");
  const [videoWatched2, setVideoWatched2] = useState("videaoWatched2 TEST");

  return (
    <LessonContext.Provider
      value={{
        currentLesson2,
        setCurrentLesson2,
        lessonId2,
        setLessonId2,
        isCompleted2,
        setIsCompleted2,
        videoWatched2,
        setVideoWatched2,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}
