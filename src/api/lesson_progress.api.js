import api from "./axiosConfig";


export const getLessonProgress = async (loggedInUser) => {
  const res = await api.get(`/api/user/${loggedInUser}/progress`);
  return res.data;
};