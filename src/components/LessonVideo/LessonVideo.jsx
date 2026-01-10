import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Pfad anpassen je nach Struktur

function LessonVideo({ course, coursesData, setCourse }) {
  const { isVideoCompleted, setIsVideoCompleted } = useOutletContext();
  console.log("LESSON VIDEO📌", typeof isVideoCompleted, isVideoCompleted);
  const {courseId, lessonId} = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const videoRef = ref(
      storage,
      `course${courseId}_lesson${lessonId}.mp4`
    );
    getDownloadURL(videoRef)
      .then((url) => {
        setVideoUrl(url);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der URL:", error);
      });
  }, []);

  return (
    <div className="main-content">
      {!videoUrl ? (
        <p className="text-center">Loading Video...</p>
      ) : (
        <video
          controls
          className="w-full max-w-3xl mx-auto rounded-md shadow-md"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
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
