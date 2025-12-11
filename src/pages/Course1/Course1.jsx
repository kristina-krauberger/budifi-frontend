import React from "react";
import LessonCard from "../../components/LessonCard/LessonCard";

function Course1() {
  return (
    <div className="main-content">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight text-heading leading-8 text-left">
        Dein Kurs: Investieren
      </h1>
      <LessonCard
        to="/course1/lesson1"
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

export default Course1;
