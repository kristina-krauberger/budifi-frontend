import api from "./axiosConfig";

export const getLessonProgress = async (loggedInUser) => {
  const response = await api.get(`/api/user/${loggedInUser}/progress`);
  return response.data;
};

export const updateLessonProgress = async (loggedInUser, lessonId, isCompleted) => {
  const response = await api.put(`/api/user/${loggedInUser}/progress`,
    {
    "lesson_id": lessonId,
    "is_completed": isCompleted
  })
  return(response.data)
};
