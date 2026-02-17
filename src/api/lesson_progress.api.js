import api from "./axiosConfig";

export const getLessonProgress = async (loggedInUser) => {
  const response = await api.get(`/api/user/${loggedInUser}/progress`);
  return response.data;
};

export const updateLessonProgress = async (
  loggedInUser,
  lessonId,
  isCompleted,
) => {
  try {
    // console.log("🚀 BEFORE PUT");
    // console.log("USER:", loggedInUser);
    // console.log("LESSON ID:", lessonId);
    // console.log("IS COMPLETED:", isCompleted);

    const response = await api.put(`/api/user/${loggedInUser}/progress`, {
      lesson_id: lessonId,
      is_completed: isCompleted,
    });

    // console.log("✅ AFTER PUT RESPONSE:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ PUT FAILED:", error);
  }
};
