import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";

function LessonVideo({ course, coursesData, setCourse }) {
  const { isVideoCompleted, setIsVideoCompleted } = useOutletContext();
  console.log("LESSON VIDEO📌", typeof isVideoCompleted, isVideoCompleted);

  return (
    <div className="main-content">
      <button
        onClick={() => setIsVideoCompleted(!isVideoCompleted)}
        className="border bg-amber-400 hover:"
      >
        LessonVideo
      </button>
    </div>
  );
}

export default LessonVideo;
