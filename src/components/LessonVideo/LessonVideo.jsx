import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Pfad anpassen je nach Struktur

function LessonVideo({ course, coursesData, setCourse }) {
  const { isVideoCompleted, setIsVideoCompleted } = useOutletContext();
  console.log("LESSON VIDEO📌", typeof isVideoCompleted, isVideoCompleted);
  const { courseId, lessonId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const videoRef = ref(storage, `course${courseId}_lesson${lessonId}.mp4`);
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
      <div className="w-[640px] h-[360px] bg-gray-200 flex bg-gray-200 flex items-center justify-center rounded-md shadow-md overflow-hidden">
        {!videoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-4xl text-gray-500">▶</span>
            <p className="text-center mt-2 text-gray-600">Loading Video...</p>
          </div>
        ) : (
          <video controls className="w-full h-full object-cover rounded-md"
          onEnded ={()=> setIsVideoCompleted(true)}>
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>


    </div>
  );
}

export default LessonVideo;
