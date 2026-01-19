/**
 * Renders the video section of a lesson:
 * - Loads the video from Firebase Storage based on course and lesson ID
 * - Displays a loading state until the video is available
 * - On video completion, updates the isVideoCompleted state via context
 * - Navigates to the quiz page after a short delay
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

function LessonVideo({ course, allCourses, setCourse }) {
  const { isVideoCompleted, setIsVideoCompleted } = useOutletContext();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  // Load video URL from Firebase storage when component mounts
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

  // Render video player or loading placeholder
  return (
    <div className="main-content">
      <div className="w-[640px] h-[360px] bg-gray-200 flex bg-gray-200 flex items-center justify-center rounded-md shadow-md overflow-hidden">
        {!videoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-4xl text-gray-500">▶</span>
            <p className="text-center mt-2 text-gray-600">Loading Video...</p>
          </div>
        ) : (
          <video
            controls
            className="w-full h-full object-cover rounded-md"
            // Mark video as completed and navigate to quiz after delay
            onEnded={() => {
              setIsVideoCompleted(true);
              setTimeout(() => {
                navigate(`/course/${courseId}/lesson/${lessonId}/quiz`);
              }, 3000);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default LessonVideo;
